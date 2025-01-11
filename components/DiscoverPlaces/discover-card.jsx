import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { getPlacePhoto } from '../../utils/googlePlaceUtils';

export default function DiscoverCard({ place }) {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (place?.placeName) {
          const url = await getPlacePhoto(place.placeName);
          setPhoto(url);
        }
      } catch (error) {
        setPhoto(null); 
    }
    };

    fetchPhoto();
  }, [place]);

  return (
    <View style={styles.card} accessible={true} accessibilityLabel={`Discover card for ${place?.placeName}`}>
      <Image
        source={
          photo
            ? { uri: photo }
            : require('./../../assets/images/defaultPlace.jpg')
        }
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{place?.placeName}</Text>
        <Text style={styles.location}>{place?.location}</Text>
        {place?.desc && (
          <Text style={styles.description}>
            {place?.desc}
          </Text>
        )}
        <View style={styles.extraInfo}>
          {place?.ticket && (
            <Text style={styles.infoText}>
              🎟️ <Text style={styles.infoSubText}>{place?.ticket}</Text>
            </Text>
          )}
          {place?.openingDate && (
            <Text style={styles.infoText}>
              🎁 <Text style={styles.infoSubText}>{place?.openingDate}</Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  location: {
    fontFamily: 'outfit',
    fontSize: 17,
    textAlign: 'justify',
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 17,
    color: Colors.GRAY,
    textAlign: 'justify',
    marginTop: 10,
  },
  extraInfo: {
    marginTop: 20,
  },
  infoText: {
    fontFamily: 'outfit',
    fontSize: 17,
    marginBottom: 5,
  },
  infoSubText: {
    fontFamily: 'outfit',
  },
});
