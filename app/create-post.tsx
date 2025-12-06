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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { postsApi } from '../api/posts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreatePostScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is authenticated when component mounts
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/auth/login');
    }
  }, [isAuthenticated]);

  const handleCancel = () => {
    router.back();
  };

  const handlePublish = async () => {
    if (!postContent.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung bài viết');
      return;
    }

    try {
      setLoading(true);
      await postsApi.createPost({
        title: 'A32 - Thanh Khoản Sụt Giảm Mạnh, Nước Ngoài Bán Ròng 800 Tỷ, Thị Trường Liệu Có Rủi Ro?',
        content: postContent,
        image: [
          'https://res.cloudinary.com/dw5j6ht9n/image/upload/v1757032451/d69lugv1dsdjhy3doief.png'
        ]
      });
      
      // Set a flag in AsyncStorage to indicate that posts need to be refreshed
      await AsyncStorage.setItem('refreshPosts', 'true');
      
      // Success - go back to previous screen
      router.back();
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Lỗi', 'Không thể tạo bài viết. Vui lòng thử lại.');
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
        style={styles.keyboardAvoid}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={[styles.cancelButton, { color: theme.colors.text }]}>Cancel</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>发表讨论</Text>
          <TouchableOpacity 
            style={[styles.publishButton, 
              { backgroundColor: theme.mode === 'dark' ? '#193875' : '#e3f2fd' },
              postContent.length > 0 && { backgroundColor: theme.colors.primary }
            ]} 
            onPress={handlePublish}
            disabled={postContent.length === 0 || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={[
                styles.publishButtonText, 
                { color: theme.mode === 'dark' ? '#5e7abe' : '#bdbdbd' },
                postContent.length > 0 && { color: '#fff' }
              ]}>
                发布
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Post Content Input */}
        <TextInput
          style={[styles.postInput, { color: theme.colors.text }]}
          placeholder="说说你的看法..."
          placeholderTextColor={theme.mode === 'dark' ? "#555" : "#9e9e9e"}
          multiline
          value={postContent}
          onChangeText={setPostContent}
          autoFocus
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardAvoid: {
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
  postInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
