import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import { getPlacePhoto } from '../../utils/googlePlaceUtils';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';
import { findUpcomingTrip, sortTripsByStartDate } from '../../utils/tripUtils';

export default function UserTripList({ userTrips }) {
  const router = useRouter();
  const [upcomingTripUrl, setUpcomingTripUrl] = useState(null);

  const now = new Date();
  const upcomingTrip = findUpcomingTrip(userTrips, now);
  const sortedTrips = sortTripsByStartDate(userTrips);

  const tripLabel = upcomingTrip &&
    (now >= new Date(JSON.parse(upcomingTrip.tripData).startDate) &&
     now <= new Date(JSON.parse(upcomingTrip.tripData).endDate))
      ? '🌥️ Ongoing Trip'
      : 'Next Trip';

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const locationInfo = JSON.parse(upcomingTrip?.tripData || '{}').locationInfo;
        if (locationInfo) {
          const url = await getPlacePhoto(locationInfo);
          setUpcomingTripUrl(url);
        }
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    if (upcomingTrip) fetchPhoto();
  }, [upcomingTrip]);

  return (
    <View style={styles.container}>
      {upcomingTrip && (
        <>
          <Text style={styles.tripLabel}>{tripLabel}</Text>
          <Image
            source={upcomingTripUrl ? { uri: upcomingTripUrl } : require('./../../assets/images/defaultPlace.jpg')}
            style={styles.upcomingImage}
            accessible
            accessibilityLabel={`Image for ${JSON.parse(upcomingTrip.tripData)?.locationInfo || 'upcoming trip'}`}
          />
          <View style={styles.upcomingDetails}>
            <Text style={styles.tripLocation}>
              {JSON.parse(upcomingTrip.tripData)?.locationInfo || 'Unknown Location'}
            </Text>
            <View style={styles.tripDatesContainer}>
              <Text style={styles.tripDates}>
                📅 {' '}
                {moment(JSON.parse(upcomingTrip.tripData)?.startDate).format('DD MMM YYYY')} -{' '}
                {moment(JSON.parse(upcomingTrip.tripData)?.endDate).format('DD MMM YYYY')}
              </Text>
              <Text style={styles.tripTraveler}>
                ⚡ {JSON.parse(upcomingTrip.tripData)?.traveler?.title || 'Unknown Traveler'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/trip-details',
                  params: { tripData: JSON.stringify(upcomingTrip) },
                })
              }
              style={styles.seePlanButton}
            >
              <Text style={styles.seePlanButtonText}>See your plan</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Upcoming Trip</Text>
        <View style={styles.divider} />
      </View>

      {sortedTrips.slice(1).length > 0 ? (
        sortedTrips.slice(1).map((trip, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname: '/trip-details',
                params: { tripData: JSON.stringify(trip) },
              })
            }
          >
            <UserTripCard trip={trip} />
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noTripsText}>No upcoming trips planned.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  tripLabel: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  upcomingImage: {
    width: '100%',
    height: 230,
    borderRadius: 15,
    marginTop: 20,
  },
  upcomingDetails: {
    marginTop: 10,
  },
  tripLocation: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
  },
  tripDatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  tripDates: {
    fontFamily: 'outfit',
    fontSize: 17,
    color: Colors.GRAY,
  },
  tripTraveler: {
    fontFamily: 'outfit',
    fontSize: 17,
    color: Colors.GRAY,
  },
  seePlanButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: Colors.PRIMARAY,
    borderRadius: 15,
  },
  seePlanButtonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 15,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.GRAY,
  },
  dividerText: {
    width: 100,
    textAlign: 'center',
  },
  noTripsText: {
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
    marginTop: 20,
  },
});
