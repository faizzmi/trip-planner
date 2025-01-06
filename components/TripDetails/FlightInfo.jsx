import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function FlightInfo({ flightData }) {
  if (!flightData) {
    return <Text>No flight information available</Text>;
  }

  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 15,
        padding: 10,
        borderColor: Colors.GRAY,
        borderWidth: 1
      }}
    >
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Text
                style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
                }}
            >
                Flights
            </Text>
      
            <TouchableOpacity
                style={{
                marginTop: 7,
                padding: 5,
                width: 100,
                backgroundColor: Colors.PRIMARAY,
                borderRadius: 7,
                }}
            >
                <Text
                style={{
                    color: Colors.WHITE,
                    textAlign: 'center',
                    fontFamily: 'outfit-medium',
                    fontSize: 15,
                }}
                >
                Book Here
                </Text>
            </TouchableOpacity>
        </View>
        <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>Airline: {flightData?.airline}</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>Price: {flightData?.estimatedFlightPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
