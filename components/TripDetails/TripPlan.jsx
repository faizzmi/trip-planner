import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getPlacePhoto } from '../../utils/googlePlaceUtils';

export default function TripPlan({ details }) {
  const [photos, setPhotos] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    const newPhotos = {};

    const placeNames = new Set();
    Object.values(details).forEach(dayDetails => {
      dayDetails.activities.forEach(place => {
        const placeName = place?.placeName;
        if (placeName && !newPhotos[placeName]) {
          placeNames.add(placeName);
        }
      });
    });
    
    const photoPromises = [...placeNames].map(async (placeName) => {
      const url = await getPlacePhoto(placeName);
      newPhotos[placeName] = url;
    });

    await Promise.all(photoPromises);
    setPhotos(newPhotos);
    setLoading(false);
  };

  const handleOpenMap = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open map:', err);
    });
  };

  useEffect(() => {
    if (details) {
      fetchPhotos();
    }
  }, [details]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARAY} />
        <Text style={styles.loadingText}>Loading trip details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛎️ Plan Details</Text>

      {Object.entries(details).map(([day, dayDetails]) => (
        <View key={day}>
          <Text style={styles.dayTitle}>Day {Number(day) + 1}</Text>

          {dayDetails.activities.map((place, index) => {
            const placeName = place?.placeName;
            const photo = photos[placeName];

            return (
              <View
                key={`${place.latitude}_${place.longitude}_${index}`}
                style={styles.activityCard}
              >
                <Image
                  source={photo ? { uri: photo } : require('./../../assets/images/defaultPlace.jpg')}
                  style={styles.activityImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.placeName}>{place?.placeName || 'Unknown Place'}</Text>
                  <Text style={styles.placeDetails}>{place?.placeDetails || 'No details available'}</Text>
                </View>
                <View style={styles.activityFooter}>
                  <View>
                    <Text style={styles.footerText}>🎟️ {place?.ticketPricing || 'N/A'}</Text>
                    <Text style={styles.footerText}>⌛ 
                      <Text style={styles.boldText}>
                        {place?.timeTravel?.length > 35 ? `${place?.timeTravel.slice(0, 20)}...` : place?.timeTravel || 'N/A'}
                      </Text></Text>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.navigationButton} onPress={() => handleOpenMap(place.geoCoordinates.latitude, place.geoCoordinates.longitude)}>
                      <Ionicons name="navigate" size={20} color={Colors.WHITE} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  dayTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    marginTop: 20,
  },
  activityCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    borderColor: Colors.DARK_GRAY,
    borderWidth: 1,
    marginTop: 20,
  },
  activityImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 10,
  },
  placeName: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  placeDetails: {
    fontFamily: 'outfit',
    fontSize: 17,
    color: Colors.GRAY,
    textAlign: 'justify',
  },
  activityFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  footerText: {
    fontFamily: 'outfit',
    fontSize: 17,
  },
  boldText: {
    fontFamily: 'outfit-bold',
  },
  navigationButton: {
    padding: 8,
    backgroundColor: Colors.PRIMARAY,
    borderRadius: 7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
  },
});
