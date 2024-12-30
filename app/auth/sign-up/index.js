import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    navigation.setOptions({
        headerShown:false
    })
  })

  const onCreateAccount = () => {

    if(!email && !password && !fullname){
      console.log('Please enter all input field!');
      // ToastAndroid.show('Please enter all input field!', ToastAndroid.LONG);
      return;
    }

    console.log(auth, email, password);

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("--", errorCode, errorMessage, error);
      // ..
    });
  }

  return (
    <View
      style={{
        padding:25,
        paddingTop:50,
        backgroundColor: Colors.WHITE,
        height:'100%'
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily:'outfit-bold',
          fontSize:30,
          marginTop:30
        }}
      >Create New Account</Text>

      <View style={
        {
            marginTop: 50
        }
      }>
        <Text>Full Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Enter Full Name'
          onChangeText={(value) =>setFullName(value)}
          >
        </TextInput>
      </View>

      <View style={
        {
            marginTop: 20
        }
      }>
        <Text>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Enter Email'
          onChangeText={(value) =>setEmail(value)}
          >
          </TextInput>
      </View>

      <View style={
        {
            marginTop: 20
        }
      }>
        <Text>Password</Text>
        <TextInput 
          secureTextEntry={true} 
          style={styles.input} 
          placeholder='Enter Password'
          onChangeText={(value) =>setPassword(value)}
          >
          </TextInput>
      </View>

      <TouchableOpacity 
        onPress={onCreateAccount} 
        style={
        {
            marginTop: 50,
            padding:15,
            backgroundColor:Colors.PRIMARAY,
            borderRadius:15,
        }
      }>
        <Text
            style={{
                color:Colors.WHITE,
                textAlign:'center',
            }}
        >Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.replace('auth/sign-in')} 
        style={
        {
            marginTop: 20,
            padding:20,
            backgroundColor:Colors.WHITE,
            borderRadius:15,
            borderWidth: 1
        }
      }>
        <Text
            style={{
                color:Colors.PRIMARAY,
                textAlign:'center',
            }}
        >Alradey Have An Account?</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
      padding:15,
      borderWidth:1,
      borderRadius:15,
      borderColor:Colors.GRAY,
      fontFamily: 'outfit'
  }
})