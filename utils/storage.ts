import AsyncStorage from '@react-native-async-storage/async-storage';

export enum STORAGE_KEY {
  ACCESS_TOKEN = 'AccessToken',
  REFRESH_TOKEN = 'RefreshToken',
  USER_DATA = 'UserData',
}

export const setDataStorage = async (key: string, data: any) => {
  try {
    const value = JSON.stringify(data);
    await AsyncStorage.setItem(key, value);
    console.log('Stored data for key:', key);
    return true;
  } catch (error) {
    console.error('Error storing data for key:', key, error);
    return null;
  }
};

export const getDataStorage = async <T = any>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      const parsed = JSON.parse(value);
      return parsed;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving data for key:', key, error);
    return null;
  }
};

export const removeDataStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Removed data for key:', key);
    return true;
  } catch (error) {
    console.error('Error removing data for key:', key, error);
    return null;
  }
};

export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Cleared all storage');
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return null;
  }
};