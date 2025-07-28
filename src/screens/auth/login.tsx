import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import showMessage from '../../utils/helper/showMessage';
import {navigate} from '../../navigators/RootNavigation';
import {useAppDispatch, useAppSelector} from '../../redux/store/Store';
import {signInRequest} from '../../redux/reducer/AuthReducer';
import Loader from '../../utils/helper/Loader';
import { useIsFocused } from '@react-navigation/native';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused()
  const {loading, error} = useAppSelector(state => state.auth);
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  const validate = () => {
    if (!username.trim()) {
      showMessage('Username is required');
      return false;
    }

    if (!password.trim()) {
      showMessage('Password is required');
      return false;
    }

    return true;
  };

  async function handleLogin() {
    if (validate()) {
      try {
        dispatch(
          signInRequest({
            username: username.toLowerCase(),
            password: password,
            expiresInMins: 1,
          }),
        );
        // showMessage(result?.message);
      } catch (error) {
        console.log('Error in handleSignIn:', error);
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Loader visible={loading && isFocused} />
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigate('SignUp')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#4682b4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  signupText: {
    fontSize: 14,
    color: '#333',
  },
  signupLink: {
    fontSize: 14,
    color: '#4682b4',
    fontWeight: 'bold',
  },
});
