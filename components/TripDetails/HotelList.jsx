import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import { getPlacePhoto } from '../../utils/googlePlaceUtils'

export default function HotelList({ hotelList }) {
  const [photos, setPhotos] = useState({}); 
  
  const fetchPhoto = async (placeName) => {
    if (placeName) {
      const url = await getPlacePhoto(placeName);
      return url;
    }
  };

  useEffect(() => {
    
    const loadPhotos = async () => {
      const newPhotos = {};
      for (const hotel of hotelList) {
        const photoUrl = await fetchPhoto(hotel?.hotelName);
        newPhotos[hotel?.hotelName] = photoUrl;
      }
      setPhotos(newPhotos);
    };

    if (hotelList && hotelList.length > 0) {
      loadPhotos();
    }
  }, [hotelList]);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>Hotel Recommendation</Text>

      <FlatList
        data={hotelList}
        style={{ marginTop: 8 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const photo = photos[item?.hotelName];

          return (
            <View style={{ marginRight: 20, width: 180, borderWidth: 1, borderRadius: 15 }}>
              <Image
                source={{ uri: photo }}
                style={{
                  width: 180,
                  height: 120,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
              />
              <View style={{ padding: 8 }}>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 17 }}>
                  {item?.hotelName}
                </Text>

                <View>
                  <Text style={{ fontFamily: 'outfit' }}>⭐ {item.rating}</Text>
                  <Text style={{ fontFamily: 'outfit' }}>💲 {item.pricePerNight}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
