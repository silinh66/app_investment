import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Comment } from '../../api/topics';
import { topicsApi } from '../../api/topics';
import { CommentInput } from './CommentInput';
import { CommentItem } from './CommentItem';

interface CommentListProps {
  topicId: number;
}

export const CommentList: React.FC<CommentListProps> = ({ topicId }) => {
  const { theme } = useTheme();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await topicsApi.getComments(topicId);
      if (response.data) {
        setComments(response.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [topicId]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchComments();
  };

  const handleCommentSubmit = async (content: string) => {
    try {
      await topicsApi.postComment(topicId, content);
      await fetchComments(); // Refresh comments after posting
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  };

  // Filter top-level comments (comments without parent_id)
  const topLevelComments = comments.filter((c) => !c.parent_id);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>
          Bình luận ({comments.length})
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.commentsContainer}>
          {topLevelComments.length > 0 ? (
            topLevelComments.map((comment) => (
              <CommentItem
                key={comment.comment_id}
                comment={comment}
                topicId={topicId}
                onReplyAdded={fetchComments}
                allComments={comments}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>
                Chưa có bình luận nào
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <CommentInput onSubmit={handleCommentSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  commentsContainer: {
    padding: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
});
