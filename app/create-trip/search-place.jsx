import { StyleSheet, TextInput, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext';
import PlaceCard from '../../components/CreateTrip/placeCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SEARCH_PROMPT } from '../../constants/Options';
import { searchTravelDestination } from '../../configs/AiModel';

export default function SearchPlace() {
    const navigation = useNavigation();
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [card, setCard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ destination, setDestination] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Search Place',
        });
    }, []);

    const searchPlace = async () => {
        setLoading(true);
        
        const FINAL_PROMPT = SEARCH_PROMPT.replace('{search}', search);
        const result = await searchTravelDestination.sendMessage(FINAL_PROMPT);
        setLoading(false);

        setDestination(JSON.parse(result.response.text()))
        setCard(true);
    }

    const valContinue = () => {
        setTripData((prevData) => ({
            ...prevData,
            locationInfo: destination.placeName,
        }));

        router.push('/create-trip/select-traveler');
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search Place"
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                    />
                    <Ionicons onPress={searchPlace} style={styles.icon} name="search" size={24} color="black" />
                </View>
            </View>

            { loading ?
                (<ActivityIndicator style={{marginTop: 20}} size="large" color={Colors.PRIMARAY} />)
                : destination === null ?
                    ( <Text style={styles.noTripsText}>No such a place called {search}.</Text> ) :
                    ((card) && (
                        <View style={styles.resultContainer}>
                            <PlaceCard destination={destination}/>
                            <TouchableOpacity onPress={valContinue} style={styles.continueButton}>
                                <Text style={styles.continueButtonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
    },
    searchBar: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.GRAY,
        fontFamily: 'outfit',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        width: '90%',
    },
    icon: {
        width: '10%',
    },
    resultContainer: {
        marginTop: 20,
    },
    continueButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: Colors.PRIMARAY,
        borderRadius: 15,
    },
    continueButtonText: {
        color: Colors.WHITE,
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 20,
    },
    noTripsText: {
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'outfit-medium',
        fontSize: 20,
        color: Colors.GRAY
    },
});
