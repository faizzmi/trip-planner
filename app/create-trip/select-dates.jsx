import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { useState } from 'react';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectDates() {

    const navigation = useNavigation();
    const router = useRouter();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const {tripData, setTripData} = useContext(CreateTripContext);
    


    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Select Dates'
        })
    }, []);

    const onDateChange = (date, type) => {
        console.log("date: ", date, type);
        if(type==='START_DATE'){
            setStartDate(moment(date));
        } else {
            setEndDate(moment(date));
        }
    }

    const onDateSelectionCountinue = () => {

        if(!startDate&&!endDate){
            // ToastAndroid.show('Please select start and end date',ToastAndroid.LONG)
            return;
        }

        const totalNoOfDays = endDate.diff(startDate, 'days');
        console.log(totalNoOfDays);

        setTripData({
            ...tripData,
            startDate: startDate,
            endDate: endDate,
            noOfDays: totalNoOfDays + 1
        });

        router.push('/create-trip/select-preferences')
    }

  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 30,
            marginTop: 20
        }}>Travel Dates</Text>

        <View style={{
            marginTop: 30
        }}>
            <CalendarPicker 
            onDateChange={onDateChange}
            allowRangeSelection={true} 
            minDate={new Date()}
            maxRangeDuration={7}
            selectedRangeStyle={{ backgroundColor: Colors.PRIMARAY}}
            selectedDayTextStyle={{ color: Colors.WHITE}}
                />
        </View>

        <TouchableOpacity
            onPress={onDateSelectionCountinue}
            style={{
                marginTop: 20,
                padding:15,
                backgroundColor:Colors.PRIMARAY,
                borderRadius:15,
        }}>
            <Text
                style={{
                    color:Colors.WHITE,
                    textAlign:'center',
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}
            >Countinue</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})