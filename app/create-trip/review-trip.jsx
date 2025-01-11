import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { auth } from './../../configs/FirebaseConfig';

export default function ReviewTrip() {

    const navigation = useNavigation();
    const router = useRouter();
    const user = auth.currentUser;
    const [error, setError] = useState('');
    const {tripData, setTripData} = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Review Trip'
        })
        getProfileData();
    },[]);

    const getProfileData = async () => {
        try {
          const q = query(collection(db, 'users'), where('email', '==', user?.email));
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            setTripData((prev) => ({
              ...prev,
              muslimFriendly: data.religion,
              country: data.nationality,
            }));
    
          }
        } catch (error) {
            setError('Failed to load profile data');
        }
      };

      const buttonStyle = tripData?.muslimFriendly
        ? { backgroundColor: Colors.PRIMARAY, opacity: 1 }
        : { backgroundColor: Colors.GRAY, opacity: 0.5 };

        const buttonTextStyle = tripData?.muslimFriendly
        ? { color: Colors.WHITE }
        : { color: Colors.LIGHT_GRAY };

  return (
    <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.L_WHITE,
            height: '100%'
        }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 35,
            marginTop: 20
        }}>Review your Trip</Text>

        <View style={{ marginTop: 20}}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>Before generating your trip, please review your selection</Text>
        </View>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}

        <View style={{marginTop: 40, padding: 25, elevation: 3, backgroundColor: Colors.WHITE, borderWidth: 1, borderColor: Colors.GRAY, borderRadius: 15}}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <Text style={{fontSize:30}}>📌</Text>
                <View>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: Colors.GRAY
                    }}>Destination</Text>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                    }}>{tripData?.locationInfo}</Text>
                </View>  

            </View>

            <View style={{
                marginTop: 25,
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <Text style={{fontSize:30}}>📅</Text>
                <View>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: Colors.GRAY
                    }}>Travel Date</Text>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                    }}>{moment(tripData?.startDate).format('DD MMM') +" To "+moment(tripData?.endDate).format('DD MMM')+"  " }
                    ({tripData?.noOfDays} days)
                    </Text>
                </View>
            </View>

            
            <View style={{
                marginTop: 25,
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <Text style={{fontSize:30}}>✈️</Text>
                <View>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: Colors.GRAY
                    }}>Who is Travelling</Text>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                    }}>{tripData?.traveler?.title}
                    </Text>
                </View>
            </View>

            
            <View style={{
                marginTop: 25,
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <Text style={{fontSize:30}}>💲</Text>
                <View>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: Colors.GRAY
                    }}>Budget</Text>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                    }}>{tripData?.budget}
                    </Text>
                </View>
            </View>

            <View style={{
                marginTop: 25,
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <Text style={{fontSize:30}}>🧗</Text>
                <View>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: Colors.GRAY
                    }}>Preference</Text>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                    }}>{tripData?.preference}
                    </Text>
                </View>
            </View>

            <View style={{
                marginTop: 25,
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <Text style={{fontSize:30}}>🕌</Text>
                <View>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: Colors.GRAY
                    }}>Religion</Text>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                    }}>{tripData?.muslimFriendly}

                    </Text>
                </View>
            </View>
        </View>

        <TouchableOpacity
            onPress={tripData?.muslimFriendly ? () => router.replace('/create-trip/generate-trip') : null}
            style={[styles.button, buttonStyle]}
            disabled={!tripData?.muslimFriendly}
        >
            <Text style={[styles.buttonText, buttonTextStyle]}>
            Plan My Trip
            </Text>
            {!tripData?.muslimFriendly && (
            <ActivityIndicator size="small" color={Colors.WHITE} />
            )}
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.L_WHITE,
        height: '100%',
    },
    header: {
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20,
    },
    subHeader: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
    },
    tripDetail: {
        marginTop: 40,
        padding: 25,
        elevation: 3,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 15,
    },
    tripDetailRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    tripDetailIcon: {
        fontSize: 30,
    },
    tripDetailLabel: {
        fontFamily: 'outfit',
        fontSize: 20,
        color: Colors.GRAY,
    },
    tripDetailValue: {
        fontFamily: 'outfit-medium',
        fontSize: 20,
    },
    button: {
        marginTop: 50,
        padding: 15,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
        buttonText: {
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 20,
    },

})