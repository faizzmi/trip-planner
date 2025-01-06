import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModel';
import {db, auth} from './../../configs/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function GenerateTrip() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  const GenerateAiTrip = async() => {
        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.locationInfo)
        .replace('{budget}',tripData?.budget)
        .replace('{travel_companions}', tripData?.traveler?.title)
        .replace('{number_of_days}', tripData?.noOfDays)
        .replace('{preferences}', tripData?.preference)
        .replace('{muslim}', tripData?.muslimFriendly ? 'Muslim' : 'Non Muslim');

        console.log(FINAL_PROMPT);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result.response.text());

        setLoading(false);
        const docId = (Date.now()).toString();
        const user = auth.currentUser;
        const tripRes = JSON.parse(result.response.text());

        const result_ = await setDoc(doc(db, "UserTrips", docId), {
            userEmail: user.email,
            tripPlan: tripRes,
            tripData:JSON.stringify(tripData),
            docId: docId

        })
        
        // router.push;
        router.push('(tabs)/mytrip');
       
  };

  useEffect(() => {
    GenerateAiTrip()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: false,
    });
  });

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.DARK_GRAY,
        height: '100%',
      }}
    >
      <View style={{ marginTop: 75 }}>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 35,
            textAlign: 'center',
            color: Colors.WHITE,
          }}
        >
          Please Wait...
        </Text>

        <Text
          style={{
            fontFamily: 'outfit-medium',
            fontSize: 20,
            textAlign: 'center',
            marginTop: 40,
            color: Colors.WHITE,
          }}
        >
          We are working to generate your dream trip
        </Text>

        {/* Replacing the GIF with a spinning loader */}
        <ActivityIndicator
          size="large"
          color= {Colors.WHITE}
          style={{
            marginTop: 75,
            marginBottom: 75,
            transform: [{scale: 3}]
          }}
        />

        <Text
          style={{
            fontFamily: 'outfit',
            color: Colors.GRAY,
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          Do not Go Back
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
