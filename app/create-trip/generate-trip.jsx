import { StyleSheet, Text, View, ActivityIndicator, BackHandler } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModel';
import {db, auth} from './../../configs/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import NotificationMessage from '../../components/NotificationMessage';

export default function GenerateTrip() {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notiModal, setNotiModal] = useState(false);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  const GenerateAiTrip = async() => {
    try{
      const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', tripData?.locationInfo)
      .replace('{budget}',tripData?.budget)
      .replace('{travel_companions}', tripData?.traveler?.title)
      .replace('{number_of_days}', tripData?.noOfDays)
      .replace('{preferences}', tripData?.preference)
      .replace('{muslim}', tripData?.muslimFriendly)
      .replace('{country}', tripData?.country);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      const docId = (Date.now()).toString();
      const user = auth.currentUser;
      const tripRes = JSON.parse(result.response.text());

      const result_ = await setDoc(doc(db, "UserTrips", docId), {
          userEmail: user.email,
          tripPlan: tripRes,
          tripData:JSON.stringify(tripData),
          docId: docId 
      })

      if(tripRes){
        setNotiModal(true);
        setSuccessMessage('Trip generate')
      } else {
        setNotiModal(true);
        setErrorMessage('Fail to generate trip');
      }
      
      router.push('/my-trips');
    } catch (error) {
      setErrorMessage('An error occurred while generating your trip.');
      setNotiModal(true);
    }
  };

  useEffect(() => {
    if (!tripData?.locationInfo || !tripData?.budget || !tripData?.noOfDays) {
      setErrorMessage('Please fill out all trip details before generating.');
      setNotiModal(true);
      return;
    }

    GenerateAiTrip();
  }, [tripData]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: false,
    });
  });

  return (
    <View style={styles.container} >
      <Text style={styles.headerText}>Please Wait...</Text>
      <Text style={styles.subHeaderText}>We are working to generate your dream trip</Text>
      <ActivityIndicator size="large" color={Colors.WHITE} style={styles.activityIndicator} />
      <Text style={styles.doNotGoBackText}>Do not Go Back</Text>

      {(errorMessage || successMessage) && (
        <NotificationMessage
            visible={notiModal}
            id={errorMessage ? 1 : 2} 
            message={errorMessage || successMessage}
            onClose={() => {
              setNotiModal(false);
              setErrorMessage('');
              setSuccessMessage('');
            }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: Colors.DARK_GRAY,
    height: '100%',
  },
  headerText: {
    fontFamily: 'outfit-bold',
    fontSize: 35,
    textAlign: 'center',
    color: Colors.WHITE,
  },
  subHeaderText: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
    color: Colors.WHITE,
  },
  activityIndicator: {
    marginTop: 75,
    marginBottom: 75,
    transform: [{ scale: 3 }],
  },
  doNotGoBackText: {
    fontFamily: 'outfit',
    color: Colors.GRAY,
    fontSize: 20,
    textAlign: 'center',
  },
});


