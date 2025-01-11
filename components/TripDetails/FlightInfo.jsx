import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/Colors';

export default function FlightInfo({ flightData }) {
  const [showDetails, setShowDetails] = useState(false);

  if (!flightData) {
    return <Text>No flight information available</Text>;
  }

  const handleNavigateToWebsite = () => {
    const url = flightData.bookingUrl;
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open URL:', err);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Flight Details</Text>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToWebsite}>
          <Text style={styles.buttonText}>Book Here</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.price}>Airline: {flightData.outboundFlight.airline}</Text>
      <Text style={styles.price}>Estimated Price: {flightData.estimatedFlightPrice}</Text>

      <TouchableOpacity onPress={() => setShowDetails(!showDetails)} style={{marginTop: 15, marginBottom: showDetails && 15}}>
        <Text>{showDetails ? 'Hide Details' : 'Show Details'}</Text>
      </TouchableOpacity>

      {showDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Outbound Flight</Text>
          <Text style={styles.detail}>Airline: {flightData.outboundFlight.airline}</Text>
          <Text style={styles.detail}>
            Departure: {flightData.outboundFlight.departureLocation} - {flightData.outboundFlight.departureTime}
          </Text>
          <Text style={styles.detail}>
            Arrival: {flightData.outboundFlight.arrivalLocation} - {flightData.outboundFlight.arrivalTime}
          </Text>
          <Text style={styles.detail}>Duration: {flightData.outboundFlight.flightDuration}</Text>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Return Flight</Text>
          <Text style={styles.detail}>Airline: {flightData.returnFlight.airline}</Text>
          <Text style={styles.detail}>
            Departure: {flightData.returnFlight.departureLocation} - {flightData.returnFlight.departureTime}
          </Text>
          <Text style={styles.detail}>
            Arrival: {flightData.returnFlight.arrivalLocation} - {flightData.returnFlight.arrivalTime}
          </Text>
          <Text style={styles.detail}>Duration: {flightData.returnFlight.flightDuration}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 15,
    padding: 15,
    borderColor: Colors.GRAY,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
  },
  button: {
    padding: 8,
    backgroundColor: Colors.PRIMARAY,
    borderRadius: 7,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 15,
  },
  price: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    borderWidth: 1,
  },
  sectionTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    marginBottom: 10,
  },
  detail: {
    fontFamily: 'outfit',
    fontSize: 16,
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.GRAY,
    marginVertical: 10,
  },
});
