import { View, Image, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { getPlacePhoto } from '../../utils/googlePlaceUtils';

export default function PlaceCard({ destination }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (destination?.placeName) {
          const url = await getPlacePhoto(destination.placeName);
          setPhotoUrl(url);
        }
      } catch (error) {
        setPhotoUrl(null);
      }
    };
    fetchPhoto();
  }, [destination?.placeName]);

  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityLabel={`Card for ${destination?.placeName}`}
    >
      <Image
        source={
          photoUrl
            ? { uri: photoUrl }
            : require('./../../assets/images/defaultPlace.jpg')
        }
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{destination?.placeName}</Text>
        <Text style={styles.description}>
          {truncateText(destination?.desc, 40)}
        </Text>
        <View>
          <Text style={styles.continent}>🌏 {destination?.continent}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    height: 500,
    elevation: 5,
    borderRadius: 15,
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 1,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  container: {
    height: 170,
    backgroundColor: Colors.WHITE,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 20,
    gap: 10,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 17,
    color: Colors.GRAY,
    textAlign: 'justify',
    flexShrink: 1,
  },
  continent: {
    fontFamily: 'outfit',
    fontSize: 17,
  },
});
