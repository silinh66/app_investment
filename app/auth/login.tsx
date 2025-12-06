import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginForm {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const { login, loading, isAuthenticated, refreshAuthStatus } = useAuth();
  const [showPass, setShowPass] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Debug: Log authentication state changes
  useEffect(() => {
    console.log('Auth state changed - isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Navigating to tabs screen');
      // Check if there's a previous route stored
      AsyncStorage.getItem('PREVIOUS_ROUTE').then((storedRoute) => {
        if (storedRoute) {
          // Clear the stored route
          AsyncStorage.removeItem('PREVIOUS_ROUTE');
          // Parse and navigate to the previous route
          try {
            const route = JSON.parse(storedRoute);
            console.log('Redirecting to previous route:', route);
            if(route?.pathname === '/home_tab/BangGiaTab') {              
              router.back()
            } else {
              // router.replace(route.pathname || '/(tabs)');
              router.back()
            }
          } catch (e) {
            console.error('Error parsing previous route:', e);
            router.back()
          }
        } else {
          router.back()
        }
      }).catch((e) => {
        console.error('Error retrieving previous route:', e);
        router.replace('/(tabs)');
      });
    }
  }, [isAuthenticated]);

  const onShowPass = () => {
    setShowPass(!showPass);
  };

  const onSubmitLogin = async (data: LoginForm) => {
    try {
      console.log('Attempting login with:', data.email);
      await login(data.email, data.password);
      console.log('Login successful, refreshing auth status');
      // Force a refresh of auth status to ensure navigation
      await refreshAuthStatus();
    } catch (error: any) {
      console.log('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Network error. Please check your connection.';
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
      }
      
      Alert.alert('Error', errorMessage);
    }
  };

  const onNavigateToRegister = () => {
    router.push('/auth/register');
  };

  // Show loading screen if authenticated but still navigating
  if (isAuthenticated) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background
        }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ 
            fontSize: 16, 
            color: theme.colors.text,
            marginTop: 10
          }}>
            Signing in...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logo}>
          {/* Replace with your actual logo */}
          <Text style={[styles.logoText, { color: theme.colors.text }]}>LOGO</Text>
        </View>
        
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Welcome!
          </Text>
          <Text style={[styles.description, { color: theme.colors.secondaryText }]}>
            Chào mừng bạn tới dautubenvung.vn
          </Text>
        </View>
        
        <View style={styles.content}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Vui lòng nhập số điện thoại hoặc email.',
              pattern: {
                value: /^([^\s@]+@[^\s@]+\.[^\s@]+|[0-9]{10,11})$/,
                message: 'Vui lòng nhập email hợp lệ hoặc số điện thoại (10-11 chữ số).'
              }
            }}
            render={({
              field: { value, onChange, onBlur, ref },
            }) => {
              return (
                <View style={styles.inputContainer}>
                  <TextInput
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.colors.card,
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                      },
                    ]}
                    keyboardType={"email-address"}
                    placeholder={"Số điện thoại hoặc tài khoản email"}
                    placeholderTextColor={theme.colors.secondaryText}
                  />
                  <Text style={[styles.inputIcon, { color: theme.colors.iconColor }]}>
                    @
                  </Text>
                  {errors.email?.message ? (
                    <Text style={styles.errorText}>{errors.email?.message}</Text>
                  ) : null}
                </View>
              );
            }}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Vui lòng nhập mật khẩu.',
              minLength: {
                value: 6,
                message: 'Mật khẩu tối thiểu 6 ký tự.'
              }
            }}
            render={({
              field: { value, onChange, onBlur, ref },
            }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  ref={ref}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.card,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  maxLength={20}
                  placeholder={"Mật khẩu"}
                  secureTextEntry={!showPass}
                  placeholderTextColor={theme.colors.secondaryText}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={onShowPass}>
                  <Text style={[styles.inputIcon, { color: theme.colors.iconColor }]}>
                    {showPass ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.passwordIcon, { color: theme.colors.iconColor }]}>
                  *
                </Text>
                {errors.password?.message ? (
                  <Text style={styles.errorText}>{errors.password?.message}</Text>
                ) : null}
              </View>
            )}
          />

          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={[styles.forgotPasswordText, { color: theme.colors.secondaryText }]}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.loginButton,
                {
                  backgroundColor: isValid
                    ? theme.colors.primary
                    : theme.colors.border,
                },
              ]}
              onPress={handleSubmit(onSubmitLogin)}
              disabled={!isValid || loading}
            >
              {loading ? (
                <ActivityIndicator
                  color="#fff"
                  style={{ marginRight: 5 }}
                />
              ) : null}
              <Text style={styles.loginButtonText}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.registerContainer}>
            <Text style={[styles.accountText, { color: theme.colors.text }]}>
              Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.registerButton}
              onPress={onNavigateToRegister}
            >
              <Text style={[styles.registerText, { color: theme.colors.primary }]}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
          {/* Tiếp tục dùng app mà không cần đăng nhập */}
          <TouchableOpacity 
          activeOpacity={0.8}
          style={{padding: 4}}
          onPress={() => {
            console.log('Navigating to tabs screen');
      // Check if there's a previous route stored
      AsyncStorage.getItem('PREVIOUS_ROUTE').then((storedRoute) => {
        
        if (storedRoute) {
          // Clear the stored route
          AsyncStorage.removeItem('PREVIOUS_ROUTE');
          // Parse and navigate to the previous route
          try {
            const route = JSON.parse(storedRoute);
            console.log('Redirecting to previous route:', route);
            if(route?.pathname === '/home_tab/BangGiaTab') {    
              console.log('Stored routeeeeeeeeeeee:', storedRoute);
              router.back()
            } else {

              router.back()
            }
          } catch (e) {
            console.error('Error parsing previous route:', e);
            router.replace('/(tabs)');
          }
        } else {
          router.replace('/(tabs)');
        }
      }).catch((e) => {
        console.error('Error retrieving previous route:', e);
        router.replace('/(tabs)');
      });
          }}>

            <Text style={[{ color: theme.colors.disclaimerText, textAlign: 'center' }]}>
              Tiếp tục dùng app mà không cần đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;