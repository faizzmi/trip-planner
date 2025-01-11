import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.screenContainer}>
      <Image
        source={require('./../assets/images/landing-wallpaper.jpg')}
        style={styles.image}
        accessibilityLabel="Landing Image"
      />
      <View style={styles.container}>
        <Text style={styles.heading}>Travel Planner</Text>
        <Text style={styles.description}>
          Join thousands of happy travelers who have made their journeys unforgettable. Sign up now and let’s make your next trip your best trip yet.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('auth/sign-in')}
          accessible={true}
          accessibilityLabel="Get Started Button"
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 520,
    resizeMode: 'cover',
  },
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 25,
    height: '100%',
  },
  heading: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 17,
    textAlign: 'center',
    color: Colors.GRAY,
    marginTop: '20%',
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARAY,
    borderRadius: 99,
    marginTop: '25%',
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 17,
  },
});
