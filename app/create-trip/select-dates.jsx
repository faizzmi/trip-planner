import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';

export default function SelectDates() {

    const navigation = useNavigation();
    const router = useRouter();
    // buat validation mesti pilih tempat kalau xde xboleh teruskan next step

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Select Dates'
        })
    }, [])
  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 35,
            marginTop: 20
        }}>Travel Dates</Text>

        <TouchableOpacity
            onPress={() => router.push('/create-trip/select-dates')}
            style={{
                marginTop: 20,
                padding:15,
                backgroundColor:Colors.PRIMARAY,
                borderRadius:15,
        }}>
            <Text
                style={{
                    color:Colors.WHITE,
                    textAlign:'center',
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}
            >Countinue</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})