import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import moment from 'moment';
import { Colors } from '../../constants/Colors';

export default function UserTripCard({trip}) {

    const formatData = (data) => {
        return JSON.parse(data);
    }

  return (
    <View style={{ 
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
         }}>
        <Image
            source={require('./../../assets/images/card-trip.jpg')}
            style={{ 
                width: 100,
                height: 100,
                borderRadius: 15
        }} />

        <View>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 18
            }}>{trip.tripPlan?.tripDetails?.destination}</Text>
            <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY,
                fontSize: 14
            }}>{moment(formatData(trip.tripData).startDate).format('DD MMM YYYY')}</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 14,
                color: Colors.GRAY
            }}>Travelling: {formatData(trip.tripData).traveler.title}</Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({})