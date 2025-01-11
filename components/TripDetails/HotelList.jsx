import { FlatList, Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import { getPlacePhoto } from '../../utils/googlePlaceUtils';

export default function HotelList({ hotelList = [] }) {
  const [photos, setPhotos] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPhoto = async (placeName) => {
    try {
      if (placeName) {
        return await getPlacePhoto(placeName);
      }
    } catch (error) {
      return null; 
    }
  };

  useEffect(() => {
    const loadPhotos = async () => {
      const photoPromises = hotelList.map(async (hotel) => {
        const photoUrl = await fetchPhoto(hotel?.hotelName);
        return { [hotel?.hotelName]: photoUrl };
      });

      const photoResults = await Promise.all(photoPromises);
      const photoMap = Object.assign({}, ...photoResults);
      setPhotos(photoMap);
      setLoading(false);
    };

    if (hotelList.length > 0) {
      loadPhotos();
    } else {
      setLoading(false);
    }
  }, [hotelList]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARAY} />
        <Text style={styles.loadingText}>Loading hotels...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotel Recommendation</Text>

      <FlatList
        data={hotelList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item?.hotelName}-${index}`}
        renderItem={({ item }) => {
          const photo = photos[item?.hotelName];
          return (
            <View style={styles.card}>
              <Image
                source={photo ? { uri: photo } : require('./../../assets/images/defaultPlace.jpg')}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <Text style={styles.hotelName}>{item?.hotelName || 'Unknown Hotel'}</Text>
                <View>
                  <Text style={styles.details}>⭐ {item.rating || 'N/A'}</Text>
                  <Text style={styles.details}>💲 {item.pricePerNight || 'N/A'}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />

      {hotelList.length === 0 && (
        <Text style={styles.noHotelsText}>No hotels available at the moment.</Text>
      )}
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
    marginBottom: 8,
  },
  card: {
    marginRight: 20,
    width: 180,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 8,
  },
  hotelName: {
    fontFamily: 'outfit-medium',
    fontSize: 17,
    marginBottom: 5,
  },
  details: {
    fontFamily: 'outfit',
    fontSize: 14,
  },
  noHotelsText: {
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
    marginTop: 20,
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
