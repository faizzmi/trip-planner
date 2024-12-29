import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

export default function Login() {

    const router = useRouter();

  return (
    <View>
      <Image source={require('./../assets/images/react-logo.png')}
        style={{
            width: '100%',
            height:520
        }}
      />
      <View style={styles.container}>
        <Text
            style={{
                fontSize:30,
                fontFamily:'outfit-bold',
                textAlign:'center',
                marginTop:20
            }}
        >Travel Planner</Text>

        <Text
            style={{
                fontFamily:'outfit',
                fontSize:17,
                textAlign:'center',
                color:Colors.GRAY,
                marginTop:'20%'
            }}
        >
            Join thousands of happy travelers who have made their journeys unforgettable. Sign up now and let’s make your next trip your best trip yet.
        </Text>
        
        <TouchableOpacity style={styles.button}
            onPress={() => router.push('auth/sign-in')}
        >
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit',
                fontSize:17
            }}
            >Get Started</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        marginTop:-20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 15,
        height:'100%',
        padding:25
    },
    button: {
        padding:15,
        backgroundColor:Colors.PRIMARAY,
        borderRadius:99,
        marginTop:'25%'

    }
})