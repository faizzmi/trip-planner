import { Image, StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
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
import { getPlacePhoto } from '../../utils/googlePlaceUtils';
import NotificationMessage from '../../components/NotificationMessage';
import LoadingModal from '../../components/LoadingModal';

export default function TripDetails() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData } = useLocalSearchParams(); 
  const [tripDetails, setTripDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notiModal, setNotiModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (tripData) {
      try {
        const parsedData = JSON.parse(tripData);
        setTripDetails(parsedData);
      } catch (error) {
        console.error('Error parsing tripData:', error);
      }
    }
  }, [tripData]);

  useEffect(() => {
    if (tripDetails?.tripPlan?.tripDetails?.destination) {
      const placeName = tripDetails.tripPlan.tripDetails.destination;
      const fetchPhoto = async () => {
        try {
          const url = await getPlacePhoto(placeName);
          setPhoto(url);
        } catch (error) {
          console.error("Error fetching photo:", error);
          setPhoto(null);
        } finally {
          setLoading(false);
        }
      };
      fetchPhoto();
    }
  }, [tripDetails?.tripPlan?.tripDetails?.destination]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity  onPress={() => router.push('./mytrip')}>
          <Ionicons style={[styles.navigationButton, { marginLeft: 15 }]} name="chevron-back-circle" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons style={[styles.navigationButton, { marginRight: 15 }]} name="delete" size={24} color="red" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, router]);

  const handleDelete = (confirmed) => {
    if (confirmed) {
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
      setSuccessMessage(`Trip to ${tripDetails?.tripPlan?.tripDetails?.destination} successfully deleted`);
      setNotiModal(true);
    } catch (error) {
      setErrorMessage('Error deleting trip');
      setNotiModal(true);
    }
  };

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  const { tripPlan, tripData: rawTripData } = tripDetails;
  const parsedTripData = JSON.parse(rawTripData);

  return (
    <ScrollView>
      <Image
        source={photo ? {uri: photo} : require('../../assets/images/defaultPlace.jpg')}
        style={styles.image}
      />
      <View style={styles.tripDetailsContainer}>
        <Text style={styles.destinationText}>{tripPlan?.tripDetails?.destination}</Text>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {moment(parsedTripData.startDate).format('DD MMM YYYY')}
          </Text>
          <Text style={styles.dateText}>
            {moment(parsedTripData.endDate).format('DD MMM YYYY')}
          </Text>
        </View>

        <Text style={styles.travelerText}>
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
      {(errorMessage || successMessage) && (
        <NotificationMessage
          visible={notiModal}
          id={errorMessage ? 1 : 2}
          message={errorMessage || successMessage}
          onClose={() => setNotiModal(false)}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 330,
  },
  tripDetailsContainer: {
    marginTop: -30,
    padding: 15,
    backgroundColor: Colors.L_WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  destinationText: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  dateText: {
    fontSize: 18,
    fontFamily: 'outfit',
  },
  travelerText: {
    fontSize: 18,
    fontFamily: 'outfit',
    marginTop: 10,
  },
  navigationButton: {
    backgroundColor: 'rgba(255, 255, 255 ,0.5)',
    padding: 10,
    width: '75%',
    borderRadius: 20,
  },
});
