import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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
    const {tripData, setTripData} = useContext(CreateTripContext); 
    const [errorMessage, setErrorMessage] = useState('');
    const [notiModal, setNotiModal] = useState();
        
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Select Budget'
        })
    }, []);

    useEffect(() => {
        setTripData({
            ...tripData,
            budget: selectedOption?.title
        })
    }, [selectedOption]);

    const onClickCountinue = () => {
        if(!selectedOption){
            setErrorMessage('Please select your budget')
            setNotiModal(true)
            return;
        }

        router.push('/create-trip/review-trip');
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
        }}>Travel Budget</Text>

        <View style={{
            marginTop: 20
        }}>
            <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
        }}>Choose spending habits for your trip</Text>
        </View>

        <FlatList
        data={SelectBudgetOptions}
            renderItem={(item, index) => (
                <TouchableOpacity 
                onPress={() => setSelectedOption(item.item)}
                style={{ marginVertical: 10 }}>
                    <OptionCard option={item} selectedOption={selectedOption}/>
                </TouchableOpacity>
            )}
        />

         <TouchableOpacity
            onPress={onClickCountinue}
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
        {errorMessage && (
          <NotificationMessage visible={notiModal} id={1} message={errorMessage} onClose={() => setNotiModal(false)}/>
        )}
    </View>
  )
}

const styles = StyleSheet.create({})