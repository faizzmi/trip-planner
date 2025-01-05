
export const SelectTravelerList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'Solo travel at your pace.',
        icon: '🧑🏻',
        people: '1 person'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Perfect for romantic getaways.',
        icon: '🧑🏻‍🤝‍👩🏼',
        people: '2 people'
    },
    {
        id: 3,
        title: 'Friends',
        desc: 'Fun trips with close friends.',
        icon: '⛵',
        people: '3 to 5 people'
    },
    {
        id: 4,
        title: 'Family',
        desc: 'Quality time with loved ones.',
        icon: '🏡',
        people: '3 to 10 people'
    },
    {
        id: 5,
        title: 'Large Group',
        desc: 'Great for big group trips.',
        icon: '🚌',
        people: '10 to 20 people'
    },
    {
        id: 6,
        title: 'Corporate Team',
        desc: 'Team-building and work retreats.',
        icon: '💼',
        people: '10 to 50 people'
    },
    {
        id: 7,
        title: 'Community Event',
        desc: 'Ideal for large community trips.',
        icon: '🏟️',
        people: '50 to 100 people'
    },
    {
        id: 8,
        title: 'Festival Crowd',
        desc: 'Perfect for festivals or events.',
        icon: '🎉',
        people: '100+ people'
    }
];


export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay fconcius of costs',
        icon: '🪙'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💵'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💰'
    },
];

export const SelectTravelPreference = [
  {
    "id": 1,
    "title": "Relaxed/Leisure",
    "desc": "Peaceful settings, spa, nature",
    "icon": "🌿"
  },
  {
    "id": 2,
    "title": "Adventure/Thrill-seeking",
    "desc": "Adrenaline activities, outdoor exploration",
    "icon": "⛰️"
  },
  {
    "id": 3,
    "title": "Luxury",
    "desc": "High-end experiences, comfort, exclusivity",
    "icon": "💎"
  },
  {
    "id": 4,
    "title": "Budget-Friendly",
    "desc": "Affordable travel, street food, attractions",
    "icon": "💰"
  },
  {
    "id": 5,
    "title": "Cultural/Exploratory",
    "desc": "Learn history, traditions, local life",
    "icon": "🌍"
  }
];

// export const AI_PROMPT = "Create a detailed travel plan in JSON format from Pahang, Malaysia to {location} as a {muslim}, for {budget} budget, with {travel_companions}, within {number_of_days} days, and {preferences} travel (e.g., adventure, relaxation, cultural experiences, or food). The JSON output should include a daily itinerary with activities, places to visit, and approximate costs under the `itinerary` key; suggestions for accommodations with price (in Ringgit Malaysia) ranges under `accommodations`; transportation options to and within the location with costs under `transportation`; meal recommendations and local dishes to try with estimated costs under `meals`; a `budget_summary` key with a breakdown of expenses (e.g., accommodations, meals, activities, and transportation) to ensure the trip stays within budget; and a `tips` key with practical advice for saving money and enhancing the travel experience. Ensure the JSON is well-structured, realistic, and actionable based on the given inputs." ; 
export const AI_PROMPT = 'Generate {preferences} Travel Plan from Pahang, Malaysia to {location} as a {muslim}, for {number_of_days} Days for {travel_companions} with a {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {number_of_days} days with each day plan with best time to visit in JSON format'; 
