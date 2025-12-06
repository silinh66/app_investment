import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function AccountScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  // Menu items data
  const menuItems = [
    { 
      id: 'advance-quote', 
      icon: <MaterialIcons name="diamond" size={24} color={theme.colors.iconColor} />, 
      title: 'Advance Quote Service',
      onPress: () => console.log('Advance Quote Service')
    },
    { 
      id: 'commissions', 
      icon: <MaterialIcons name="receipt-long" size={24} color={theme.colors.iconColor} />, 
      title: 'Commissions&Fees Calculator',
      onPress: () => console.log('Commissions&Fees Calculator')
    },
    { 
      id: 'activity', 
      icon: <MaterialIcons name="timeline" size={24} color={theme.colors.iconColor} />, 
      title: 'Activity Center',
      onPress: () => console.log('Activity Center')
    },
    { 
      id: 'rewards', 
      icon: <MaterialIcons name="card-giftcard" size={24} color={theme.colors.iconColor} />, 
      title: 'Rewards',
      onPress: () => console.log('Rewards')
    },
    { 
      id: 'drafts', 
      icon: <MaterialIcons name="drafts" size={24} color={theme.colors.iconColor} />, 
      title: 'Hộp thư nháp',
      onPress: () => console.log('Drafts')
    },
    { 
      id: 'help', 
      icon: <MaterialIcons name="help" size={24} color={theme.colors.iconColor} />, 
      title: 'Trung tâm trợ giúp',
      onPress: () => console.log('Help Center')
    },
    { 
      id: 'feedback', 
      icon: <MaterialIcons name="email" size={24} color={theme.colors.iconColor} />, 
      title: 'Feedback',
      onPress: () => console.log('Feedback')
    },
    { 
      id: 'settings', 
      icon: <MaterialIcons name="settings" size={24} color={theme.colors.iconColor} />, 
      title: 'Setting',
      onPress: () => console.log('Settings')
    },
  ];
  
  // Footer items data
  const footerItems = [
    {
      id: 'snowball',
      icon: <FontAwesome name="snowflake-o" size={24} color={theme.colors.iconColor} />,
      line1: 'Thuộc Snowball',
      line2: 'Môi giới Hồng Kông & Mỹ'
    },
    {
      id: 'partner',
      icon: <FontAwesome5 name="korvue" size={24} color={theme.colors.iconColor} />,
      line1: 'Đối tác chiến lược',
      line2: 'Interactive Brokers'
    },
    {
      id: 'dual',
      icon: <MaterialCommunityIcons name="shield-check" size={24} color={theme.colors.iconColor} />,
      line1: 'Giám sát kép',
      line2: 'Mỹ/New Zealand'
    }
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Blue Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.headerBackground }]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View  style={styles.backButton}>
            </View>
            
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.headerIconButton} onPress={toggleTheme}>
                <MaterialIcons name="style" size={24} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconButton}>
                <MaterialIcons name="local-offer" size={24} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconButton}>
                <MaterialIcons name="email" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Profile Info or Login Button */}
          {isAuthenticated && user ? (
            <View style={styles.profileInfo}>
              <Image 
                source={{ uri: user.avatar || 'https://i.pravatar.cc/150?img=3' }}
                style={styles.avatar}
                contentFit="cover"
              />
              <View style={styles.userInfoContainer}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username}>{user.name || 'User'}</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="#ffffff" />
                </View>
                <View style={styles.userIdContainer}>
                  <MaterialIcons name="verified-user" size={16} color="#ffffff" />
                  <Text style={styles.userId}>Người dùng {user.id || 'Unknown'}</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={16} color="#ffffff" />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => router.push('/auth/login')}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Quick Action Buttons */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.quickActionBackground }]}>
                <MaterialIcons name="bar-chart" size={28} color="#ffffff" />
              </View>
              <Text style={styles.quickActionText}>Giao dịch mô phỏng</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.quickActionBackground }]}>
                <MaterialIcons name="school" size={28} color="#ffffff" />
              </View>
              <Text style={styles.quickActionText}>Lớp học đầu tư</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.quickActionBackground }]}>
                <MaterialIcons name="headset-mic" size={28} color="#ffffff" />
              </View>
              <Text style={styles.quickActionText}>Liên hệ hỗ trợ</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
      
      {/* Menu Items */}
      <ScrollView style={[styles.menuContainer, { backgroundColor: theme.colors.menuBackground }]}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
            onPress={item.onPress}
          >
            <View style={styles.menuIconTitle}>
              {item.icon}
              <Text style={[styles.menuTitle, { color: theme.colors.text }]}>{item.title}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.iconColor} />
          </TouchableOpacity>
        ))}
        
        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
          onPress={handleLogout}
        >
          <View style={styles.menuIconTitle}>
            <MaterialIcons name="logout" size={24} color={theme.colors.iconColor} />
            <Text style={[styles.menuTitle, { color: theme.colors.text }]}>Logout</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.iconColor} />
        </TouchableOpacity>
        
        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
          {footerItems.map((item) => (
            <View key={item.id} style={styles.footerItem}>
              <View style={[styles.footerIconContainer, { backgroundColor: theme.colors.footerItemBackground }]}>
                {item.icon}
              </View>
              <Text style={[styles.footerText, { color: theme.colors.footerText }]}>{item.line1}</Text>
              <Text style={[styles.footerText, { color: theme.colors.footerText }]}>{item.line2}</Text>
            </View>
          ))}
        </View>
        
        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={[styles.disclaimerText, { color: theme.colors.disclaimerText }]}>
            Dịch vụ giao dịch chứng khoán do nhà cung cấp dịch vụ tài chính
          </Text>
          <Text style={[styles.disclaimerText, { color: theme.colors.disclaimerText }]}>
            SNB Finance Holdings Limited đăng ký tại New Zealand cung cấp
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121923',
  },
  header: {
    backgroundColor: '#004494',
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  backButton: {
    padding: 5,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIconButton: {
    marginLeft: 25,
    padding: 5,
    opacity: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  userInfoContainer: {
    marginLeft: 15,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
  userIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  userId: {
    fontSize: 14,
    color: '#cccccc',
    marginLeft: 5,
    marginRight: 5,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    paddingHorizontal: 10,
  },
  quickActionButton: {
    alignItems: 'center',
    width: '30%',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    color: '#ffffff',
    fontSize: 16,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#121923',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e2732',
  },
  menuIconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    borderTopWidth: 1,
    borderTopColor: '#1e2732',
    marginTop: 20,
  },
  footerItem: {
    alignItems: 'center',
    width: '33%',
  },
  footerIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1e2732',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: '#8e8e93',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  disclaimer: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  disclaimerText: {
    color: '#4e4e4e',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});