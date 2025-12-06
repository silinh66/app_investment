import axios from 'axios';
import { Alert } from 'react-native';

export const uploadImageToCloudinary = async (imageFile: any) => {
  try {
    if (!imageFile) {
      Alert.alert('Thông báo', 'Chưa có file ảnh.');
      return null;
    }

    const uploadPreset = 'online-quiz-dev-topics';
    const formData = new FormData();
    formData.append('cloud_name', 'dw5j6ht9n');
    formData.append('upload_preset', uploadPreset);
    formData.append('file', imageFile as any);

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dw5j6ht9n/image/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return {
      url: response.data.secure_url,
      ...response.data,
    };
  } catch (error: any) {
    console.error('Error uploading image to Cloudinary:', error);
    if (error.response) {
      Alert.alert('Lỗi', error.response.data?.error?.message || 'Không thể tải ảnh lên');
    }
    return null;
  }
};
