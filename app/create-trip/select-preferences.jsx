import { FlatList, StyleSheet, Text, View, TouchableOpacity, CheckBox } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { SelectTravelPreference } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';

export default function SelectPreferences() {

    const navigation = useNavigation();
    const router = useRouter();
    const [selectedPreference, setSelectedPreference] = useState();
    const [isMuslimFriendly, setIsMuslimFriendly] = useState(false);
    const {tripData, setTripData} = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Select Preference'
        })
    }, []);

    useEffect(() => {
        setTripData({
            ...tripData,
            preference: selectedPreference?.title,
            muslimFriendly: isMuslimFriendly, 
        })
    }, [selectedPreference, isMuslimFriendly]);

    const onClickCountinue = () => {
        if(!selectedPreference){
            return;
        }

        router.push('/create-trip/select-budget');
    }

  return (
    <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>

        <Text  style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
                marginTop: 20
            }}>Travel Preference</Text>

        <View style={{
            marginTop: 20
        }}>
            <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
        }}>Choose your preferred travel style</Text>
        </View>

        
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
                value={isMuslimFriendly}
                onValueChange={setIsMuslimFriendly}
                style={{ marginRight: 10 }}
            />
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 18,
                color: Colors.GRAY,
            }}>
                Muslim-friendly trip
            </Text>
        </View>


        <FlatList 
        data={SelectTravelPreference}
            renderItem={(item, index) => (
                <TouchableOpacity 
                onPress={() => setSelectedPreference(item.item)}
                style={{ marginVertical: 10 }}>
                    <OptionCard option={item} selectedOption={selectedPreference}/>
                </TouchableOpacity>
        )}/>

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
    </View>
  )
}

const styles = StyleSheet.create({})