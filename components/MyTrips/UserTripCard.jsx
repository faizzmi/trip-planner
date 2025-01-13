import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import { getPlacePhoto } from '../../utils/googlePlaceUtils';

export default function UserTripCard({ trip }) {
  const [photo, setPhoto] = useState(null);

  const placeName = trip?.tripPlan?.tripDetails?.destination;

  useEffect(() => {
    const fetchPhoto = async () => {
      if (placeName) {
        try {
          const url = await getPlacePhoto(placeName);
          setPhoto(url);
        } catch (error) {
          console.error('Error fetching photo:', error);
        }
      }
    };
    fetchPhoto();
  }, [placeName]);

  const tripData = useMemo(() => {
    try {
      return JSON.parse(trip?.tripData || '{}');
    } catch {
      return {};
    }
  }, [trip]);

  return (
    <View style={styles.card}>
      <Image
        source={photo ? { uri: photo } : require('./../../assets/images/defaultPlace.jpg')}
        style={styles.image}
        accessible={true}
        accessibilityLabel={`Photo of ${placeName || 'the trip destination'}`}
      />
      <View>
        <Text style={styles.destination}>{placeName || 'Unknown Destination'}</Text>
        <Text style={styles.date}>
          📅 {tripData.startDate ? moment(tripData.startDate).format('DD MMM YYYY') : 'No Start Date'}
        </Text>
        <Text style={styles.details}>
          ⚡ {tripData.traveler?.title || 'Unknown Traveler'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  destination: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
  },
  date: {
    fontFamily: 'outfit',
    color: Colors.GRAY,
    fontSize: 14,
  },
  details: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.GRAY,
  },
});
