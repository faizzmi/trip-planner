import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-web';

export default function StartNewTripCard() {
  return (
    <View style={{
        padding: 20,
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 25
    }}>
        <Ionicons name="location-sharp" size={30} color="black" />
        <Text style={{
            fontSize: 25,
            fontFamily: 'outfit-medium',
        }}>
            No trips planned yet
        </Text>

        <Text style={{
            fontSize: 20,
            fontFamily: 'outfit',
            color: Colors.GRAY,
            textAlign: 'center'
        }}>
           Looks like its time to plan a new travel experience! Get Started below!
        </Text>

        <TouchableOpacity style={{
            padding: 10,
            backgroundColor: Colors.PRIMARAY,
            borderRadius: 15,
            paddingHorizontal: 30
        }}>
            <Text style={{
                color: Colors.WHITE,
                fontFamily: 'outfit-medium',
                fontSize: 17
            }}>Start a New Trip</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})