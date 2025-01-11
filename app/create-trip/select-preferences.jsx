import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { SelectTravelPreference } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import NotificationMessage from '../../components/NotificationMessage';

export default function SelectPreferences() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedPreference, setSelectedPreference] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext); 
    const [errorMessage, setErrorMessage] = useState('');
    const [notiModal, setNotiModal] = useState();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Select Preference',
        });
    }, []);

    useEffect(() => {
        setTripData({
            ...tripData,
            preference: selectedPreference?.title,
        });
    }, [selectedPreference]);

    const onClickCountinue = () => {
        if (!selectedPreference) {
            setErrorMessage('Please choose who you travel with');
            setNotiModal(true);
            return;
        }
        router.push('/create-trip/select-budget');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Travel Preference</Text>

            <View style={styles.description}>
                <Text style={styles.subHeading}>Choose your preferred travel style</Text>
            </View>

            <FlatList 
                data={SelectTravelPreference}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => setSelectedPreference(item)}
                        style={styles.optionContainer}>
                        <OptionCard option={item} selectedOption={selectedPreference}/>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                onPress={onClickCountinue}
                style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            {errorMessage && (
                <NotificationMessage
                    visible={notiModal}
                    id={1}
                    message={errorMessage}
                    onClose={() => setNotiModal(false)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.L_WHITE,
        height: '100%',
    },
    heading: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
        marginTop: 20,
    },
    description: {
        marginTop: 20,
    },
    subHeading: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
    },
    optionContainer: {
        marginVertical: 10,
    },
    button: {
        marginTop: 20,
        padding: 15,
        backgroundColor: Colors.PRIMARAY,
        borderRadius: 15,
    },
    buttonText: {
        color: Colors.WHITE,
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 20,
    },
});
