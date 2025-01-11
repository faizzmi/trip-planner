import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {
  const router = useRouter();

  return (
    <View style={styles.container} accessible={true} accessibilityLabel="Start a new trip card">
      <Ionicons name="location-sharp" size={30} color="black" style={styles.icon} />
      <Text style={styles.title}>No trips planned yet</Text>
      <Text style={styles.subtitle}>
        Looks like it's time to plan a new travel experience! Get started below!
      </Text>
      <TouchableOpacity
        onPress={() => router.push('/create-trip/search-place')}
        style={styles.button}
        accessible={true}
        accessibilityLabel="Start a new trip button"
      >
        <Text style={styles.buttonText}>Start a New Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    gap: 25,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: 'outfit-medium',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'outfit',
    color: Colors.GRAY,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: Colors.PRIMARAY,
    borderRadius: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 17,
  },
});
