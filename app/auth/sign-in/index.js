import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
import LoadingModal from '../../../components/LoadingModal';
import NotificationMessage from '../../../components/NotificationMessage';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState({ email: false, password: false });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notiModal, setNotiModal] = useState(false);
  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const onSignIn = () => {
    setLoadModal(true)
    setHasSubmitted(true);

    let isValid = true;

    if (!email) {
      setHasError((prev) => ({ ...prev, email: true }));
      isValid = false;
    } else {
      setHasError((prev) => ({ ...prev, email: false }));
    }

    if (!password) {
      setHasError((prev) => ({ ...prev, password: true }));
      isValid = false;
    } else {
      setHasError((prev) => ({ ...prev, password: false }));
    }

    if (!isValid) {
      setLoadModal(false)
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/mytrip');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
          setErrorMessage('Invalid credentials');
          setNotiModal(true);
        } else {
          setNotiModal(true);
          setErrorMessage('An error occurred. Please try again.');
        }
      setLoadModal(false)
    });
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Let's Sign You In</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>
      <Text style={styles.subtitle}>You've been missed</Text>

      <View style={styles.inputContainer}>
        <Text style={hasError.email ? styles.errorText : styles.label}>Email</Text>
        <TextInput
          style={[styles.input, hasError.email && styles.errorInput]}
          placeholder="Enter Email"
          onChangeText={(value) => setEmail(value)}
        />
        {hasSubmitted && hasError.email && !email && (
          <Text style={styles.errorText}>Email is required</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={hasError.password ? styles.errorText : styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          style={[styles.input, hasError.password && styles.errorInput]}
          placeholder="Enter Password"
          onChangeText={(value) => setPassword(value)}
        />
        {hasSubmitted && hasError.password && !password && (
          <Text style={styles.errorText}>Password is required</Text>
        )}
      </View>

      <TouchableOpacity onPress={onSignIn} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('auth/sign-up')} style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
      
      <LoadingModal visible={loadModal} />
       {errorMessage && (
            <NotificationMessage visible={notiModal} id={1} message={errorMessage} onClose={() => setNotiModal(false)}/>
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    marginTop: 30,
  },
  subtitle: {
    fontFamily: 'outfit',
    marginTop: 10,
    fontSize: 30,
    color: Colors.GRAY,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: 'outfit',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: 'outfit',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
  signInButton: {
    marginTop: 50,
    padding: 15,
    backgroundColor: Colors.PRIMARAY,
    borderRadius: 15,
  },
  signInButtonText: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
  createAccountButton: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    borderWidth: 1,
  },
  createAccountText: {
    color: Colors.PRIMARAY,
    textAlign: 'center',
  },
});
