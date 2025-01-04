import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function OptionCard({option, selectedTraveler}) {
  return (
    <View style={[{
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 15
    }, selectedTraveler?.id === option.item.id&&{borderWidth:3}]}>
        <View>
            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit-bold'
            }}
            >
                {option?.item.title}
            </Text>
            <Text style={{
                fontSize: 17,
                fontFamily: 'outfit-medium',
                color: Colors.GRAY
            }}
            >
                {option?.item.desc}
            </Text>
        </View>
        <Text style={{
            fontSize:  37
        }}
        >{option?.item.icon}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})