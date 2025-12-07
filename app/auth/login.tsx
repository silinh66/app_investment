import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native';

interface LoginForm {
  email: string;
  password: string;
}

type LoginStep = 'options' | 'email' | 'password';

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const { login, loading, isAuthenticated, refreshAuthStatus } = useAuth();
  const [step, setStep] = useState<LoginStep>('options');
  const [showPass, setShowPass] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
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
      AsyncStorage.getItem('PREVIOUS_ROUTE').then((storedRoute) => {
        if (storedRoute) {
          AsyncStorage.removeItem('PREVIOUS_ROUTE');
          try {
            const route = JSON.parse(storedRoute);
            if (route?.pathname === '/home_tab/BangGiaTab') {
              router.back()
            } else {
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
      await refreshAuthStatus();
    } catch (error: any) {
      console.log('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';

      if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      } else {
        errorMessage = error.message || errorMessage;
      }

      Alert.alert('Error', errorMessage);
    }
  };

  const handleEmailContinue = async () => {
    const isEmailValid = await trigger('email');
    if (isEmailValid) {
      setStep('password');
    }
  };

  const goBack = () => {
    if (step === 'password') {
      setStep('email');
    } else if (step === 'email') {
      setStep('options');
    } else {
      router.back();
    }
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
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      </View>
    );
  }

  const renderOptionsStep = () => (
    <>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.header}>
        {/* <Text style={styles.logoText}>dautubenvung.vn</Text> */}
        {/* logo logo_white_blue.png */}
        <Image
          source={require('../../assets/images/logo_white_blue.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.description}>Các tín hiệu đầu tư tuyệt vời đang chờ đón bạn.</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={[styles.socialButton, styles.appleButton,]}>
          <Ionicons name="logo-apple" size={24} color="#000000" />
          <Text style={[styles.socialButtonText, styles.appleButtonText]}>Đăng nhập với Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, { backgroundColor: theme.colors.card }]}>
          <Ionicons name="logo-google" size={24} color="#FFFFFF" />
          <Text style={styles.socialButtonText}>Đăng nhập với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: theme.colors.card }]} onPress={() => setStep('email')}>
          <Ionicons name="mail-outline" size={24} color="#FFFFFF" />
          <Text style={styles.socialButtonText}>Đăng nhập với Email hoặc SĐT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: theme.colors.card }]}>
          <Ionicons name="logo-facebook" size={24} color="#fff" />
          <Text style={styles.socialButtonText}>Đăng nhập với Facebook</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text style={{ color: '#8E8E93' }}>
            Chưa có tài khoản? <Text style={{ color: '#3B82F6' }} onPress={() => router.push('/auth/register')}>Đăng Ký</Text>
          </Text>
        </View>
      </View>
    </>
  );

  const renderEmailStep = () => (
    <>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.description}>
          Vui lòng điền email hoặc số điện thoại của bạn để kiểm tra.
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.inputLabel}>Emai/Số điện thoại</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Vui lòng nhập số điện thoại hoặc email.',
            pattern: {
              value: /^([^\s@]+@[^\s@]+\.[^\s@]+|[0-9]{10,11})$/,
              message: 'Vui lòng nhập email hợp lệ hoặc số điện thoại.'
            }
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={[styles.inputContainer,]}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={[styles.input, { backgroundColor: theme.colors.card }]}
                keyboardType="email-address"
                placeholder="Điền email hoặc số điện thoại của bạn"
                placeholderTextColor="#666666"
                autoCapitalize="none"
              />
              {errors.email?.message && (
                <Text style={styles.errorText}>{errors.email?.message}</Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.colors.blue }]}
          onPress={handleEmailContinue}
        >
          <Text style={styles.primaryButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderPasswordStep = () => (
    <>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Xác nhận đăng nhập</Text>
        <Text style={styles.description}>Vui lòng nhập mật khẩu của bạn.</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.inputLabel}>Mật khẩu</Text>
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
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                placeholder="Vui lòng nhập mật khẩu của bạn."
                placeholderTextColor="#666666"
                secureTextEntry={!showPass}
              />
              <TouchableOpacity style={styles.inputIcon} onPress={onShowPass}>
                <Ionicons name={showPass ? "eye-off" : "eye"} size={20} color="#8E8E93" />
              </TouchableOpacity>
              {errors.password?.message && (
                <Text style={styles.errorText}>{errors.password?.message}</Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.colors.blue }]}
          onPress={handleSubmit(onSubmitLogin)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Tiếp tục</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Bạn quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.linkText}>Đặt lại mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {step === 'options' && renderOptionsStep()}
        {step === 'email' && renderEmailStep()}
        {step === 'password' && renderPasswordStep()}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;