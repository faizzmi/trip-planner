import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function HotelList({hotelList}) {

  return (
    <View style={{marginTop: 20}}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }}>Hotel Recommendation</Text>

      <FlatList
        data={hotelList}
        style={{ marginTop: 8 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) =>
            (
            <View style={{ marginRight: 20, width: 180, borderWidth: 1, borderRadius: 15}}>
                <Image source={require('./../../assets/images/card-trip.jpg')}
                    style={{
                        width: 180,
                        height: 120,
                        // borderRadius: 15
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                }}/>
                <View style={{ padding: 8}}>
                    <Text style={{ fontFamily: 'outfit-medium', fontSize: 17}}>{item?.hotelName}</Text>

                    <View>
                        <Text style={{fontFamily: 'outfit'}}>⭐ {item.rating}</Text>
                        <Text style={{fontFamily: 'outfit'}}>💲 {item.pricePerNight}</Text>
                    </View>
                </View>
            </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})