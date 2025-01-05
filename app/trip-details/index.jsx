import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';

export default function TripDetails() {
  const navigation = useNavigation();
  const { tripData } = useLocalSearchParams(); // Access route params
  const [tripDetails, setTripDetails] = useState(); // Initialize as null

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    if (tripData) {
      try {
        const parsedData = JSON.parse(tripData);
        setTripDetails(parsedData);
      } catch (error) {
        console.error('Error parsing tripData:', error);
      }
    }
  }, [tripData, navigation]);

//   if (!tripDetails) {
//     return <Text>Loading...</Text>;
//   }

  const { tripPlan, tripData: rawTripData } = tripDetails;
  const parsedTripData = JSON.parse(rawTripData);

  return (
    <View>
      <Image
        source={require('./../../assets/images/card-trip.jpg')}
        style={{
          width: '100%',
          height: 330,
        }}
      />
      <View
        style={{
          marginTop: -30,
          padding: 15,
          height: '100%',
          backgroundColor: Colors.WHITE,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'outfit-bold',
          }}
        >
          {tripPlan?.tripDetails?.destination}
        </Text>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 5 }}>
          <Text style={{ fontSize: 18, fontFamily: 'outfit' }}>
            {moment(parsedTripData.startDate).format('DD MMM YYYY')}
          </Text>
          <Text style={{ fontSize: 18, fontFamily: 'outfit' }}>
            {moment(parsedTripData.endDate).format('DD MMM YYYY')}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 18,
            fontFamily: 'outfit',
            marginTop: 10,
          }}
        >
          ⚡ {parsedTripData.traveler?.title}
        </Text>

        <FlightInfo flightData={tripPlan?.flightDetails} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
