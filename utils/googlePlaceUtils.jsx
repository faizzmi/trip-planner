const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACE_API_KEY;
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

async function getPlaceId(placeName) {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        placeName
    )}&inputtype=textquery&fields=place_id&key=${API_KEY}`;
 
    try {
        const response = await fetch(CORS_PROXY + url);  
        if (!response.ok) throw new Error('Failed to fetch Place ID.');
        const data = await response.json();
        const placeId = data.candidates[0]?.place_id;
        if (!placeId) throw new Error('Place ID not found.');
        return placeId;
    } catch (error) {
        throw error;
  }
}

async function getPhotoReference(placeId) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${API_KEY}`;

    try {
        const response = await fetch(CORS_PROXY + url);
        if (!response.ok) throw new Error('Failed to fetch photo reference.');
        const data = await response.json();
        const photoReference = data.result.photos[0]?.photo_reference;
        if (!photoReference) throw new Error('Photo reference not found.');
        return photoReference;
    } catch (error) {
        throw error;
    }
}

function getPhotoUrl(photoReference) {
    const url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxwidth=400&key=${API_KEY}`;
    return url;
}

export async function getPlacePhoto(placeName) {
    try {
        const placeId = await getPlaceId(placeName);
        const photoReference = await getPhotoReference(placeId);
        const photoUrl = getPhotoUrl(photoReference);
        return photoUrl;
    } catch (error) {
    }
}
