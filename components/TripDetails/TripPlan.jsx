import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TripPlan({details}) {
  return (
    <View style={{ marginTop: 20}}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }}>🛎️ Plan Details</Text>

      {Object.entries(details).map(([day, details]) => (
        <View>
            <Text style={{ fontFamily: "outfit-medium", fontSize: 20, marginTop: 20}}>Day {Number(day) + 1}</Text>
            {details.activities.map((place, index) => (
                <View style={{backgroundColor: Colors.LIGHT_GRAY, borderRadius: 15, borderColor: Colors.DARK_GRAY, borderWidth: 1, marginTop: 20}}>
                     <Image source={require('./../../assets/images/card-trip.jpg')}
                        style={{
                            width: '100%',
                            height: 120,
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
                            color: Colors.GRAY,
                            textAlign: 'justify'
                        }}>{place?.placeDetails}</Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 8
                    }}>
                        <View>
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 17
                            }}>🎟️ <Text style={{ fontFamily: 'outfit' }}>{place?.ticketPricing}</Text></Text>

                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 17
                            }}>⌛ <Text style={{ fontFamily: 'outfit-bold' }}>{place?.timeTravel}</Text></Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                // onPress={() => router.push({
                                //     pathname: '/trip-details',
                                //     params: { tripData: JSON.stringify(upcomingTrip) }
                                // })}
                                style={{
                                    padding: 8,
                                    backgroundColor: Colors.PRIMARAY,
                                    borderRadius: 7,
                                }}>
                                <Ionicons name="navigate" size={20} color={Colors.WHITE} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}
        </View>
      ))}


    </View>
  )
}

const styles = StyleSheet.create({})