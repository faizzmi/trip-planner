import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList({ userTrips }) {
    const router = useRouter();

    const sortedTrips = [...userTrips].sort((a, b) => {
        const dateA = new Date(JSON.parse(a.tripData).startDate);
        const dateB = new Date(JSON.parse(b.tripData).startDate);
        return dateA - dateB;
    });

    const now = new Date();
    const nearestTripIndex = sortedTrips.findIndex((trip) => {
        const tripDate = new Date(JSON.parse(trip.tripData).startDate);
        return tripDate >= now;
    });

    const upcomingTrip = nearestTripIndex !== -1 ? sortedTrips[nearestTripIndex] : null;
    
    // Past trips are extracted, sorted in descending 
    // const historyTrips = nearestTripIndex !== -1
    //     ? sortedTrips.slice(0, nearestTripIndex).reverse()
    //     : [...sortedTrips].reverse();

    console.log(sortedTrips.slice(1))

    return (
        <View style={{ marginTop: 10 }}>
            {upcomingTrip && (
                <>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20
                    }}>Next Trip</Text>
                    <Image
                        source={require('./../../assets/images/card-trip.jpg')}
                        style={{
                            width: '100%',
                            height: 230,
                            objectFit: 'cover',
                            borderRadius: 15,
                            marginTop: 20
                        }}
                    />
                    <View style={{ marginTop: 10 }}>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20
                        }}>{JSON.parse(upcomingTrip.tripData)?.locationInfo}</Text>
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
                            }}>{moment(JSON.parse(upcomingTrip.tripData)?.startDate).format('DD MMM YYYY')}</Text>
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 17,
                                color: Colors.GRAY
                            }}>⚡ {JSON.parse(upcomingTrip.tripData)?.traveler.title}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push({
                                pathname: '/trip-details',
                                params: { tripData: JSON.stringify(upcomingTrip) }
                            })}
                            style={{
                                marginTop: 10,
                                padding: 15,
                                backgroundColor: Colors.PRIMARAY,
                                borderRadius: 15,
                            }}>
                            <Text
                                style={{
                                    color: Colors.WHITE,
                                    textAlign: 'center',
                                    fontFamily: 'outfit-medium',
                                    fontSize: 15
                                }}
                            >See your plan</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: Colors.GRAY }} />
                <View>
                    <Text style={{ width: 100, textAlign: 'center' }}>Upcoming Trip</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: Colors.GRAY }} />
            </View>

            {sortedTrips.slice(1).map((trip, index) => (
                <TouchableOpacity key={index}
                    onPress={() => router.push({
                        pathname: '/trip-details',
                        params: { tripData: JSON.stringify(trip) }
                    })}>
                    <UserTripCard trip={trip} />
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({});
