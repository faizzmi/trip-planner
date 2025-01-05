import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList(userTrips) {

    const latestTrip = JSON.parse(userTrips.userTrips[0].tripData);

    const router = useRouter();

  return userTrips&&(
    <View style={{ marginTop: 10 }}> 
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20
        }}>Upcoming Trip</Text>
        <Image source={require('./../../assets/images/card-trip.jpg')}
        style={{
            width: '100%',
            height: 230,
            objectFit: 'cover',
            borderRadius: 15,
            marginTop: 20
        }}/>

        <View style={{ marginTop: 10 }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 20
            }}>{latestTrip?.locationInfo}</Text>
            <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5
                }}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 17,
                    color: Colors.GRAY
                }}>{moment(latestTrip?.startDate).format('DD MMM YYYY')}</Text>
                
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 17,
                    color: Colors.GRAY
                }}>⚡ {latestTrip?.traveler.title}</Text>
            </View>
            <TouchableOpacity
                onPress={() => router.push({pathname:'/trip-details', params:{tripData: JSON.stringify(userTrips.userTrips[0])}})}
                style={{
                    marginTop: 10,
                    padding:15,
                    backgroundColor:Colors.PRIMARAY,
                    borderRadius:15,
            }}>
                <Text
                    style={{
                        color:Colors.WHITE,
                        textAlign:'center',
                        fontFamily: 'outfit-medium',
                        fontSize: 15
                    }}
                    >See your plan</Text>
            </TouchableOpacity>
        </View>
        
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <View style={{flex: 1, height: 1, backgroundColor: Colors.GRAY}} />
                <View>
                    <Text style={{width: 100, textAlign: 'center'}}>Latest Trip</Text>
                </View>
            <View style={{flex: 1, height: 1, backgroundColor: Colors.GRAY}} />
        </View>

        {userTrips.userTrips.map((trip, index) => {
        return(
            <TouchableOpacity>
                <UserTripCard trip={trip} key={index} />
            </TouchableOpacity>
        )}
        )}
    </View>
  )
}

const styles = StyleSheet.create({})