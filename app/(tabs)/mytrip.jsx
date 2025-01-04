import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { useRouter } from 'expo-router';

export default function MyTrip() {

    const [userTrips, setUserTrips] = useState([]);
    const router = useRouter();

  return (
    <View style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between'
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 35
            }}>My Trips</Text>
            <TouchableOpacity
                onPress = {() => router.push('/create-trip/search-place')}
            >
                <Ionicons name="add-circle" size={50} color="black" />
            </TouchableOpacity>
        </View>

        {userTrips?.length==0?
            <StartNewTripCard/> :
            null
        }
    </View>
  )
}

const styles = StyleSheet.create({})