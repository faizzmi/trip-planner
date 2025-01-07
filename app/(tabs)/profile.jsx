import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { auth, db } from './../../configs/FirebaseConfig';

export default function Profile() {
  const user = auth.currentUser;

  console.log(user);
  
  return (
    <View>
      <Text>profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({})