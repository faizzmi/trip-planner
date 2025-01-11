import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';
import NotificationMessage from '../../components/NotificationMessage';

export default function SelectDates() {
    const navigation = useNavigation();
    const router = useRouter();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState(); 
    const [errorMessage, setErrorMessage] = useState('');
    const [notiModal, setNotiModal] = useState(false);
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Select Dates',
        });
    }, []);

    const onDateChange = (date, type) => {
        if (type === 'START_DATE') {
            setStartDate(moment(date));
        } else {
            setEndDate(moment(date));
        }
    };

    const onDateSelectionCountinue = () => {
        if (!startDate || !endDate) {
            setErrorMessage('Please select start and end date');
            setNotiModal(true);
            return;
        }

        const totalNoOfDays = endDate.diff(startDate, 'days');
        
        setTripData({
            ...tripData,
            startDate: startDate,
            endDate: endDate,
            noOfDays: totalNoOfDays + 1,
        });

        router.push('/create-trip/select-preferences');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Travel Dates</Text>
            <View style={styles.calendarContainer}>
                <CalendarPicker
                    onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxRangeDuration={30}
                    selectedRangeStyle={{ backgroundColor: Colors.PRIMARAY }}
                    selectedDayTextStyle={{ color: Colors.WHITE }}
                />
            </View>
            <TouchableOpacity onPress={onDateSelectionCountinue} style={styles.button}>
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
        backgroundColor: Colors.WHITE,
        height: '100%',
    },
    heading: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
        marginTop: 20,
    },
    calendarContainer: {
        marginTop: 30,
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
