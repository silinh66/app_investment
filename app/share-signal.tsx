import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, ActivityIndicator, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import axiosClient from '../api/request';

export default function ShareSignalScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { signalName = 'Tín hiệu SSI' } = useLocalSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch friends from API
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosClient.get('/getFriends');
        if (response.data?.friends) {
          setContacts(response.data.friends.map((friend: any) => ({
            id: friend.userId.toString(),
            name: friend.name,
            avatar: friend.avatar || '👤',
            isOnline: friend.isOnline
          })));
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
        // Fallback to dummy data if API fails
        setContacts([
          { id: '1', name: 'Nguyễn Văn An', avatar: '👨‍💼' },
          { id: '2', name: 'Phạm Ngọc Ánh', avatar: '👩‍💼' },
          { id: '3', name: 'Lê Minh Hoàng', avatar: '👨‍🎓' },
          { id: '4', name: 'Trần Thị Lan', avatar: '👩‍🌾' },
          { id: '5', name: 'Hoàng Văn Dũng', avatar: '👨‍🔧' },
          { id: '6', name: 'Phan Thị Hường', avatar: '👩‍🎨' },
          { id: '7', name: 'Đặng Quốc Bảo', avatar: '👨‍🍳' },
          { id: '8', name: 'Đỗ Trường Giang', avatar: '👨‍💻' },
          { id: '9', name: 'Bùi Khánh Lâm', avatar: '👨‍🎤' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleShare = () => {
    // Handle share logic here
    console.log('Sharing signal with contacts:', selectedContacts);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>Đang tải danh sách bạn bè...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: theme.colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{signalName}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.searchBar, { 
          backgroundColor: theme.mode === 'dark' ? '#2C2C2E' : '#F2F2F7',
          borderColor: theme.mode === 'dark' ? '#3A3A3C' : '#E5E5E7'
        }]}>
          <Text style={[styles.searchIcon, { color: '#8E8E93' }]}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Tìm kiếm bạn bè..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Share Title */}
      <View style={styles.shareTitleContainer}>
        <Text style={[styles.shareTitle, { color: theme.colors.text }]}>Chia sẻ tín hiệu cho bạn bè:</Text>
      </View>

      {/* Contacts List */}
      <ScrollView style={styles.contactsList} showsVerticalScrollIndicator={false}>
        {filteredContacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            style={[styles.contactItem, { 
              backgroundColor: theme.colors.background,
              borderBottomColor: theme.mode === 'dark' ? '#3A3A3C' : '#E5E5E7'
            }]}
            onPress={() => toggleContact(contact.id)}
          >
            <View style={styles.contactInfo}>
              {/* Avatar */}
              <View style={[styles.avatar, { 
                backgroundColor: theme.mode === 'dark' ? '#3A3A3C' : '#E5E5E7'
              }]}>
                {contact.avatar && typeof contact.avatar === 'string' && contact.avatar.startsWith('http') ? (
                  <Image 
                    source={{ uri: contact.avatar }} 
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{contact.avatar || '👤'}</Text>
                  </View>
                )}
              </View>
              
              {/* Name */}
              <Text style={[styles.contactName, { color: theme.colors.text }]}>
                {contact.name}
              </Text>
            </View>
            
            {/* Checkbox */}
            <View style={[styles.checkbox, {
              backgroundColor: selectedContacts.includes(contact.id) ? theme.colors.primary : 'transparent',
              borderColor: selectedContacts.includes(contact.id) ? theme.colors.primary : '#8E8E93'
            }]}>
              {selectedContacts.includes(contact.id) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer Buttons */}
      <View style={[styles.footer, { 
        backgroundColor: theme.colors.background,
        borderTopColor: theme.mode === 'dark' ? '#3A3A3C' : '#E5E5E7'
      }]}>
        <TouchableOpacity 
          style={[styles.cancelButton, { 
            backgroundColor: theme.mode === 'dark' ? '#2C2C2E' : '#F2F2F7'
          }]}
          onPress={handleCancel}
        >
          <Text style={[styles.cancelButtonText, { color: theme.colors.text }]}>Hủy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.shareButton, { 
            backgroundColor: selectedContacts.length > 0 ? theme.colors.primary : '#8E8E93',
            opacity: selectedContacts.length > 0 ? 1 : 0.5
          }]}
          onPress={handleShare}
          disabled={selectedContacts.length === 0}
        >
          <Text style={styles.shareButtonText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  shareTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  contactsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  shareButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});