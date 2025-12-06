import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface CommentInputProps {
  placeholder?: string;
  onSubmit: (content: string) => Promise<void>;
  autoFocus?: boolean;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  placeholder = 'Hãy chia sẻ suy nghĩ của bạn...',
  onSubmit,
  autoFocus = false,
}) => {
  const { theme } = useTheme();
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() || submitting) return;

    setSubmitting(true);
    try {
      await onSubmit(content.trim());
      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderColor: theme.colors.border,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.secondaryText}
        value={content}
        onChangeText={setContent}
        multiline
        autoFocus={autoFocus}
        editable={!submitting}
      />
      <TouchableOpacity
        style={[
          styles.submitButton,
          {
            backgroundColor: content.trim() ? theme.colors.primary : theme.colors.border,
          },
        ]}
        onPress={handleSubmit}
        disabled={!content.trim() || submitting}
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <MaterialIcons name="send" size={20} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 14,
    maxHeight: 100,
  },
  submitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
