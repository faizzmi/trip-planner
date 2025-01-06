import { Image, StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import TripPlan from '../../components/TripDetails/TripPlan';

export default function TripDetails() {
  const navigation = useNavigation();
  const { tripData } = useLocalSearchParams(); 
  const [tripDetails, setTripDetails] = useState();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push('./mytrip')}>
          <Text style={{ fontSize: 24, marginLeft: 15 }}>📌</Text>
        </TouchableOpacity>
      ),
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

  if (!tripDetails) {
    return <ActivityIndicator size="large" color={Colors.PRIMARAY} />;
  }

  const { tripPlan, tripData: rawTripData } = tripDetails;
  const parsedTripData = JSON.parse(rawTripData);

  return (
    <ScrollView>
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

        <HotelList hotelList={tripPlan?.hotelOptions}/>

        <TripPlan details={tripPlan?.dailyItinerary}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

