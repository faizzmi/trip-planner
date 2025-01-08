import { StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserTripCard from '../../components/MyTrips/UserTripCard';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';
import { now } from 'moment';

export default function History() {
    const router = useRouter();

    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = auth.currentUser;
    
    const isHistoryTrip = (trip) => {
        const startDate = new Date(JSON.parse(trip.tripData).startDate);
        const endDate = new Date(JSON.parse(trip.tripData).endDate);
        return endDate < now;  // Only include trips where the end date is before now
    };

    const sortedTrips = [...userTrips].sort((a, b) => {
        const dateA = new Date(JSON.parse(a.tripData).startDate);
        const dateB = new Date(JSON.parse(b.tripData).startDate);
        return dateA - dateB;
    });

    const historyTrips = sortedTrips.filter((trip) => isHistoryTrip(trip)).reverse();

    useEffect(() => {
        if (user) GetMyTrip();
    }, []);

    const GetMyTrip = async () => {
        setLoading(true);
        const q = query(
            collection(db, 'UserTrips'),
            where('userEmail', '==', user?.email)
        );
        const querySnapShot = await getDocs(q);

        const trips = querySnapShot.docs.map(doc => doc.data());
        setUserTrips(trips);
        setLoading(false);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 35
                }}>My History Trips</Text>
            </View>

            <View style={{ marginTop: 10 }}>
                {!loading ? (
                    historyTrips.length > 0 ? 
                        historyTrips.map((trip, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    router.push({
                                        pathname: '/trip-details',
                                        params: { tripData: JSON.stringify(trip) },
                                    })
                                }
                            >
                                <UserTripCard trip={trip} />
                            </TouchableOpacity>
                        )) 
                        : (
                            <Text style={styles.noTripsText}>No past trips available.</Text>
                        )
                ) : (
                    <ActivityIndicator style={{marginTop: 20}} size="large" color={Colors.PRIMARAY} />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: '100%',
    },
    noTripsText: {
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'outfit-bold',
        fontSize: 20,
        color: Colors.GRAY
    },
});
