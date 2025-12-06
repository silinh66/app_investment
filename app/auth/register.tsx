import React, { useState } from 'react';
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

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen: React.FC = () => {
  const { theme } = useTheme();
  const { register, loading } = useAuth();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onShowPass = () => {
    setShowPass(!showPass);
  };

  const onShowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const onSubmitRegister = async (data: RegisterForm) => {
    try {
      await register(data.name, data.email, data.password, '');
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      
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

  const onNavigateToLogin = () => {
    router.push('/auth/login');
  };

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
            Đăng ký
          </Text>
          <Text style={[styles.description, { color: theme.colors.secondaryText }]}>
            Tạo tài khoản mới
          </Text>
        </View>
        
        <View style={styles.content}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Vui lòng nhập họ tên.',
              minLength: {
                value: 2,
                message: 'Họ tên phải có ít nhất 2 ký tự.'
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
                    placeholder={"Họ và tên"}
                    placeholderTextColor={theme.colors.secondaryText}
                  />
                  <Text style={[styles.inputIcon, { color: theme.colors.iconColor }]}>
                    👤
                  </Text>
                  {errors.name?.message ? (
                    <Text style={styles.errorText}>{errors.name?.message}</Text>
                  ) : null}
                </View>
              );
            }}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Vui lòng nhập email.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Vui lòng nhập email hợp lệ.'
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
                    placeholder={"Email"}
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

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Vui lòng xác nhận mật khẩu.',
              validate: (value) => {
                if (watch('password') != value) {
                  return "Mật khẩu xác nhận không khớp";
                }
              },
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
                  placeholder={"Xác nhận mật khẩu"}
                  secureTextEntry={!showConfirmPass}
                  placeholderTextColor={theme.colors.secondaryText}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={onShowConfirmPass}>
                  <Text style={[styles.inputIcon, { color: theme.colors.iconColor }]}>
                    {showConfirmPass ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.passwordIcon, { color: theme.colors.iconColor }]}>
                  *
                </Text>
                {errors.confirmPassword?.message ? (
                  <Text style={styles.errorText}>{errors.confirmPassword?.message}</Text>
                ) : null}
              </View>
            )}
          />

          <View style={styles.actionContainer}>
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
              onPress={handleSubmit(onSubmitRegister)}
              disabled={!isValid || loading}
            >
              {loading ? (
                <ActivityIndicator
                  color="#fff"
                  style={{ marginRight: 5 }}
                />
              ) : null}
              <Text style={styles.loginButtonText}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.registerContainer}>
            <Text style={[styles.accountText, { color: theme.colors.text }]}>
              Đã có tài khoản?
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.registerButton}
              onPress={onNavigateToLogin}
            >
              <Text style={[styles.registerText, { color: theme.colors.primary }]}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;