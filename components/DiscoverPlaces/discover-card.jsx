import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { getPlacePhoto } from '../../utils/googlePlaceUtils';

export default function DiscoverCard({place}) {
    const [photo, setPhoto] = useState(); 
        
        useEffect(() => {
            const placeName = place?.placeName;
            const fetchPhoto = async () => {
                if (placeName) {
                    const url = await getPlacePhoto(placeName);
                    setPhoto(url); 
                }
            };
            if (place) {
                fetchPhoto();
            }
        }, [place]);
    
  return (
    <View style={{ elevation: 5, borderRadius: 15, marginTop: 20, backgroundColor: Colors.WHITE}}>
        <Image source={{uri: photo}}
            style={{
                width: '100%',
                height: 180,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
        }}/>
        <View style={{padding: 20}}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>{place?.placeName}</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                textAlign: 'justify'
            }}>{place?.location}</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: Colors.GRAY,
                textAlign: 'justify'
            }}>
                {place?.desc}. <Text style={{fontFamily: 'outfit' }}>{place?.desc}</Text>
            </Text>
            <View style={{marginTop: 20}}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 17
                }}>🎟️ <Text style={{ fontFamily: 'outfit' }}>{place?.ticket}</Text></Text>
                
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 17
                }}>🎁 <Text style={{ fontFamily: 'outfit' }}>{place?.openingDate}</Text></Text>
                
                {/* <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 17
                }}>🕸️ <Text style={{ fontFamily: 'outfit', color: Colors.GRAY }}>{place?.website}</Text></Text> */}
                
            </View>
        </View>
    </View>
    
  )
}

const styles = StyleSheet.create({})