import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    lineHeight: 38,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  content: {
    marginHorizontal: 16,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    paddingLeft: 40,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
  },
  inputIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    fontSize: 18,
  },
  eyeIcon: {
    position: 'absolute',
    bottom: 50,
    right: 55,
  },
  passwordIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  actionContainer: {
    marginTop: 20,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  accountText: {
    fontSize: 14,
    marginRight: 5,
  },
  registerButton: {
    marginLeft: 5,
  },
  registerText: {
    fontSize: 14,
    fontWeight: '600',
  },
});