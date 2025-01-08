import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARAY
    }}>
        <Tabs.Screen name='mytrip' 
            options={{
                tabBarLabel:'My Trip',
                tabBarIcon:({color})=><Ionicons name="location-sharp" size={24} color="black" />
            }}
            />
        <Tabs.Screen name='discover' 
            options={{
                tabBarLabel:'Discover',
                tabBarIcon:({color})=><Ionicons name="globe-sharp" size={24} color="black" />
            }}
            />
        {/* <Tabs.Screen name='history' 
            options={{
                tabBarLabel:'History',
                tabBarIcon:({color})=><MaterialIcons name="history" size={24} color="black" />
            }}
            /> */}
        <Tabs.Screen name='profile' 
            options={{
                tabBarLabel:'My Profile',
                tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color="black" />
            }}
            />
    </Tabs>
  )
}

const styles = StyleSheet.create({})