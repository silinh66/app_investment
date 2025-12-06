import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Platform,
  StatusBar,
  GestureResponderEvent,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useTheme } from '../context/ThemeContext';
import { authApi } from '../api/auth';
import { postsApi } from '../api/posts';
import { UserInfo } from '../api/types';
import axiosClient from '../api/request';
import { getDataStorage, STORAGE_KEY } from '../utils/storage';
import { topicsApi, Topic as TopicType } from '../api/topics';
import { TopicItem } from '../components/TopicItem';

// Header constants
const HEADER_MAX_HEIGHT = 280;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function UserProfileScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState(0);
  const [activeMainTab, setActiveMainTab] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userTopics, setUserTopics] = useState<any[]>([]);
  const [realUserTopics, setRealUserTopics] = useState<TopicType[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Friend & follow specific states (match web statuses)
  // status values: "not", "pending_sent", "pending_received", "acceptFriend"
  const [friendStatus, setFriendStatus] = useState<string | null>(null);
  const [friendActionLoading, setFriendActionLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [followLoading, setFollowLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);



  // Truncate description to 60 characters for display in the community feed
  const truncateDescription = (text: string) => {
   let listParagraphs = text.split('\n');
   //return first paragraph and ...
   
   if(listParagraphs?.length > 1)
   return listParagraphs[0] +  '...';
   return text
  };

  //get status bar height
  const statusBarHeight = Platform.OS === 'ios' ? 20 : (StatusBar.currentHeight || 0);
  
  // Fetch current user id from storage
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const userData = await getDataStorage(STORAGE_KEY.USER_DATA);
        if (userData && userData.id) {
          setCurrentUserId(Number(userData.id));
        }
      } catch (err) {
        console.warn('Could not get current user id', err);
      }
    };
    fetchCurrentUserId();
  }, []);
  
  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        if (!userId) {
          setError('User ID is missing');
          return;
        }

        // Call getUserDetail endpoint to get user info with friend status
        const userRes = await axiosClient.get(`/getUserDetail/${userId}`);
        
        const remoteUser = userRes?.data?.data || userRes?.data;
        
        if (remoteUser) {
          setUserInfo(remoteUser);
          
          // Set friendStatus from server response
          if (typeof remoteUser.status === 'string') {
            setFriendStatus(remoteUser.status);
          } else {
            setFriendStatus('not');
          }

          // Set isFollowing from server response
          if (typeof remoteUser.isFollowing === 'boolean') {
            setIsFollowing(remoteUser.isFollowing);
          }
        }
        
        // Fetch user topics
        try {
          const topicsResponse = await postsApi.getTopicsByUser(Number(userId));
          if (topicsResponse?.data) {
            setUserTopics(topicsResponse.data);
          }
        } catch (err) {
          console.warn('getTopicsByUser failed', err);
        }

        // Fetch real user topics from new API
        try {
          const realTopicsResponse = await topicsApi.getTopicsByUser(Number(userId));
          if (realTopicsResponse?.data) {
            setRealUserTopics(realTopicsResponse.data);
          }
        } catch (err) {
          console.warn('getTopicsByUser (new API) failed', err);
        }

      } catch (err) {
        setError('Failed to load user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, currentUserId]);

  // Animated values for collapsible header
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [400, (statusBarHeight || 0) + 30],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Values for the collapsible navbar
  const navbarOpacity = scrollY.interpolate({
    inputRange: [150, 250],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Handle post press - navigate to post detail
  const handlePostPress = (postId: number) => {
    router.push(`/post-detail?postId=${postId}`);
  };

  // Handle comment press - navigate to post detail and scroll to comments
  const handleCommentPress = (e: GestureResponderEvent, postId: number) => {
    e.stopPropagation();
    router.push(`/post-detail?postId=${postId}&scrollToComments=true`);
  };

  // Fetch user topics again after updates
  const refetchUserTopics = async () => {
    try {
      const realTopicsResponse = await topicsApi.getTopicsByUser(Number(userId));
      if (realTopicsResponse?.data) {
        setRealUserTopics(realTopicsResponse.data);
      }
    } catch (err) {
      console.warn('Refetch topics failed', err);
    }
  };

  // ---------- FRIEND / FOLLOW ACTIONS (match web endpoints & statuses) ----------
  
  // Refetch user info from server after friend actions
  const refetchUserInfoFromServer = async () => {
    try {
      const userRes = await axiosClient.get(`/getUserDetail/${userId}`);
      const remoteUser = userRes?.data?.data || userRes?.data;
      
      if (remoteUser) {
        setUserInfo(remoteUser);
        setFriendStatus(remoteUser?.status || 'not');
        if (typeof remoteUser.isFollowing === 'boolean') {
          setIsFollowing(remoteUser.isFollowing);
        }
      }
    } catch (err) {
      console.warn('refetchUserInfoFromServer failed', err);
    }
  };

  // Add friend - send friend request
  const actionAddFriend = async () => {
    if (friendActionLoading) return;
    setFriendActionLoading(true);
    try {
      // Optimistic UI update
      setFriendStatus('pending_sent');

      await axiosClient.post('/addFriend', { friendId: userId });
      
      // Refetch to get canonical status
      await refetchUserInfoFromServer();
    } catch (err) {
      console.error('actionAddFriend failed', err);
      // Rollback on error
      setFriendStatus('not');
    } finally {
      setFriendActionLoading(false);
    }
  };

  // Unfriend/reject/cancel friend request
  const actionUnFriend = async () => {
    if (friendActionLoading) return;
    setFriendActionLoading(true);
    try {
      await axiosClient.post('/rejectFriend', { friendId: userId });
      
      // Refetch to update status
      await refetchUserInfoFromServer();
    } catch (err) {
      console.error('actionUnFriend failed', err);
    } finally {
      setFriendActionLoading(false);
    }
  };

  // Accept friend request
  const actionAcceptFriend = async () => {
    if (friendActionLoading) return;
    setFriendActionLoading(true);
    try {
      await axiosClient.post('/acceptFriend', { friendId: userId });
      
      // Refetch to update status
      await refetchUserInfoFromServer();
    } catch (err) {
      console.error('actionAcceptFriend failed', err);
    } finally {
      setFriendActionLoading(false);
    }
  };

  // Toggle follow/unfollow
  const handleToggleFollow = async () => {
    if (followLoading) return;
    setFollowLoading(true);
    try {
      if (isFollowing) {
        // Unfollow
        await axiosClient.post('/postUnFollowUser', { userId });
        setIsFollowing(false);
      } else {
        // Follow
        await axiosClient.post('/postFollowUser', { userId });
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('handleToggleFollow failed', err);
    } finally {
      setFollowLoading(false);
    }
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // Show error message if there was an error
  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Use real data if available, otherwise fall back to mock data
  const displayName = userInfo?.name || 'Tài khoản thực của 77';
  const displayAvatar = userInfo?.avatar || 'https://i.pravatar.cc/150?img=3';
  const followerCount = userInfo?.followerCount || 31339;

  // Check if viewing own profile
  const viewingSelf = currentUserId && userInfo && Number(currentUserId) === Number((userInfo as any).id || userInfo.userID);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
      {/* Collapsible Navbar */}
      <Animated.View style={[styles.navbar, { opacity: navbarOpacity, backgroundColor: 'transparent' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.navbarBackButton}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#ffffff" />
        </TouchableOpacity>
        
        <View style={styles.navbarCenter}>
          <Image 
            source={{ uri: displayAvatar }} 
            style={styles.navbarAvatar}
          />
          <Text style={styles.navbarTitle}>{displayName}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.navbarFollowButton, isFollowing && { backgroundColor: '#2b6cb0' }]} 
          onPress={handleToggleFollow}
          disabled={followLoading || viewingSelf}
        >
          <Text style={styles.navbarFollowText}>
            {followLoading ? 'Đang...' : (isFollowing ? 'Đang theo dõi' : 'Theo dõi')}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Header Background */}
      <LinearGradient
        colors={theme.mode === 'dark' ? ['#0c1445', '#132584'] : ['#0066ff', '#1a75ff']}
        style={styles.headerBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header Content - Collapsible */}
      <Animated.View style={[styles.header, { opacity: headerOpacity, height: headerHeight }]}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back-ios" size={22} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.moreButton}>
            <MaterialIcons name="more-horiz" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileTopRow}>
            <Image 
              source={{ uri: displayAvatar }} 
              style={styles.profileAvatar}
            />
            
            {/* ---------------- FRIEND / FOLLOW UI (match web statuses) ---------------- */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {viewingSelf ? (
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Chỉnh sửa hồ sơ</Text>
                </TouchableOpacity>
              ) : (
                <>
                  {/* Friend status UI */}
                  {friendStatus === null ? (
                    <TouchableOpacity style={[styles.followButton, { opacity: 0.7 }]} disabled>
                      <ActivityIndicator color="#fff" size="small" />
                    </TouchableOpacity>
                  ) : friendStatus === 'not' ? (
                    <TouchableOpacity 
                      style={styles.followButton} 
                      onPress={actionAddFriend} 
                      disabled={friendActionLoading}
                    >
                      <View style={styles.followIconContainer}>
                        <AntDesign name="plus" size={16} color="#ffffff" />
                      </View>
                      <Text style={styles.followButtonText}>
                        {friendActionLoading ? 'Đang...' : 'Thêm bạn bè'}
                      </Text>
                    </TouchableOpacity>
                  ) : friendStatus === 'pending_sent' ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={[styles.followButton, { backgroundColor: '#9aaef6', marginRight: 8 }]}>
                        <Text style={styles.followButtonText}>Chờ xác nhận</Text>
                      </View>
                      <TouchableOpacity 
                        style={[styles.followButton, { backgroundColor: '#6b7280' }]} 
                        onPress={actionUnFriend} 
                        disabled={friendActionLoading}
                      >
                        <Text style={styles.followButtonText}>
                          {friendActionLoading ? 'Đang...' : 'Huỷ'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : friendStatus === 'pending_received' ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity 
                        style={[styles.followButton, { marginRight: 8, backgroundColor: '#0042CC' }]} 
                        onPress={actionAcceptFriend} 
                        disabled={friendActionLoading}
                      >
                        <Text style={styles.followButtonText}>
                          {friendActionLoading ? 'Đang...' : 'Chấp nhận'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.followButton, { backgroundColor: '#6b7280' }]} 
                        onPress={actionUnFriend} 
                        disabled={friendActionLoading}
                      >
                        <Text style={styles.followButtonText}>Từ chối</Text>
                      </TouchableOpacity>
                    </View>
                  ) : friendStatus === 'acceptFriend' ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity 
                        style={[styles.followButton, { backgroundColor: '#1f6feb', marginRight: 8 }]} 
                        onPress={() => {
                          // TODO: Implement chat functionality
                          console.log('Start chat with', userId);
                        }}
                      >
                        <Text style={styles.followButtonText}>Nhắn tin</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={[styles.followButton, { backgroundColor: '#ef4444' }]} 
                        onPress={actionUnFriend} 
                        disabled={friendActionLoading}
                      >
                        <Text style={styles.followButtonText}>Huỷ kết bạn</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    // Fallback
                    <TouchableOpacity style={styles.followButton} onPress={actionAddFriend}>
                      <Text style={styles.followButtonText}>Thêm bạn</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}

              {/* Spacing */}
              {!viewingSelf && <View style={{ width: 8 }} />}

              {/* Follow button */}
              {!viewingSelf && (
                <TouchableOpacity 
                  style={[styles.followButton, isFollowing && { backgroundColor: '#2b6cb0' }]} 
                  onPress={handleToggleFollow} 
                  disabled={followLoading}
                >
                  <Text style={styles.followButtonText}>
                    {followLoading ? 'Đang...' : (isFollowing ? 'Đang theo dõi' : 'Theo dõi')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {/* ---------------- end friend/follow UI ---------------- */}
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{displayName}</Text>
            <Text style={styles.profileBio}>
              Giới thiệu: {(userInfo as any)?.bio || 'Nhà đầu tư mới, chia sẻ giao dịch thực và tổng kết hàng ngày'}
            </Text>
            <Text style={styles.profileLocation}>Địa chỉ IP: Việt Nam</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{followerCount}</Text>
            <Text style={styles.statLabel}>Người theo dõi</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>62</Text>
            <Text style={styles.statLabel}>Đang theo dõi</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userTopics.length || 1816}</Text>
            <Text style={styles.statLabel}>Bài viết</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>71365</Text>
            <Text style={styles.statLabel}>Tương tác</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.stockPickContainer}>
          <Text style={styles.stockPickText}>Danh sách cổ phiếu theo dõi</Text>
          <View style={styles.chevronContainer}>
            <MaterialIcons name="keyboard-arrow-right" size={22} color="rgba(255, 255, 255, 0.5)" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Main Tabs */}
      <View style={[styles.mainTabsContainer, { backgroundColor: theme.colors.tabBarBackground }]}>
        <TouchableOpacity
          style={[styles.mainTab, activeMainTab === 0 && styles.activeMainTab]}
          onPress={() => setActiveMainTab(0)}
        >
          <Text style={[styles.mainTabText, 
            { color: theme.colors.tabBarInactive },
            activeMainTab === 0 && { color: theme.colors.tabBarActive }
          ]}>
            Nổi bật
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainTab, activeMainTab === 1 && styles.activeMainTab]}
          onPress={() => setActiveMainTab(1)}
        >
          <Text style={[styles.mainTabText, 
            { color: theme.colors.tabBarInactive },
            activeMainTab === 1 && { color: theme.colors.tabBarActive }
          ]}>
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainTab, activeMainTab === 2 && styles.activeMainTab]}
          onPress={() => setActiveMainTab(2)}
        >
          <Text style={[styles.mainTabText, 
            { color: theme.colors.tabBarInactive },
            activeMainTab === 2 && { color: theme.colors.tabBarActive }
          ]}>
            Hỏi đáp
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sub Tabs */}
      <View style={[styles.subTabsContainer, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity
          style={[styles.subTab, activeTab === 0 && styles.activeSubTab]}
          onPress={() => setActiveTab(0)}
        >
          <Text style={[styles.subTabText, 
            { color: theme.colors.tabBarInactive },
            activeTab === 0 && { color: theme.colors.primary }
          ]}>
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subTab, activeTab === 1 && styles.activeSubTab]}
          onPress={() => setActiveTab(1)}
        >
          <Text style={[styles.subTabText, 
            { color: theme.colors.tabBarInactive },
            activeTab === 1 && { color: theme.colors.primary }
          ]}>
            Cổ phiếu A (32)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subTab, activeTab === 2 && styles.activeSubTab]}
          onPress={() => setActiveTab(2)}
        >
          <Text style={[styles.subTabText, 
            { color: theme.colors.tabBarInactive },
            activeTab === 2 && { color: theme.colors.primary }
          ]}>
            Cổ phiếu B (16)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView 
        style={[styles.scrollView, { backgroundColor: theme.colors.background }]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Posts */}
        <View style={styles.postsContainer}>
          {/* Real Topics from new API */}
          {realUserTopics.length > 0 ? (
            realUserTopics.map((topic) => (
              <TopicItem
                key={topic.topic_id}
                topic={topic}
                onPress={handlePostPress}
                onCommentPress={handleCommentPress}
                onLikeUpdate={refetchUserTopics}
              />
            ))
          ) : (
            /* Fallback to old topics */
            userTopics.map((post) => {
              let image = undefined;
              try {
                image = JSON.parse(post?.image);
              } catch (e) {
                // Ignore parse errors
                image = post?.image;
              }
              
              return  <TouchableOpacity 
                key={post.topic_id} 
                style={[styles.postItem, { backgroundColor: theme.colors.card }]} 
                onPress={() => handlePostPress(post.topic_id)}
              >
                <View style={styles.postHeader}>
                  <View style={styles.postUser}>
                    <Image 
                      source={{ uri: post.avatar || 'https://i.pravatar.cc/40?img=3' }} 
                      style={styles.postAvatar} 
                    />
                    <View>
                      <Text style={[styles.postUsername, { color: theme.colors.text }]}>{post.author}</Text>
                      <Text style={[styles.postTime, { color: theme.colors.secondaryText }]}>
                        {post.created_at ? new Date(post.created_at).toLocaleString('zh-CN') : '08-24 12:08'}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <Text style={[styles.postContent, { color: theme.colors.text }]}>{truncateDescription(post.description)}</Text>
                
                      {image !== undefined && image?.length > 0 ? (
                        image?.map((image: any) => {
                          
                          return (
                          <Image 
                          key={image?.url}
                          resizeMode="cover"
                          source={{ uri: image.url }} 
                          style={styles.postImage}
                        />
                        )
                        })
                      ) : null}
                
                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.postAction}>
                    <MaterialIcons name="reply" size={20} color={theme.colors.iconColor} />
                    <Text style={styles.actionText}>3</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.postAction} 
                    onPress={(e) => handleCommentPress(e, post.topic_id)}
                  >
                    <FontAwesome name="comment-o" size={20} color={theme.colors.iconColor} />
                    <Text style={styles.actionText}>{post.comment_count}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.postAction}>
                    <MaterialIcons name="favorite-border" size={20} color={theme.colors.iconColor} />
                    <Text style={styles.actionText}>{post.like_count}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.moreAction}>
                    <MaterialIcons name="more-horiz" size={20} color={theme.colors.iconColor} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            })
          )}
          
          {/* Show message if no posts */}
          {realUserTopics.length === 0 && userTopics.length === 0 && (
            <View style={styles.noPostsContainer}>
              <Text style={[styles.noPostsText, { color: theme.colors.secondaryText }]}>
                Chưa có bài viết nào
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1b3c',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  navbar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#0c1445',
    zIndex: 100,
  },
  navbarBackButton: {
    padding: 5,
  },
  navbarCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  navbarTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  navbarFollowButton: {
    backgroundColor: '#4e83f7',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  navbarFollowText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 380,
    zIndex: -1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    overflow: 'hidden',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  moreButton: {
    padding: 5,
  },
  profileContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  profileTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    alignItems: 'flex-start',
  },
  profileName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  profileBio: {
    color: '#d1d5db',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'left',
  },
  profileLocation: {
    color: '#9ca3af',
    fontSize: 14,
  },
  followButton: {
    backgroundColor: '#4e83f7',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  followIconContainer: {
    marginRight: 4,
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  stockPickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 30, 48, 0.5)',
    padding: 14,
    marginVertical: 20,
  },
  stockPickText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  chevronContainer: {
    opacity: 0.7,
  },
  mainTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#0c1b3c',
    borderBottomWidth: 0,
  },
  mainTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeMainTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
  },
  mainTabText: {
    color: '#9ca3af',
    fontSize: 15,
    fontWeight: '400',
  },
  activeMainTabText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  subTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#0d1b36',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  subTab: {
    marginRight: 24,
    paddingVertical: 2,
  },
  activeSubTab: {
    borderBottomWidth: 0,
  },
  subTabText: {
    color: '#8993a4',
    fontSize: 14,
  },
  activeSubTabText: {
    color: '#4e83f7',
    fontWeight: '500',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#0d1b36',
    marginTop: 0,
  },
  postsContainer: {
    flex: 1,
  },
  postItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0a1429',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUsername: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  postTime: {
    color: '#6b7280',
    fontSize: 12,
  },
  postContent: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    // borderTopWidth: 1,
    borderTopColor: '#1e3466',
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreAction: {
    padding: 5,
  },
  actionText: {
    color: '#6b7280',
    fontSize: 14,
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '500',
  },
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPostsText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
