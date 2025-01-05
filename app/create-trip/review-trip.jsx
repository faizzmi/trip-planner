import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function ReviewTrip() {

    const navigation = useNavigation();
    const router = useRouter();
    const {tripData, setTripData} = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Review Trip'
        })
    })

  return (
    <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
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

        <View style={{
            marginTop: 40,
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
                }}>Muslim Friendly</Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20,
                }}>{tripData?.muslimFriendly ? 'Muslim Friendly' : 'Not Muslim Friendly'}

                </Text>
            </View>
        </View>

        <TouchableOpacity
            onPress={() => router.replace('/create-trip/generate-trip')}
            style={{
                marginTop: 80,
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
            >Plan My Trip</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})