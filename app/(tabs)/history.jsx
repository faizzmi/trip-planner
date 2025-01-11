import { StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserTripCard from '../../components/MyTrips/UserTripCard';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';
import { isHistoryTrip, sortTripsByStartDate } from '../../utils/tripUtils';


export default function History() {
    const router = useRouter();

    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = auth.currentUser;
    
    const sortedTrips = sortTripsByStartDate(userTrips);
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
        backgroundColor: Colors.L_WHITE,
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
