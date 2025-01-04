import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { FlatList } from 'react-native';
import { SelectTravelerList } from './../../constants/Options'
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTraveler() {

  const navigation = useNavigation();
  const [selectedTraveler, setSelectedTraveler] = useState();
  const {tripData, setTripData} = useContext(CreateTripContext);
  const router = useRouter();
  
// cek kenape ade item.item.case

    useEffect(() =>{
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Select Traveler'
        })
    }, []);

    useEffect(() => {
      setTripData({...tripData,
        travelerCount: selectedTraveler
      })
    }, [selectedTraveler]);

    useEffect(() => {
      console.log(tripData);
    }, [tripData])

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <Text style={{
        fontSize: 30,
        marginTop: 20,
        fontFamily: 'outfit-bold'
      }}
      >Who's Traveling</Text>
      <View style={{
        margintop: 20
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,

        }}>Choose your travelers</Text>
      </View>
      <FlatList
        data={SelectTravelerList}
        renderItem={(item, index) =>(
          <TouchableOpacity
            onPress={() => setSelectedTraveler(item.item)}
           style={{
            marginVertical: 10
          }}>
            <OptionCard option={item} selectedTraveler={selectedTraveler}/>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push('/create-trip/select-dates')}
        style={
        {
          marginTop: 20,
          padding:15,
          backgroundColor:Colors.PRIMARAY,
          borderRadius:15,
        }
      }>
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