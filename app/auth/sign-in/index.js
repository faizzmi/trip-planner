import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown:false
        })
    })

  return (
    <View
    style={{
        padding:25,
        paddingTop: 50,
        backgroundColor: Colors.WHITE,
        height:'100%'
    }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop: 30
      }}>Let's Sign You In
      </Text>
      <Text style={{
        fontFamily:'outfit',
        marginTop:20,
        fontSize:30,
        color:Colors.GRAY
      }}>Welcome Back
      </Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:30,
        marginTop:10,
        color:Colors.GRAY
      }}>You've been missed
      </Text>

      <View style={
        {
            marginTop: 50
        }
      }>
        <Text>Email</Text>
        <TextInput style={styles.input} placeholder='Enter Email'></TextInput>
      </View>

      <View style={
        {
            marginTop: 20
        }
      }>
        <Text>Password</Text>
        <TextInput secureTextEntry={true} style={styles.input} placeholder='Enter Password'></TextInput>
      </View>

      
      <TouchableOpacity
        onPress={() => router.replace('auth/sign-up')} 
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
        >Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
            onPress={() => router.replace('auth/sign-up')} 
            style={
            {
                marginTop: 20,
                padding:20,
                backgroundColor:Colors.WHITE,
                borderRadius:15,
                borderWidth:1
            }
      }>
        <Text
            onPress={() => router.replace('auth/sign-up')} 
            style={{
                color:Colors.PRIMARAY,
                textAlign:'center',
            }}
        >Create Account</Text>
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