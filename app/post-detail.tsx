import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, Keyboard } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { postsApi, Topic as PostTopic } from '../api/posts';
import { topicsApi, Topic as ApiTopic, Comment, TopicImage } from '../api/topics';
import { getDataStorage, STORAGE_KEY } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostDetailScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  console.log('user', user);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const params = useLocalSearchParams();
  const { postId, scrollToComments } = params;
  
  const [post, setPost] = useState<PostTopic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [commentLikeStates, setCommentLikeStates] = useState<Record<number, { isLiked: boolean; count: number }>>({});
  const [parsedImages, setParsedImages] = useState<TopicImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [replyingTo, setReplyingTo] = useState<{ commentId: number; username: string } | null>(null);

  // Get current user ID on mount
  useEffect(() => {
    const getCurrentUserId = async () => {
      try {
        const userData = await getDataStorage(STORAGE_KEY.USER_DATA);
        if (userData && userData.id) {
          setCurrentUserId(Number(userData.id));
        }
      } catch (err) {
        console.warn('Could not get user id', err);
      }
    };
    getCurrentUserId();
  }, []);

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // setLoading(true);
        console.log('Fetching post with ID:', postId);
        
        if (postId) {
          console.log('Fetching post with ID:', postId);
          
          const response = await postsApi.getTopicById(Number(postId));
          console.log('Post data:', response.data);
          
          setPost(response.data);
          setLikeCount(response.data.like_count || 0);
          
          // Parse images if they exist
          if (response.data.image) {
            try {
              const images = typeof response.data.image === 'string' 
                ? JSON.parse(response.data.image) 
                : response.data.image;
              setParsedImages(Array.isArray(images) ? images : []);
            } catch (e) {
              setParsedImages([]);
            }
          }
          
          // Check if current user has liked this post
          if (currentUserId && response.data.likes) {
            const userLiked = response.data.likes.some((like) => like.userId === currentUserId);
            setIsLiked(userLiked);
          }
          
          // Check if current user is following the post author
          if (currentUserId && response.data.userId) {
            try {
              const userDetailResponse = await postsApi.getUserDetail(response.data.userId);
              if (userDetailResponse.data && typeof (userDetailResponse.data as any).isFollowing === 'boolean') {
                setIsFollowing((userDetailResponse.data as any).isFollowing);
              }
            } catch (err) {
              console.warn('Could not check follow status', err);
            }
          }
        } else {
          setError('Post ID is missing');
        }
        
        // Record view if user is authenticated
        if (isAuthenticated && postId) {
          try {
            await topicsApi.viewTopic(Number(postId));
          } catch (err: any) {
            // Silently handle 401 errors (token expired)
            if (err?.status === 401) {
              // Don't log 401 errors as they're expected when not authenticated
              return;
            }
            console.log('Failed to record view:', err);
          }
        }
      } catch (err) {
        setError('Failed to load post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

      fetchPost();
  }, [postId, isAuthenticated, currentUserId]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        try {
          const response = await topicsApi.getComments(Number(postId));
          
          // Check if response has comments and handle different response structures
          if (response && response.status === 200) {
            // Handle both response structures: response.data.comments (web API) or response.data (array)
            let commentsList = Array.isArray(response.data) 
              ? response.data.reverse() 
              : (response.data as any).comments?.reverse() || [];
            
            // Process comments to nest replies under their parent comments
            const parentComments: Comment[] = [];
            const replyMap: Record<number, Comment[]> = {};
            console.log('Comments:', commentsList);
            
            // First pass: separate parent comments from replies
            commentsList.forEach((comment) => {
              if (comment.parent_id === null) {
                parentComments.push(comment);
              } else {
                if (!replyMap[comment.parent_id]) {
                  replyMap[comment.parent_id] = [];
                }
                replyMap[comment.parent_id].push(comment);
              }
            });
            
            // Second pass: attach replies to their parent comments
            const commentsWithReplies = parentComments.map(comment => {
              if (replyMap[comment.comment_id]) {
                return {
                  ...comment,
                  replies: replyMap[comment.comment_id]
                };
              }
              return comment;
            });
            
            setComments(commentsWithReplies);
            
            // Initialize comment like states
            const likeStates: Record<number, { isLiked: boolean; count: number }> = {};
            commentsList.forEach((comment) => {
              const isLiked = currentUserId ? comment.likes?.some(like => like.userId === currentUserId) : false;
              likeStates[comment.comment_id] = {
                isLiked,
                count: comment.like_count || 0
              };
            });
            setCommentLikeStates(likeStates);
          } else {
            setComments([]);
          }
        } catch (err) {
          console.error('Failed to load comments:', err);
          setComments([]);
        }
      }
    };

    if ( postId) {
      fetchComments();
    }
  }, [postId, currentUserId]);

  // Check if we should scroll to comments
  useEffect(() => {
    if (scrollToComments && scrollViewRef.current && post) {
      // Scroll to the comments section
      // We'll scroll to a specific y position that we know is around the comments section
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 800, animated: true });
        }
      }, 100);
    }
  }, [scrollToComments, post]);

  const handleCommentSubmit = async () => {
    // Check if content is not empty
    if (!comment.trim()) {
      console.log('Nội dung bình luận trống.');
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      // Store the current route before redirecting to login
      // Since we don't have access to the current route, we'll store a generic object
      const currentRoute = { pathname: '/post-detail', params: { postId } };
      await AsyncStorage.setItem('PREVIOUS_ROUTE', JSON.stringify(currentRoute));
      router.push('/auth/login');
      return;
    }

    // Check if not already submitting
    if (isSubmitting) {
      console.log('Đang gửi bình luận...');
      return;
    }

    if (!postId || !currentUserId) {
      return;
    }

    setIsSubmitting(true);

    try {
      let newComment: Comment;
      
      if (replyingTo) {
        // This is a reply to a comment
        // Create temporary reply comment with temporary ID
        const tempReplyComment: Comment = {
          comment_id: Date.now(), // Temporary numeric ID
          topic_id: Number(postId),
          userId: currentUserId,
          content: comment.trim(),
          created_at: new Date().toISOString(),
          parent_id: replyingTo.commentId,
          author: user.name || 'User',
          avatar: user.avatar || 'https://i.pravatar.cc/32?img=1',
          like_count: 0,
          likes: [],
        };

        // Add temporary reply to UI immediately (optimistic update)
        setComments(prev => {
          // Find the parent comment and add the reply to it
          return prev.map(comment => {
            if (comment.comment_id === replyingTo.commentId) {
              // Add reply to parent comment
              return {
                ...comment,
                replies: comment.replies ? [...comment.replies, tempReplyComment] : [tempReplyComment]
              };
            }
            return comment;
          });
        });
        
        // Initialize like state for temporary reply comment
        setCommentLikeStates(prev => ({
          ...prev,
          [tempReplyComment.comment_id]: {
            isLiked: false,
            count: 0
          }
        }));

        // Post to API
        const response = await topicsApi.postComment(Number(postId), comment.trim(), replyingTo.commentId);
        
        if (response && response.data) {
          console.log(response.data);
          
          newComment = response?.data?.comment || null as Comment | null;
          
          // Update temporary reply with real data from server
          setComments(prev => {
            return prev.map(comment => {
              if (comment.comment_id === replyingTo.commentId) {
                // Replace temporary reply with real reply
                const updatedReplies = comment.replies ? 
                  comment.replies.map(reply => 
                    reply.comment_id === tempReplyComment.comment_id ? newComment : reply
                  ) : 
                  [newComment];
                  
                return {
                  ...comment,
                  replies: updatedReplies
                };
              }
              return comment;
            });
          });

          // Update like state with real comment ID
          setCommentLikeStates(prev => {
            const newStates = { ...prev };
            // Copy temporary state to real ID
            newStates[newComment.comment_id] = prev[tempReplyComment.comment_id];
            // Remove temporary state
            delete newStates[tempReplyComment.comment_id];
            return newStates;
          });
        } else {
          console.error('Failed to post reply. Phản hồi không hợp lệ.');
          throw new Error('Failed to post reply');
        }
        
        // Clear input and reply state
        setComment('');
        setReplyingTo(null);
      } else {
        // This is a new comment
        // Create temporary comment with temporary ID
        const tempComment: Comment = {
          comment_id: Date.now(), // Temporary numeric ID
          topic_id: Number(postId),
          userId: currentUserId,
          content: comment.trim(),
          created_at: new Date().toISOString(),
          parent_id: null,
          author: user.name || 'User',
          avatar: user.avatar || 'https://i.pravatar.cc/32?img=1',
          like_count: 0,
          likes: [],
        };

        // Add temporary comment to UI immediately (optimistic update)
        setComments(prev => [tempComment, ...prev]);
        
        // Initialize like state for temporary comment
        setCommentLikeStates(prev => ({
          ...prev,
          [tempComment.comment_id]: {
            isLiked: false,
            count: 0
          }
        }));

        // Update post comment count optimistically
        if (post) {
          setPost({
            ...post,
            comment_count: (post.comment_count || 0) + 1
          });
        }

        // Clear input
        setComment('');

        // Post to API
        const response = await topicsApi.postComment(Number(postId), tempComment.content);
        
        if (response && response.data) {
          newComment = response.data;
          
          // Update temporary comment with real data from server
          setComments(prev => 
            prev.map(c => 
              c.comment_id === tempComment.comment_id 
                ? {
                    ...tempComment,
                    comment_id: newComment.comment_id,
                    created_at: newComment.created_at,
                  }
                : c
            )
          );

          // Update like state with real comment ID
          setCommentLikeStates(prev => {
            const newStates = { ...prev };
            // Copy temporary state to real ID
            newStates[newComment.comment_id] = prev[tempComment.comment_id];
            // Remove temporary state
            delete newStates[tempComment.comment_id];
            return newStates;
          });
        } else {
          console.error('Failed to post comment. Phản hồi không hợp lệ.');
          throw new Error('Failed to post comment');
        }
      }
    } catch (err: any) {
      console.error('Error submitting comment:', err);
      
      // Check if it's a 401 error (unauthorized/token expired)
      if (err?.status === 401) {
        // Logout and redirect to login without showing error
        // Store the current route before logout and redirecting to login
        // Since we don't have access to the current route, we'll store a generic object
        const currentRoute = { pathname: '/post-detail', params: { postId } };
        await AsyncStorage.setItem('PREVIOUS_ROUTE', JSON.stringify(currentRoute));
        await logout();
        router.push('/auth/login');
        return;
      }
      
      // If this was a temporary comment, update it to show error
      if (!replyingTo) {
        setComments(prev => 
          prev.map(c => 
            typeof c.comment_id === 'number' && c.comment_id > 1000000000 // Temporary ID
              ? {
                  ...c,
                  content: 'Bình luận không được gửi. Vui lòng thử lại.',
                }
              : c
          )
        );
      } else {
        // If this was a temporary reply, remove it
        setComments(prev => {
          return prev.map(comment => {
            if (comment.comment_id === replyingTo?.commentId) {
              // Remove temporary reply
              const updatedReplies = comment.replies ? 
                comment.replies.filter(reply => 
                  !(typeof reply.comment_id === 'number' && reply.comment_id > 1000000000)
                ) : 
                [];
                  
              return {
                ...comment,
                replies: updatedReplies.length > 0 ? updatedReplies : undefined
              };
            }
            return comment;
          });
        });
      }
      
      Alert.alert('Lỗi', 'Không thể đăng bình luận. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikePress = async () => {
    // Check if user is authenticated before allowing like
    if (!isAuthenticated) {
      // Store the current route before redirecting to login
      // Since we don't have access to the current route, we'll store a generic object
      const currentRoute = { pathname: '/post-detail', params: { postId } };
      await AsyncStorage.setItem('PREVIOUS_ROUTE', JSON.stringify(currentRoute));
      router.push('/auth/login');
      return;
    }

    if (!postId) return;

    // Optimistic update
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;
    
    setIsLiked(!previousIsLiked);
    setLikeCount(prev => prev + (previousIsLiked ? -1 : 1));

    try {
      if (previousIsLiked) {
        await topicsApi.unlikeTopic(Number(postId));
      } else {
        await topicsApi.likeTopic(Number(postId));
      }
    } catch (err: any) {
      console.error('Failed to toggle like:', err);
      
      // Check if it's a 401 error (unauthorized/token expired)
      if (err?.status === 401) {
        // Logout and redirect to login without showing error
        await logout();
        router.push('/auth/login');
        return;
      }
      
      // Rollback on error
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
      Alert.alert('Lỗi', 'Không thể thực hiện thao tác. Vui lòng thử lại.');
    }
  };

    const inputRef = useRef<TextInput | null>(null);


  const handleCommentInputPress = () => {
    // Check if user is authenticated before allowing comment input
    if (!isAuthenticated) {
      // Store the current route before redirecting to login
      // Since we don't have access to the current route, we'll store a generic object
      const currentRoute = { pathname: '/post-detail', params: { postId } };
      AsyncStorage.setItem('PREVIOUS_ROUTE', JSON.stringify(currentRoute));
      router.push('/auth/login');
      return;
    }
    if (!isAuthenticated) {
    // show login prompt...
    return;
  }
  inputRef.current?.focus();
    // Here you would implement the actual comment input focus logic
    console.log('Focus comment input');
  };

  const handleSharePress = () => {
    // Check if user is authenticated before allowing share
    if (!isAuthenticated) {
      // Store the current route before redirecting to login
      // Since we don't have access to the current route, we'll store a generic object
      const currentRoute = { pathname: '/post-detail', params: { postId } };
      AsyncStorage.setItem('PREVIOUS_ROUTE', JSON.stringify(currentRoute));
      router.push('/auth/login');
      return;
    }
    
    // Here you would implement the actual share logic
    console.log('Post shared');
  };

  const handleFollowPress = async () => {
    // Check if user is authenticated before allowing follow
    if (!isAuthenticated) {
      // Store the current route before redirecting to login
      // Since we don't have access to the current route, we'll store a generic object
      const currentRoute = { pathname: '/post-detail', params: { postId } };
      AsyncStorage.setItem('PREVIOUS_ROUTE', JSON.stringify(currentRoute));
      router.push('/auth/login');
      return;
    }
    
    if (!post?.userId) return;

    try {
      if (isFollowing) {
        // Unfollow the user
        await postsApi.unfollowUser(post.userId);
        setIsFollowing(false);
        Alert.alert('Thành công', 'Bạn đã huỷ theo dõi người dùng này');
      } else {
        // Follow the user
        await postsApi.followUser(post.userId);
        setIsFollowing(true);
        Alert.alert('Thành công', 'Bạn đã theo dõi người dùng này');
      }
    } catch (err: any) {
      console.error('Failed to follow user:', err);
      
      // Check if it's a 401 error (unauthorized/token expired)
      if (err?.status === 401) {
        // Logout and redirect to login without showing error
        await logout();
        router.push('/auth/login');
        return;
      }
      
      Alert.alert('Lỗi', 'Không thể theo dõi người dùng. Vui lòng thử lại.');
    }
  };

  const handleReplyPress = (commentId: number, username: string) => {
    console.log(commentId, username);
    
    // Check if user is authenticated before allowing reply
    if (!isAuthenticated) {
      // Store the current route before redirecting to login
      // Since we don't have access to the current route, we'll store a generic object
      const currentRoute = { pathname: '/post-detail', params: { postId } };
      AsyncStorage.setItem('PREVIOUS_ROUTE', JSON.stringify(currentRoute));
      router.push('/auth/login');
      return;
    }
    
    // Set the reply state
    setReplyingTo({ commentId, username });
    
    // Focus the comment input
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 10000, animated: true });
    }
  };

  const handleCommentLikePress = async (commentId: number) => {
    // Check if user is authenticated before allowing comment like
    if (!isAuthenticated) {
      // Store the current route before redirecting to login
      // Since we don't have access to the current route, we'll store a generic object
      const currentRoute = { pathname: '/post-detail', params: { postId } };
      AsyncStorage.setItem('PREVIOUS_ROUTE', JSON.stringify(currentRoute));
      router.push('/auth/login');
      return;
    }

    if (!postId) return;

    // Optimistic update
    const previousState = commentLikeStates[commentId] || { isLiked: false, count: 0 };
    const newIsLiked = !previousState.isLiked;
    
    setCommentLikeStates(prev => ({
      ...prev,
      [commentId]: {
        isLiked: newIsLiked,
        count: previousState.count + (newIsLiked ? 1 : -1)
      }
    }));

    try {
      if (previousState.isLiked) {
        await topicsApi.unlikeComment(Number(postId), commentId);
      } else {
        await topicsApi.likeComment(Number(postId), commentId);
      }
    } catch (err: any) {
      console.error('Failed to toggle comment like:', err);
      
      // Check if it's a 401 error (unauthorized/token expired)
      if (err?.status === 401) {
        // Logout and redirect to login without showing error
        await logout();
        router.push('/auth/login');
        return;
      }
      
      // Rollback on error
      setCommentLikeStates(prev => ({
        ...prev,
        [commentId]: previousState
      }));
      Alert.alert('Lỗi', 'Không thể thực hiện thao tác. Vui lòng thử lại.');
    }
  };

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


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, { backgroundColor: theme.colors.headerBackground }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerAction} onPress={handleSharePress}>
            <MaterialIcons name="share" size={22} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerAction}>
            <MaterialIcons name="more-horiz" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={[styles.scrollView, { backgroundColor: theme.colors.background }]} ref={scrollViewRef}>
        <View style={[styles.postContainer, { backgroundColor: theme.colors.card }]}>
          <View style={styles.postHeader}>
            <Link href={`/user-profile?userId=${post?.userId}`} asChild>
              <TouchableOpacity style={styles.userInfo}>
                <Image 
                  source={{ uri: post?.avatar || 'https://i.pravatar.cc/40?img=1' }} 
                  style={styles.userAvatar}
                />
                <View>
                  <Text style={[styles.username, { color: theme.colors.text }]}>{post?.author}</Text>
                  <Text style={[styles.postTime, { color: theme.colors.secondaryText }]}>
                    {post?.created_at ? new Date(post.created_at).toLocaleString('vi-VN') : '3 giờ trước'}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={[styles.followButton, { backgroundColor: isFollowing ? '#2b6cb0' : theme.colors.primary }]} onPress={handleFollowPress}>
              <Text style={styles.followButtonText}>{isFollowing ? 'Huỷ theo dõi' : '+ Theo dõi'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.postContent, { color: theme.colors.text }]}>
            {post?.description}
          </Text>

        {parsedImages && parsedImages.length > 0 ? (
                parsedImages.map((image: TopicImage, index: number) => (
                  <Image 
                  key={index}
                  source={{ uri: image?.url }} 
                  style={styles.postImage}
                />
                ))
              ) : null}

          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionWithCount}>
                <MaterialIcons name="chat-bubble-outline" size={20} color="#8e8e93" />
                <Text style={styles.actionCount}>{post?.comment_count || 0}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
              <View style={styles.actionWithCount}>
                <MaterialIcons 
                  name={isLiked ? "favorite" : "favorite-border"} 
                  size={20} 
                  color={isLiked ? "#ff4444" : "#8e8e93"} 
                />
                <Text style={[styles.actionCount, { color: isLiked ? "#ff4444" : "#8e8e93" }]}>{likeCount}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <Text style={styles.sectionTitle}>Bình luận ({post?.comment_count || 0})</Text>
            
            {comments.length > 0 ? (
              comments.map((commentItem, index) => {
                const commentLikeState = commentLikeStates[commentItem.comment_id] || { isLiked: false, count: 0 };
                
                return (
                  <View key={index}>
                    <View style={styles.commentItem}>
                      <Link href={`/user-profile?userId=${commentItem.userId}`} asChild>
                        <TouchableOpacity style={styles.commentUserInfo}>
                          <Image 
                            source={{ uri: commentItem.avatar || 'https://i.pravatar.cc/32?img=1' }} 
                            style={styles.commentUserAvatar}
                          />
                        </TouchableOpacity>
                      </Link>
                      <View style={styles.commentContent}>
                        <Link href={`/user-profile?userId=${commentItem.userId}`} asChild>
                          <TouchableOpacity>
                            <Text style={styles.commentUsername}>{commentItem.name}</Text>
                          </TouchableOpacity>
                        </Link>
                        <Text style={styles.commentText}>{commentItem.content}</Text>
                        <View style={styles.commentMeta}>
                          <Text style={styles.commentTime}>
                            {new Date(commentItem.created_at).toLocaleString('vi-VN')}
                          </Text>
                          <View style={styles.commentActions}>
                            <TouchableOpacity 
                              style={styles.commentAction} 
                              onPress={() => handleCommentLikePress(commentItem.comment_id)}
                            >
                              <MaterialIcons 
                                name={commentLikeState.isLiked ? "favorite" : "favorite-border"} 
                                size={16} 
                                color={commentLikeState.isLiked ? "#ff4444" : "#8e8e93"} 
                              />
                              <Text style={[styles.commentActionCount, { color: commentLikeState.isLiked ? "#ff4444" : "#8e8e93" }]}>
                                {commentLikeState.count}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.commentAction} onPress={() => handleReplyPress(commentItem.comment_id, commentItem.name)}>
                              <MaterialIcons name="chat-bubble-outline" size={16} color="#8e8e93" />
                              <Text style={styles.commentActionCount}>Trả lời</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    
                    {/* Render replies */}
                    {commentItem.replies && commentItem.replies.length > 0 && (
                      <View style={{ marginLeft: 30 }}>
                        {commentItem.replies.map((reply, replyIndex) => {
                          const replyLikeState = commentLikeStates[reply.comment_id] || { isLiked: false, count: 0 };
                          return (
                            <View key={replyIndex} style={[styles.commentItem, { marginBottom: 10 }]}>
                              <Link href={`/user-profile?userId=${reply.userId}`} asChild>
                                <TouchableOpacity style={styles.commentUserInfo}>
                                  <Image 
                                    source={{ uri: reply.avatar || 'https://i.pravatar.cc/32?img=1' }} 
                                    style={styles.commentUserAvatar}
                                  />
                                </TouchableOpacity>
                              </Link>
                              <View style={styles.commentContent}>
                                <Link href={`/user-profile?userId=${reply.userId}`} asChild>
                                  <TouchableOpacity>
                                    <Text style={styles.commentUsername}>{reply.author}</Text>
                                  </TouchableOpacity>
                                </Link>
                                <Text style={styles.commentText}>{reply.content}</Text>
                                <View style={styles.commentMeta}>
                                  <Text style={styles.commentTime}>
                                    {new Date(reply.created_at).toLocaleString('vi-VN')}
                                  </Text>
                                  <View style={styles.commentActions}>
                                    <TouchableOpacity 
                                      style={styles.commentAction} 
                                      onPress={() => handleCommentLikePress(reply.comment_id)}
                                    >
                                      <MaterialIcons 
                                        name={replyLikeState.isLiked ? "favorite" : "favorite-border"} 
                                        size={16} 
                                        color={replyLikeState.isLiked ? "#ff4444" : "#8e8e93"} 
                                      />
                                      <Text style={[styles.commentActionCount, { color: replyLikeState.isLiked ? "#ff4444" : "#8e8e93" }]}>
                                        {replyLikeState.count}
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.commentAction} onPress={() => handleReplyPress(reply.comment_id, reply.name)}>
                                      <MaterialIcons name="chat-bubble-outline" size={16} color="#8e8e93" />
                                      <Text style={styles.commentActionCount}>Trả lời</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              <Text style={[styles.noCommentsText, { color: theme.colors.secondaryText }]}>
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  // keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60} // giữ hoặc tinh chỉnh nếu header cao hơn
>
  {/* Wrapper cho phần input + để bắt tap ngoài (dismiss keyboard) */}
  <Pressable
    onPress={() => Keyboard.dismiss()}
    style={[styles.commentInputContainer, { backgroundColor: theme.colors.card || '#000' }]}
  >
    <View style={{ flex: 1 }}>
     
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: replyingTo ? 8 : 0 }}>
        {/* TextInput trực tiếp (không bọc trong TouchableOpacity) */}
         {replyingTo && (
        <View style={styles.replyingToContainer}>
          <Text style={styles.replyingToText}>Đang trả lời {replyingTo.username}</Text>
          <TouchableOpacity onPress={() => setReplyingTo(null)}>
            <MaterialIcons name="close" size={16} color={theme.colors.secondaryText || '#8e8e93'} />
          </TouchableOpacity>
        </View>
      )}

        <TextInput
          ref={inputRef}
          style={[styles.commentInput, {
            color: theme.colors.text || '#fff',
          }]}
          placeholder={replyingTo ? `Trả lời ${replyingTo.username}...` : 'Thêm bình luận...'}
          placeholderTextColor={theme.colors.secondaryText || '#8e8e93'}
          editable={true}
          value={comment}
          onChangeText={setComment}
          returnKeyType="send"
          onSubmitEditing={handleCommentSubmit}
          onFocus={async () => {
            // Kiểm tra auth khi input focus
            if (!isAuthenticated || !user) {
              // lưu route để chuyển về sau khi login
              const currentRoute = { pathname: '/post-detail', params: { postId } };
              await AsyncStorage.setItem('PREVIOUS_ROUTE', JSON.stringify(currentRoute));
              router.push('/auth/login');
              return;
            }
          }}
          selectionColor={theme.colors.primary || '#4785f5'}
          textAlignVertical="center" // cần cho Android
          underlineColorAndroid="transparent"
          accessible
          accessibilityLabel="Nhập bình luận"
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleCommentSubmit}
          disabled={!isAuthenticated || !comment.trim() || isSubmitting}
        >
          <MaterialIcons
            name="send"
            size={20}
            color={isAuthenticated && comment.trim() ? (theme.colors.primary || "#4785f5") : (theme.colors.secondaryText || "#8e8e93")}
          />
        </TouchableOpacity>
      </View>
    </View>
  </Pressable>
</KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 5,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    padding: 5,
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
  },
  postContainer: {
    padding: 15,
    backgroundColor: '#121212',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  postTime: {
    color: '#8e8e93',
    fontSize: 12,
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#4785f5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  postContent: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  stockMention: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stockName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  stockChange: {
    color: '#E53935',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  chartContainer: {
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  chartPrice: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  chartChange: {
    color: '#E53935',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  chart: {
    height: 180,
    marginBottom: 5,
  },
  candleChart: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  candleStick: {
    width: 20,
    height: '100%',
    justifyContent: 'center',
  },
  redCandle: {
    backgroundColor: '#E53935',
    height: '40%',
    width: '60%',
    marginLeft: '20%',
  },
  greenCandle: {
    backgroundColor: '#009688',
    height: '30%',
    width: '60%',
    marginLeft: '20%',
  },
  relatedStocksContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  relatedStocksRow: {
    flexDirection: 'row',
  },
  relatedStockCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    width: 120,
  },
  relatedStockName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  relatedStockPrice: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  relatedStockChange: {
    fontSize: 13,
    fontWeight: '600',
  },
  positiveChange: {
    color: '#E53935',
  },
  negativeChange: {
    color: '#009688',
  },
  postActions: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#333333',
  },
  actionButton: {
    marginRight: 30,
    padding: 5,
  },
  actionWithCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCount: {
    color: '#8e8e93',
    fontSize: 14,
    marginLeft: 5,
  },
  commentsSection: {
    borderTopWidth: 5,
    borderTopColor: '#1f1f1f',
    paddingTop: 15,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  commentUserInfo: {
    marginRight: 10,
  },
  commentUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
  },

  commentContent: {
    flex: 1,
  },
  commentUsername: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  commentText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  commentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentTime: {
    color: '#8e8e93',
    fontSize: 12,
    marginRight: 15,
  },
  commentActions: {
    flexDirection: 'row',
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  commentActionCount: {
    color: '#8e8e93',
    fontSize: 12,
    marginLeft: 3,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#333333',
    backgroundColor: '#000000',
    height: 50
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#1c1c21',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#ffffff',
    marginRight: 10,
    fontSize: 15,
    minHeight: 30,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
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
    padding: 20,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  noCommentsText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
  replyingToContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#1f1f1f',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  replyingToText: {
    color: '#8e8e93',
    fontSize: 12,
  },

});
