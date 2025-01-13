import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function OptionCard({ option, selectedOption }) {
  
  console.log('OptionCard', option);
  console.log('selectedOption', selectedOption);
  const isSelected = selectedOption?.id === option.id; // Check if selected

  return (
    <View
      style={[
        styles.card,
        isSelected && styles.selectedCard,
      ]}
      accessible={true}
      accessibilityLabel={`Option card: ${option?.title}`}
    >
      <View>
        <Text style={styles.title}>{option?.title}</Text>
        <Text style={styles.description}>
          {option?.desc}
        </Text>
      </View>
      <Text style={styles.icon}>{option?.icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    minHeight: 80,
    elevation: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: Colors.PRIMARAY,
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
  },
  description: {
    fontSize: 15,
    fontFamily: 'outfit-medium',
    color: Colors.GRAY,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  icon: {
    fontSize: 37,
  },
});
