import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { uploadImageToCloudinary } from '../utils/cloudinary';
import { topicsApi, CreateTopicParams, TopicImage } from '../api/topics';
import { getDataStorage, STORAGE_KEY } from '../utils/storage';
import { useLocalSearchParams } from 'expo-router';

const MAX_IMAGES = 2;

interface CreateTopicModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  symbolName?: string;
}

export const CreateTopicModal: React.FC<CreateTopicModalProps> = ({
  visible,
  onClose,
  onSuccess,
  symbolName = 'ACB',
}) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<TopicImage[]>([]);
  const [previewImages, setPreviewImages] = useState<{ uri: string; url?: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user name from storage
    const getUserName = async () => {
      try {
        const userData = await getDataStorage(STORAGE_KEY.USER_DATA);
        if (userData && userData.name) {
          setUserName(userData.name);
        }
      } catch (err) {
        console.warn('Could not get user name', err);
      }
    };
    getUserName();
  }, []);

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  const handlePickImage = async () => {
    if (previewImages.length >= MAX_IMAGES) {
      Alert.alert('Thông báo', `Chỉ được đăng tối đa ${MAX_IMAGES} ảnh.`);
      return;
    }

    // Request permission
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Lỗi', 'Cần cấp quyền truy cập thư viện ảnh');
        return;
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false, // iOS doesn't support multiple selection well
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        const slotsLeft = MAX_IMAGES - previewImages.length;
        
        if (slotsLeft <= 0) {
          Alert.alert('Thông báo', `Chỉ được đăng tối đa ${MAX_IMAGES} ảnh.`);
          return;
        }

        setUploading(true);
        const newImages: TopicImage[] = [];
        const newPreviews: { uri: string; url?: string }[] = [];

        for (const asset of result.assets) {
          // Create form data for upload
          const fileUri = asset.uri;
          const fileName = fileUri.split('/').pop() || 'image.jpg';
          const fileType = asset.mimeType || 'image/jpeg';

          const file: any = {
            uri: fileUri,
            name: fileName,
            type: fileType,
          };

          const uploadResult = await uploadImageToCloudinary(file);

          if (uploadResult && uploadResult.url) {
            newImages.push({ url: uploadResult.url });
            newPreviews.push({ uri: asset.uri, url: uploadResult.url });
          }
        }

        setImages((prev) => [...prev, ...newImages]);
        setPreviewImages((prev) => [...prev, ...newPreviews]);
        setUploading(false);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Lỗi', 'Không thể chọn ảnh');
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  
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

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setSubmitting(true);
    try {
      const params: CreateTopicParams = {
        title: symbolName ? `${symbolName} - ${title}` : title,
        description,
        image: images,
        symbol_name: symbolName || undefined,
        userId: currentUserId,
        recommendation: 'SELL',
        price: '1',
      };
      

      await topicsApi.createTopic(params);

      Alert.alert('Thành công', 'Bài viết đã được tạo');
      handleClose();
      onSuccess();
    } catch (error: any) {
      console.error('Error creating topic:', error);
      Alert.alert('Lỗi', error.message || 'Không thể tạo bài viết');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setImages([]);
    setPreviewImages([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.card }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Tạo bài viết
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* User info */}
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: theme.colors.text }]}>
                {userName || 'User'}
              </Text>
            </View>

            {/* Title input */}
            <TextInput
              style={[
                styles.titleInput,
                {
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              placeholder="Nhập tiêu đề bài viết"
              placeholderTextColor={theme.colors.secondaryText}
              value={title}
              onChangeText={setTitle}
              multiline
            />

            {/* Description input */}
            <TextInput
              style={[
                styles.descriptionInput,
                {
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              placeholder={`${userName}, bạn đang nghĩ gì thế?`}
              placeholderTextColor={theme.colors.secondaryText}
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />

            {/* Image upload */}
            <TouchableOpacity
              style={[styles.uploadButton, { borderColor: theme.colors.border }]}
              onPress={handlePickImage}
              disabled={uploading || previewImages.length >= MAX_IMAGES}
            >
              <MaterialIcons
                name="add-photo-alternate"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={[styles.uploadText, { color: theme.colors.text }]}>
                Thêm ảnh/video
              </Text>
            </TouchableOpacity>

            {/* Image previews */}
            {previewImages.length > 0 && (
              <View style={styles.previewContainer}>
                {previewImages.map((img, index) => (
                  <View key={index} style={styles.previewItem}>
                    <Image source={{ uri: img.uri }} style={styles.previewImage} />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveImage(index)}
                    >
                      <MaterialIcons name="close" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {uploading && (
              <View style={styles.uploadingContainer}>
                <ActivityIndicator size="small" color={theme.colors.primary} />
                <Text style={[styles.uploadingText, { color: theme.colors.text }]}>
                  Đang tải ảnh lên...
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: theme.colors.border }]}
              onPress={handleClose}
            >
              <Text style={[styles.cancelText, { color: theme.colors.text }]}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor: isFormValid
                    ? theme.colors.primary
                    : theme.colors.border,
                },
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid || submitting || uploading}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitText}>Tiếp</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  body: {
    padding: 16,
  },
  userInfo: {
    marginBottom: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  titleInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    marginBottom: 12,
    minHeight: 80,
  },
  descriptionInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    marginBottom: 12,
    minHeight: 150,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: 12,
  },
  uploadText: {
    marginLeft: 8,
    fontSize: 14,
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  previewItem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 2,
  },
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  uploadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
