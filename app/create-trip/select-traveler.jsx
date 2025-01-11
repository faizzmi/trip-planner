import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { SelectTravelerList } from './../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';
import NotificationMessage from '../../components/NotificationMessage';

export default function SelectTraveler() {

  const navigation = useNavigation();
  const [selectedTraveler, setSelectedTraveler] = useState();  
  const [errorMessage, setErrorMessage] = useState('');
  const [notiModal, setNotiModal] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  
  // Continue button handler
  const valContinue = () => {
    if (!selectedTraveler) {
      setErrorMessage('Please choose who to travel with');
      setNotiModal(true);
      return;
    }
    router.push('/create-trip/select-dates');
  }
    
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Select Traveler'
    });
  }, []);

  useEffect(() => {
    setTripData({
      ...tripData,
      traveler: selectedTraveler
    });
  }, [selectedTraveler]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Who's Traveling</Text>

      <View style={styles.subHeadingContainer}>
        <Text style={styles.subHeading}>Choose your travelers</Text>
      </View>

      <FlatList
        data={SelectTravelerList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => setSelectedTraveler(item)}
            style={styles.optionContainer}>
            <OptionCard option={item} selectedOption={selectedTraveler} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={valContinue}
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
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  heading: {
    fontSize: 30,
    marginTop: 20,
    fontFamily: 'outfit-bold',
  },
  subHeadingContainer: {
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
