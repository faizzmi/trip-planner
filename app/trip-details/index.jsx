import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';

export default function TripDetails() {

    const navigation = useNavigation();
    const {tripData} = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState([]);

    const formatData = (data) => {
        return JSON.parse(data)
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })

        if (tripData) {
            setTripDetails(formatData(tripData));
            console.log(tripDetails);
            debugger
        }
        
    }, []);


  return tripDetails&&(
    <View>
       <Image source={require('./../../assets/images/card-trip.jpg')}
            style={{
                width: '100%',
                height: 330,
                objectFit: 'cover',
        }}/>
        <View style={{
            marginTop: -30,
            padding: 15,
            height: '100%',
            backgroundColor: Colors.WHITE,
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
        }}>
            <Text></Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})