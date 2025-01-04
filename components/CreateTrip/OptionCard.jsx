import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function OptionCard({ option, selectedOption }) {
  // Function to limit words in a string
  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
  };

  return (
    <View style={[{
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 15,
        height: '100%'
    }, selectedOption?.id === option.item.id && { borderWidth: 3 }]}>
        <View>
            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit-bold'
            }}
            >
                {option?.item.title}
            </Text>
            <Text style={{
                fontSize: 15,
                fontFamily: 'outfit-medium',
                color: Colors.GRAY,
                fontStyle: 'italic',
                lineHeight: 20
            }}
            >
                {truncateText(option?.item.desc, 6)} {/* Limit to 6 words */}
            </Text>
        </View>
        <Text style={{
            fontSize: 37
        }}
        >{option?.item.icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
