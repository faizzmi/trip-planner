import { now } from 'moment';

const sortDate = (trips) => {
    return [...trips].sort((a, b) => {
        const dateA = new Date(JSON.parse(a.tripData).startDate);
        const dateB = new Date(JSON.parse(b.tripData).startDate);
        return dateA - dateB;
    });
}

/**
 * Function to determine if the trip is in the past
 * @param {Object} trip - The trip object
 * @returns {boolean} - Returns true if the trip is historical (ended in the past)
 */
export const isHistoryTrip = (trip) => {
    return sortDate(trip).filter((trip) => {
        const endDate = new Date(JSON.parse(trip.tripData).endDate);
        return endDate < now();
    });;
};

/**
 * Function to sort trips by their start date
 * @param {Array} trips - The array of trips to be sorted
 * @returns {Array} - The sorted array of trips
 */
export const sortTripsByStartDate = (trips) => {
    return sortDate(trips).filter((trip) => {
        const endDate = new Date(JSON.parse(trip.tripData).endDate);
        return endDate >= now();
    });;
};

/**
 * Function to find the nearest upcoming trip (either ongoing or next)
 * @param {Array} trips - The array of trips
 * @param {Date} now - The current date
 * @returns {Object|null} - The upcoming trip or null if no upcoming trips are found
 */

export const findUpcomingTrip = (trips, now) => {
    const isCurrentTrip = (trip) => {
        const startDate = new Date(JSON.parse(trip.tripData).startDate);
        const endDate = new Date(JSON.parse(trip.tripData).endDate);
        return now >= startDate && now <= endDate;
    };

    const sortedTrips = sortTripsByStartDate(trips);
    const nearestTripIndex = sortedTrips.findIndex((trip) => {
        const tripDate = new Date(JSON.parse(trip.tripData).startDate);
        return tripDate >= now || isCurrentTrip(trip);
    });

    return nearestTripIndex !== -1 ? sortedTrips[nearestTripIndex] : null;
};
