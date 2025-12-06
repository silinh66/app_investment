import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Comment } from '../../api/topics';
import { topicsApi } from '../../api/topics';
import { CommentInput } from './CommentInput';
import { getDataStorage, STORAGE_KEY } from '../../utils/storage';

interface CommentItemProps {
  comment: Comment;
  topicId: number;
  level?: number;
  onReplyAdded?: () => void;
  allComments?: Comment[];
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  topicId,
  level = 1,
  onReplyAdded,
  allComments = [],
}) => {
  const { theme } = useTheme();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.like_count || 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    // Get current user ID
    const getUserId = async () => {
      try {
        const userData = await getDataStorage(STORAGE_KEY.USER_DATA);
        if (userData && userData.id) {
          setCurrentUserId(Number(userData.id));
        }
      } catch (err) {
        console.warn('Could not get user id', err);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    // Check if current user has liked this comment
    if (currentUserId && comment.likes) {
      const userLiked = comment.likes.some((like) => like.userId === currentUserId);
      setIsLiked(userLiked);
    }
    setLikeCount(comment.like_count || 0);
  }, [comment, currentUserId]);

  const handleLikeToggle = async () => {
    if (likeLoading) return;

    // Optimistic update
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    setIsLiked(!previousIsLiked);
    setLikeCount((prev) => prev + (previousIsLiked ? -1 : 1));
    setLikeLoading(true);

    try {
      if (previousIsLiked) {
        await topicsApi.unlikeComment(topicId, comment.comment_id);
      } else {
        await topicsApi.likeComment(topicId, comment.comment_id);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Rollback on error
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleReplySubmit = async (content: string) => {
    try {
      await topicsApi.postComment(topicId, content, comment.comment_id);
      setShowReplyInput(false);
      if (onReplyAdded) {
        onReplyAdded();
      }
    } catch (error) {
      console.error('Error posting reply:', error);
      throw error;
    }
  };

  const getTimeDifference = (dateString: string) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffInMs = now.getTime() - commentDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    return commentDate.toLocaleDateString('vi-VN');
  };

  // Get child comments (replies) - only up to level 3
  const childComments =
    level < 3
      ? allComments.filter((c) => c.parent_id === comment.comment_id)
      : [];

  const canReply = level < 3;

  return (
    <View style={[styles.container, { marginLeft: level > 1 ? 20 : 0 }]}>
      <View style={styles.commentContent}>
        <Image
          source={{ uri: comment.avatar || 'https://i.pravatar.cc/40?img=1' }}
          style={styles.avatar}
        />
        <View style={styles.contentWrapper}>
          <View style={[styles.bubble, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.username, { color: theme.colors.text }]}>
              {comment.author}
            </Text>
            <Text style={[styles.content, { color: theme.colors.text }]}>
              {comment.content}
            </Text>
          </View>

          <View style={styles.actions}>
            <Text style={[styles.time, { color: theme.colors.secondaryText }]}>
              {getTimeDifference(comment.created_at)}
            </Text>

            <TouchableOpacity onPress={handleLikeToggle} style={styles.actionButton}>
              {likeLoading ? (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              ) : (
                <Text
                  style={[
                    styles.actionText,
                    { color: isLiked ? theme.colors.primary : theme.colors.secondaryText },
                  ]}
                >
                  Thích ({likeCount})
                </Text>
              )}
            </TouchableOpacity>

            {canReply && (
              <TouchableOpacity
                onPress={() => setShowReplyInput(!showReplyInput)}
                style={styles.actionButton}
              >
                <Text style={[styles.actionText, { color: theme.colors.secondaryText }]}>
                  Phản hồi
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {showReplyInput && canReply && (
        <View style={styles.replyInputContainer}>
          <CommentInput
            placeholder={`Trả lời ${comment.author}...`}
            onSubmit={handleReplySubmit}
            autoFocus
          />
        </View>
      )}

      {/* Render child comments (replies) */}
      {childComments.length > 0 && (
        <View style={styles.repliesContainer}>
          {childComments.map((childComment) => (
            <CommentItem
              key={childComment.comment_id}
              comment={childComment}
              topicId={topicId}
              level={level + 1}
              onReplyAdded={onReplyAdded}
              allComments={allComments}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  commentContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  contentWrapper: {
    flex: 1,
  },
  bubble: {
    padding: 12,
    borderRadius: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 12,
    gap: 12,
  },
  time: {
    fontSize: 12,
  },
  actionButton: {
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  replyInputContainer: {
    marginTop: 8,
    marginLeft: 44,
  },
  repliesContainer: {
    marginTop: 8,
  },
});
