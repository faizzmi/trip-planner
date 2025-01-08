import { Image, StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Modal, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import TripPlan from '../../components/TripDetails/TripPlan';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ModalMessage from '../../components/ModalMessage';

export default function TripDetails() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData } = useLocalSearchParams(); 
  const [tripDetails, setTripDetails] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push('./mytrip')}>
          <Ionicons style={{ marginLeft: 15 }} name="chevron-back-circle" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons style={{ marginRight: 15 }} name="delete" size={24} color="red" />
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

  const handleDelete = (confirmed) => {
    if (confirmed) {
      console.log("Trip deleted"); 
      deleteTrip();
      router.replace('/mytrip');
    }
    setModalVisible(false);
  };

  
 const deleteTrip = async () => {
  try {
    if (!tripDetails?.docId) {
      throw new Error('Trip ID not found.');
    }

    const tripDocRef = doc(db, 'UserTrips', tripDetails.docId); 
    await deleteDoc(tripDocRef);
    console.log('Trip successfully deleted');
  } catch (error) {
    console.error('Error deleting trip:', error);
  } finally {
    setLoading(false); 
  }
};


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

        <HotelList hotelList={tripPlan?.hotelOptions} />

        <TripPlan details={tripPlan?.dailyItinerary} />
      </View>

      <ModalMessage
          visible={modalVisible}
          message="Are you sure you want to delete this trip?"
          onClose={() => setModalVisible(false)}
          onConfirm={handleDelete}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  modalText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.BLACK,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});
