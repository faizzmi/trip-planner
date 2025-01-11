import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getPlacePhoto } from '../../utils/googlePlaceUtils'; // Assuming this function fetches the photo URL

export default function TripPlan({ details }) {
  const [photos, setPhotos] = useState({}); 

  useEffect(() => {
    const fetchPhotos = async () => {
      const newPhotos = {};

      for (const dayDetails of Object.values(details)) {
        for (const place of dayDetails.activities) {
          const placeName = place?.placeName;
          if (placeName && !newPhotos[placeName]) {
            const url = await getPlacePhoto(placeName);
            newPhotos[placeName] = url; 
           }
        }
      }

      setPhotos(newPhotos);
    };

    if (details) {
      fetchPhotos();
    }
  }, [details]);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>🛎️ Plan Details</Text>

      {Object.entries(details).map(([day, dayDetails]) => (
        <View key={day}>
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, marginTop: 20 }}>Day {Number(day) + 1}</Text>

          {dayDetails.activities.map((place, index) => {
            const placeName = place?.placeName;
            const photo = photos[placeName];

            return (
              <View key={`${place.latitude}_${place.longitude}_${index}`} style={{ backgroundColor: Colors.LIGHT_GRAY, borderRadius: 15, borderColor: Colors.DARK_GRAY, borderWidth: 1, marginTop: 20 }}>
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: '100%',
                    height: 120,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                />
                <View style={{ padding: 10 }}>
                  <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>{place?.placeName}</Text>
                  <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.GRAY, textAlign: 'justify' }}>{place?.placeDetails}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
                  <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 17 }}>🎟️ <Text style={{ fontFamily: 'outfit' }}>{place?.ticketPricing}</Text></Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 17 }}>⌛ <Text style={{ fontFamily: 'outfit-bold' }}>{place?.timeTravel}</Text></Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      // onPress={() => navigateToDetails(place)}
                      style={{ padding: 8, backgroundColor: Colors.PRIMARAY, borderRadius: 7 }}
                    >
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

const styles = StyleSheet.create({});
