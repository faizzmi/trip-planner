import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/Colors';

export default function FlightInfo({ flightData }) {
  const [showDetails, setShowDetails] = useState(false);

  if (!flightData) {
    return <Text style={styles.errorText}>No flight information available</Text>;
  }

  const {
    bookingUrl,
    estimatedFlightPrice,
    outboundFlight,
    returnFlight,
  } = flightData;

  const handleNavigateToWebsite = () => {
    if (bookingUrl) {
      Linking.openURL(bookingUrl).catch((err) =>
        console.error('Failed to open URL:', err)
      );
    } else {
      console.error('No booking URL provided');
    }
  };

  const renderFlightDetails = (flight, type) => {
    if (!flight) {
      return <Text style={styles.errorText}>{`No ${type} flight information available`}</Text>;
    }

    return (
      <>
        <Text style={styles.sectionTitle}>{`${type} Flight`}</Text>
        <Text style={styles.detail}>Airline: {flight.airline || 'N/A'}</Text>
        <Text style={styles.detail}>
          Departure: {flight.departureLocation || 'Unknown'} - {flight.departureTime || 'N/A'}
        </Text>
        <Text style={styles.detail}>
          Arrival: {flight.arrivalLocation || 'Unknown'} - {flight.arrivalTime || 'N/A'}
        </Text>
        <Text style={styles.detail}>Duration: {flight.flightDuration || 'N/A'}</Text>
      </>
    );
  };

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Flight Details</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToWebsite}
          accessible
          accessibilityLabel="Navigate to booking website"
        >
          <Text style={styles.buttonText}>Book Here</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.price}>Airline: {outboundFlight?.airline || 'N/A'}</Text>
      <Text style={styles.price}>Estimated Price: {estimatedFlightPrice || 'N/A'}</Text>

      <TouchableOpacity
        onPress={() => setShowDetails(!showDetails)}
        style={styles.toggleDetailsButton}
        accessible
        accessibilityLabel={showDetails ? 'Hide flight details' : 'Show flight details'}
      >
        <Text>{showDetails ? 'Hide Details' : 'Show Details'}</Text>
      </TouchableOpacity>
    </View>
    {showDetails && (
      <View style={styles.detailsContainer}>
        {renderFlightDetails(outboundFlight, 'Outbound')}
        <View style={styles.separator} />
        {renderFlightDetails(returnFlight, 'Return')}
      </View>
    )}
    </>
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
    marginBottom: 5,
  },
  toggleDetailsButton: {
    marginTop: 15,
    marginBottom: 15,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    marginTop: -10,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
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
  errorText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: 'center',
  },
});
