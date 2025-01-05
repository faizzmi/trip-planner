import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { useRouter } from 'expo-router';
import { auth, db } from './../../configs/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import UserTripList from '../../components/MyTrips/UserTripList';

export default function MyTrip() {
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = auth.currentUser;
    const router = useRouter();

    useEffect(() => {
        if (user) GetMyTrip();
    }, [user]);

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
        <ScrollView style={{
            padding: 25,
            paddingTop: 55,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 35
                }}>My Trips</Text>
                <TouchableOpacity onPress={() => router.push('/create-trip/search-place')}>
                    <Ionicons name="add-circle" size={50} color="black" />
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color={Colors.PRIMARAY} />}

            {userTrips.length === 0
                ? <StartNewTripCard />
                : <UserTripList userTrips={userTrips} />
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
