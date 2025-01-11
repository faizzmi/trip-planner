import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { SelectBudgetOptions } from '../../constants/Options';
import NotificationMessage from '../../components/NotificationMessage';

export default function SelectBudget() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext); 
    const [errorMessage, setErrorMessage] = useState('');
    const [notiModal, setNotiModal] = useState(false);
    
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Select Budget',
        });
    }, []);

    useEffect(() => {
        setTripData({
            ...tripData,
            budget: selectedOption?.title,
        });
    }, [selectedOption]);

    const onClickCountinue = () => {
        if (!selectedOption) {
            setErrorMessage('Please select your budget');
            setNotiModal(true);
            return;
        }
        router.push('/create-trip/review-trip');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Travel Budget</Text>
            <Text style={styles.subheading}>Choose spending habits for your trip</Text>

            <FlatList
                data={SelectBudgetOptions}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedOption(item)} style={{ marginVertical: 10 }}>
                        <OptionCard option={item} selectedOption={selectedOption} />
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                onPress={onClickCountinue}
                style={[styles.button, { opacity: selectedOption ? 1 : 0.5 }]}
                disabled={!selectedOption}>
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
    subheading: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        marginTop: 20,
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
