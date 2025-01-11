import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { useRouter } from 'expo-router';
import { auth, db } from './../../configs/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import UserTripList from '../../components/MyTrips/UserTripList';
import LoadingModal from '../../components/LoadingModal';

export default function MyTrip() {
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = auth.currentUser;
    const router = useRouter();

    useEffect(() => {
        if (user) {GetMyTrip();}
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
        <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>My Trips</Text>
            <TouchableOpacity onPress={() => router.push('/create-trip/search-place')}>
                <Ionicons name="add-circle" size={50} color={'black'} />
            </TouchableOpacity>
        </View>
        {loading ? (
            <LoadingModal visible={loading}/>
        ) : (
            userTrips.length === 0 ? <StartNewTripCard /> : <UserTripList userTrips={userTrips} />
        )}
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
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontFamily: 'outfit-bold',
        fontSize: 35,
    },
    loaderContainer: {
        marginTop: 20,
    }
});
