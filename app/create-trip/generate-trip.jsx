import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import { useNavigation } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function GenerateTrip() {

    const navigation = useNavigation();
    const {tripData, setTripData} = useContext(CreateTripContext);

    useEffect(() => {
    navigation.setOptions({
        headerShown: false,
        headerTransparent: false,
    })
    })

  return (
    <View style={{
        padding: 25,
        // marginTop: 75,
        backgroundColor: Colors.DARK_GRAY,
        height: '100%'
    }}>
        <View style={{marginTop: 75}}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize: 35,
                textAlign: 'center',
                color: Colors.WHITE
            }}>Please Wait...</Text>

            
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize: 20,
                textAlign: 'center',
                marginTop: 40,
                color: Colors.WHITE
            }}>We are working to generate your dream trip</Text>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({})