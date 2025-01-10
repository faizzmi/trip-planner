import { View, Image, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function PlaceCard({destination}) {
  return (
    <View>
        <Image source={require('./../../assets/images/card-trip.jpg')}
            style={{
                width: '100%',
                height: 300,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
        }}/>
        <View style={styles.container}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>{destination?.placeName}</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: Colors.GRAY,
                textAlign: 'justify'
            }}>
                {destination?.desc}.
            </Text>
            <View>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 17
                }}>🌏 {destination?.continent}</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 170,
        backgroundColor: Colors.LIGHT_GRAY,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        padding: 20,
        gap: 10
    }
})