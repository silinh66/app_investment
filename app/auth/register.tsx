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
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  otp: string;
}

type RegisterStep = 'options' | 'email' | 'password' | 'name' | 'otp';

const RegisterScreen: React.FC = () => {
  const { theme } = useTheme();
  const { register, loading, isAuthenticated } = useAuth();
  const [step, setStep] = useState<RegisterStep>('options');
  const [showPass, setShowPass] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegisterForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      otp: "",
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const onShowPass = () => {
    setShowPass(!showPass);
  };

  const onSubmitRegister = async (data: RegisterForm) => {
    try {
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      // Mock OTP verification success, proceed to register
      await register(fullName, data.email, data.password, ""); // Phone is optional/empty for now
      // AuthContext handles setting user and isAuthenticated, which triggers the useEffect redirect
    } catch (error: any) {
      console.log('Register error:', error);
      let errorMessage = 'Registration failed. Please try again.';
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

  const handlePasswordContinue = async () => {
    const isPasswordValid = await trigger('password');
    if (isPasswordValid) {
      setStep('name');
    }
  };

  const handleNameContinue = async () => {
    const isFirstNameValid = await trigger('firstName');
    const isLastNameValid = await trigger('lastName');
    if (isFirstNameValid && isLastNameValid) {
      setStep('otp');
    }
  };

  const goBack = () => {
    if (step === 'otp') {
      setStep('name');
    } else if (step === 'name') {
      setStep('password');
    } else if (step === 'password') {
      setStep('email');
    } else if (step === 'email') {
      setStep('options');
    } else {
      router.back();
    }
  };

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
        <Text style={styles.title}>Đăng ký miễn phí</Text>
        <Text style={styles.description}>Các tín hiệu đầu tư tuyệt vời đang chờ đón bạn.</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={[styles.socialButton, styles.appleButton,]}>
          <Ionicons name="logo-apple" size={24} color="#000000" />
          <Text style={[styles.socialButtonText, styles.appleButtonText]}>Đăng ký với Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, { backgroundColor: theme.colors.card }]}>
          <Ionicons name="logo-google" size={24} color="#FFFFFF" />
          <Text style={styles.socialButtonText}>Đăng ký với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: theme.colors.card }]} onPress={() => setStep('email')}>
          <Ionicons name="mail-outline" size={24} color="#FFFFFF" />
          <Text style={styles.socialButtonText}>Đăng ký với Email hoặc SĐT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: theme.colors.card }]}>
          <Ionicons name="logo-facebook" size={24} color="#fff" />
          <Text style={styles.socialButtonText}>Đăng ký với Facebook</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text style={{ color: '#8E8E93' }}>
            Bạn đã có tài khoản? <Text style={{ color: '#3B82F6' }} onPress={() => router.push('/auth/login')}>Đăng Nhập</Text>

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
        <Text style={styles.title}>Đăng ký</Text>
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
            required: 'Vui lòng nhập email.',
            pattern: {
              value: /^([^\s@]+@[^\s@]+\.[^\s@]+|[0-9]{10,11})$/,
              message: 'Vui lòng nhập email hợp lệ.'
            }
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
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
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <Text style={styles.description}>Tạo tài khoản để được truy cập thêm nhiều tính năng khác.</Text>
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
          onPress={handlePasswordContinue}
        >
          <Text style={styles.primaryButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderNameStep = () => (
    <>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <Text style={styles.description}>Tạo tài khoản để được truy cập thêm nhiều tính năng khác.</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.inputLabel}>Điền tên</Text>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: 'Vui lòng nhập tên.' }}
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                placeholder="Vui lòng nhập tên của bạn"
                placeholderTextColor="#666666"
              />
              {errors.firstName?.message && (
                <Text style={styles.errorText}>{errors.firstName?.message}</Text>
              )}
            </View>
          )}
        />

        <Text style={styles.inputLabel}>Điền username</Text>
        <Controller
          control={control}
          name="lastName"
          rules={{ required: 'Vui lòng nhập username.' }}
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                placeholder="Vui lòng nhập username của bạn"
                placeholderTextColor="#666666"
              />
              {errors.lastName?.message && (
                <Text style={styles.errorText}>{errors.lastName?.message}</Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.colors.blue }]}
          onPress={handleNameContinue}
        >
          <Text style={styles.primaryButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderOtpStep = () => (
    <>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Xác Minh Email hoặc Số điện thoại</Text>
        <Text style={styles.description}>
          Vui lòng nhập mã xác minh 6 chữ số đã được gửi đến {getValues('email')}.
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.inputLabel}>Nhập mã</Text>
        <Controller
          control={control}
          name="otp"
          rules={{
            required: 'Vui lòng nhập mã xác thực.',
            minLength: { value: 6, message: 'Mã xác minh gồm 6 chữ số.' }
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={[styles.input, { letterSpacing: 8, textAlign: 'center' }]}
                placeholder="------"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                maxLength={6}
              />
              {errors.otp?.message && (
                <Text style={styles.errorText}>{errors.otp?.message}</Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.colors.blue }]}
          onPress={handleSubmit(onSubmitRegister)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Xác minh mã</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ color: '#3B82F6' }}>Tôi không nhận được mã xác minh</Text>
        </TouchableOpacity>
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
        {step === 'name' && renderNameStep()}
        {step === 'otp' && renderOtpStep()}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;