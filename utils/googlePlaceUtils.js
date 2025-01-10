export const getPhotoUrl = () => {
    console.log(process.env.REACT_APP_PLACES_API_KEY);
//   return `https://maps.googleapis.com/maps/api/place/photo?photoreference=Aap_uEBgWtYYZjzPQoehz8XTmABxvCiEUEFc7I5-ZUQ&key=${process.env.REACT_APP_PLACES_API_KEY}&maxwidth=400&maxheight=400`;
};

export const fetchPlacePhoto = async (photoReference) => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/photo';
  const maxWidth = 400;

  const url = `${baseUrl}?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      // The API will redirect to the image URL
      return response.url;
    } else {
      console.error('Error fetching photo:', response.statusText);
      throw new Error('Failed to fetch photo');
    }
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};
