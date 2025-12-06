import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { postsApi } from '../api/posts';

export default function SharePostScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [shareContent, setShareContent] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Check if user is authenticated when component mounts
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/auth/login');
    }
  }, [isAuthenticated]);
  
  // Post data mockup - in a real app, you would get this from params or API
  const postData = {
    avatar: 'https://i.pravatar.cc/150?img=3',
    username: '77的实盘',
    content: '简单分享一下明天思路，周五缩量上涨，整体强度主要集中在创业板...'
  };

  // Add keyboard listeners
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleCancel = () => {
    router.back();
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      // For sharing, we would typically create a new post that references the original
      // This is a simplified implementation
      await postsApi.createPost({
        title: 'Shared Post',
        content: shareContent || 'Interesting post share',
        image_url: ''
      });
      
      // Success - go back to previous screen
      router.back();
    } catch (error) {
      console.error('Error sharing post:', error);
      Alert.alert('Lỗi', 'Không thể chia sẻ bài viết. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Don't render the screen if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={[styles.cancelButton, { color: theme.colors.text }]}>Cancel</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>转发</Text>
          <TouchableOpacity 
            style={[styles.publishButton, 
              { backgroundColor: theme.mode === 'dark' ? '#193875' : '#e3f2fd' },
              shareContent.length > 0 && { backgroundColor: theme.colors.primary }
            ]} 
            onPress={handlePublish}
            disabled={shareContent.length === 0 || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={[
                styles.publishButtonText, 
                { color: theme.mode === 'dark' ? '#5e7abe' : '#bdbdbd' },
                shareContent.length > 0 && { color: '#fff' }
              ]}>
                发布
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {/* Share Content Input */}
          <TextInput
            style={[styles.shareInput, { color: theme.colors.text }]}
            placeholder="说说你的看法..."
            placeholderTextColor={theme.mode === 'dark' ? "#555" : "#9e9e9e"}
            multiline
            value={shareContent}
            onChangeText={setShareContent}
            autoFocus
          />
          
          {/* Original Post Preview - Now at the bottom */}
          <View style={[styles.originalPostContainer, 
            { backgroundColor: theme.mode === 'dark' ? '#1E2732' : '#f5f5f5' }, 
            keyboardVisible && styles.originalPostWithKeyboard]}>
            <View style={styles.originalPost}>
              <Image 
                source={{ uri: postData.avatar }} 
                style={styles.avatar}
              />
              <View style={styles.postContentContainer}>
                <Text style={[styles.username, { color: theme.colors.text }]}>{postData.username}:</Text>
                <Text style={[styles.postContent, { color: theme.mode === 'dark' ? '#ccc' : '#666' }]} numberOfLines={2}>
                  {postData.content}
                </Text>
              </View>
            </View>
            <Text style={[styles.characterCount, { color: theme.mode === 'dark' ? '#666' : '#9e9e9e' }]}>140</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flex1: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  publishButton: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  shareInput: {
    fontSize: 16,
    marginBottom: 16,
    textAlignVertical: 'top',
    height: 100,
  },
  originalPostContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  originalPostWithKeyboard: {
    position: 'relative',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
    marginBottom: 16,
  },
  originalPost: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postContentContainer: {
    flex: 1,
  },
  username: {
    fontWeight: '600',
    marginBottom: 4,
  },
  postContent: {
    fontSize: 14,
  },
  characterCount: {
    textAlign: 'right',
    fontSize: 12,
  },
});
