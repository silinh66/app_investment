import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { 
  HomeIcon, 
  SearchIcon, 
  ProfileIcon, 
  SettingsIcon,
  NotificationIcon,
  ChartIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FilterIcon,
  MenuIcon,
  IconWrapper 
} from './index';

/**
 * Example usage of the SVG icon system
 * This demonstrates how to use the icons in your app
 */
const ExampleUsage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Icon Examples</Text>
      
      {/* Basic icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Icons</Text>
        <View style={styles.iconRow}>
          <HomeIcon size={24} color="#007AFF" />
          <SearchIcon size={24} color="#007AFF" />
          <ProfileIcon size={24} color="#007AFF" />
          <SettingsIcon size={24} color="#007AFF" />
          <NotificationIcon size={24} color="#007AFF" />
        </View>
      </View>

      {/* Different sizes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Sizes</Text>
        <View style={styles.iconRow}>
          <ChartIcon size={16} color="#34C759" />
          <ChartIcon size={24} color="#34C759" />
          <ChartIcon size={32} color="#34C759" />
          <ChartIcon size={40} color="#34C759" />
        </View>
      </View>

      {/* With IconWrapper */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With Background</Text>
        <View style={styles.iconRow}>
          <IconWrapper 
            size={48} 
            backgroundColor="#007AFF" 
            borderRadius={24}
            padding={12}
          >
            <HomeIcon size={24} color="#FFFFFF" />
          </IconWrapper>
          
          <IconWrapper 
            size={48} 
            backgroundColor="#34C759" 
            borderRadius={8}
            padding={12}
          >
            <SearchIcon size={24} color="#FFFFFF" />
          </IconWrapper>
          
          <IconWrapper 
            size={48} 
            backgroundColor="#FF3B30" 
            borderRadius={0}
            padding={12}
          >
            <NotificationIcon size={24} color="#FFFFFF" />
          </IconWrapper>
        </View>
      </View>

      {/* As buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>As Buttons</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.button}>
            <FilterIcon size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Filter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button}>
            <MenuIcon size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Directional icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Directional</Text>
        <View style={styles.iconRow}>
          <ArrowUpIcon size={24} color="#34C759" />
          <ArrowDownIcon size={24} color="#FF3B30" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default ExampleUsage;