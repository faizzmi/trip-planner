import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { DiscoverPlaces } from '../../constants/Options'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import DiscoverCard from '../../components/DiscoverPlaces/discover-card';

export default function discover() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: false,

    }, [])
  })

  return (
    <ScrollView style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: Colors.WHITE,
      height: '100%'
  }}>
    <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35
    }}>Discover Destinations</Text>
    <Text style={{
        fontFamily: 'outfit',
        fontSize: 20,
        color: Colors.GRAY,
        marginTop: 20
      }}>Uncover Fascinating Locations</Text>

      <FlatList 
        data={DiscoverPlaces}
        renderItem={({item, index}) => (
          <View style={{ marginTop: 10}}>
            <DiscoverCard place={item} />
          </View>
        )}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({})