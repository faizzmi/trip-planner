import { View, Image, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import {getPlacePhoto} from '../../utils/googlePlaceUtils'

export default function PlaceCard({destination}) {
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        const fetchPhoto = async () => {
        if (destination?.placeName) {
            const url = await getPlacePhoto(destination.placeName);
            setPhotoUrl(url);
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
    <View style={{backgroundColor: Colors.WHITE}}>
        <Image source={photoUrl? {uri: photoUrl} : require('./../../assets/images/card-trip.jpg')}
            style={{
                width: '100%',
                height: 250,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
        }}/>
        <View style={styles.container}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>{destination?.placeName}</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: Colors.GRAY,
                textAlign: 'justify'
            }}>
                {truncateText(destination?.desc, 40)}.
            </Text>
            <View>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 17
                }}>🌏 {destination?.continent}</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 170,
        backgroundColor: Colors.WHITE,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        padding: 20,
        gap: 10
    }
})