import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function DiscoverCard({place}) {
  return (
    <View style={{ borderWidth: 1, borderRadius: 15, marginTop: 20}}>
        <Image source={require('./../../assets/images/card-trip.jpg')}
            style={{
                width: '100%',
                height: 180,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
        }}/>
        <View style={{padding: 10}}>
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
            <View>
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