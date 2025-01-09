import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext'
import PlaceCard from '../../components/CreateTrip/placeCard';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SearchPlace() {

    const navigation = useNavigation();
    const router = useRouter();
    const [search, setSearch] = useState();
    const {tripData, setTripData} = useContext(CreateTripContext);

    useEffect(() =>{
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Search Place'
        })
    }, [])

    useEffect(() => {
        if (search) {
            setTripData((prevData) => ({
            ...prevData,
            locationInfo: search,
            }));
        }

    }, [search]);

    const valContinue = () => {
        if(!search){
            console.error('Please choose place to travel');
            return;
        }
        router.push('/create-trip/select-traveler');
    }
    

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <View style={{ marginTop: 25 }}>
                <View style={styles.searchBar} >
                    <TextInput 
                    style={{width: '90%'}}
                        placeholder='Search Place'
                        onChangeText={(value) => setSearch(value)}
                    >
                    </TextInput>
                    <Ionicons
                    style={{ width: '10%'}} name="search" size={24} color="black" />
                </View>
            </View>

            <View style={{ marginTop: 20 }}>

                <PlaceCard />
                
                <TouchableOpacity
                    onPress={valContinue}
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
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        padding:10,
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.GRAY,
        fontFamily: 'outfit',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    }
})