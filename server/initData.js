import mongoose from "mongoose";

// ✅ Two different owners
const owner1 = new mongoose.Types.ObjectId("6945742d81c7475cc9faf54e");
const owner2 = new mongoose.Types.ObjectId("694d15bb6df4469c82c3af32");

const houses = [
  {
    name: "Luxury Villa in Goa",
    images: {
      bedroom: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
      ],
      bathroom: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1"
      ],
      exterior: [
        "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1"
      ],
      other: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
      ]
    },
    description: "Luxury villa near Goa beach with private pool.",
    category: "Villa",
    owner: owner1,
    pricePerNight: 5500,
    location: "Goa, India",
    coordinates: { lat: 15.2993, long: 74.1240 },
    amenities: ["WiFi", "AC", "Swimming Pool", "Parking"],
    houseRules: "No smoking inside",
    maxGuests: 6,
    bedrooms: 3,
    baths: 3,
    availability: [
      { checkIn: new Date("2025-01-10"), checkOut: new Date("2025-01-15") }
    ]
  },

  {
    name: "Modern Apartment in Bangalore",
    images: {
      bedroom: [
        "https://images.unsplash.com/photo-1618219740975-d40978bb7378"
      ],
      bathroom: [
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556911220-bff31c812dba"
      ],
      exterior: [
        "https://images.unsplash.com/photo-1449844908441-8829872d2607"
      ],
      other: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36"
      ]
    },
    description: "Stylish apartment in Bangalore IT hub.",
    category: "Apartment",
    owner: owner2,
    pricePerNight: 2800,
    location: "Bangalore, India",
    coordinates: { lat: 12.9716, long: 77.5946 },
    amenities: ["WiFi", "Lift", "Security"],
    houseRules: "No loud music after 10 PM",
    maxGuests: 4,
    bedrooms: 2,
    baths: 2,
    availability: [
      { checkIn: new Date("2025-02-01"), checkOut: new Date("2025-02-05") }
    ]
  },

  {
    name: "Hill View Cottage in Manali",
    images: {
      bedroom: [
        "https://images.unsplash.com/photo-1505691723518-36a5ac3b2f8c"
      ],
      bathroom: [
        "https://images.unsplash.com/photo-1586798271654-0471bb1b0517"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7"
      ],
      exterior: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
      ],
      other: [
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
      ]
    },
    description: "Cozy wooden cottage with mountain views.",
    category: "Cottage",
    owner: owner1,
    pricePerNight: 3200,
    location: "Manali, India",
    coordinates: { lat: 32.2396, long: 77.1887 },
    amenities: ["Heater", "Bonfire", "Parking"],
    houseRules: "No parties",
    maxGuests: 5,
    bedrooms: 2,
    baths: 2,
    availability: [
      { checkIn: new Date("2025-03-10"), checkOut: new Date("2025-03-15") }
    ]
  },

  {
    name: "Beachside Home in Pondicherry",
    images: {
      bedroom: [
        "https://images.unsplash.com/photo-1615874959474-d609969a20ed"
      ],
      bathroom: [
        "https://images.unsplash.com/photo-1604709177225-055f99402ea3"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556909172-54557c7e4fb7"
      ],
      exterior: [
        "https://images.unsplash.com/photo-1505692794403-34cbbaecf9c6"
      ],
      other: [
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
      ]
    },
    description: "Peaceful home near the sea.",
    category: "Home",
    owner: owner2,
    pricePerNight: 3000,
    location: "Pondicherry, India",
    coordinates: { lat: 11.9416, long: 79.8083 },
    amenities: ["WiFi", "Sea View", "Balcony"],
    houseRules: "Pets not allowed",
    maxGuests: 4,
    bedrooms: 2,
    baths: 2,
    availability: [
      { checkIn: new Date("2025-04-05"), checkOut: new Date("2025-04-10") }
    ]
  },

  {
    name: "Heritage Haveli in Jaipur",
    images: {
      bedroom: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
      ],
      bathroom: [
        "https://images.unsplash.com/photo-1604709177583-7f6a7a0bb6de"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d"
      ],
      exterior: [
        "https://images.unsplash.com/photo-1548013146-72479768bada"
      ],
      other: [
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
      ]
    },
    description: "Royal heritage stay with traditional interiors.",
    category: "Heritage",
    owner: owner1,
    pricePerNight: 4500,
    location: "Jaipur, India",
    coordinates: { lat: 26.9124, long: 75.7873 },
    amenities: ["WiFi", "Breakfast", "Parking"],
    houseRules: "Handle heritage items carefully",
    maxGuests: 6,
    bedrooms: 3,
    baths: 3,
    availability: [
      { checkIn: new Date("2025-05-01"), checkOut: new Date("2025-05-06") }
    ]
  },

  {
    name: "Budget Room in Delhi",
    images: {
      bedroom: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36"
      ],
      bathroom: [
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556909212-6d3c7c1b7c9b"
      ],
      exterior: [
        "https://images.unsplash.com/photo-1449844908441-8829872d2607"
      ],
      other: []
    },
    description: "Affordable stay near metro station.",
    category: "Room",
    owner: owner2,
    pricePerNight: 1200,
    location: "Delhi, India",
    coordinates: { lat: 28.7041, long: 77.1025 },
    amenities: ["WiFi", "Fan"],
    houseRules: "No visitors allowed",
    maxGuests: 2,
    bedrooms: 1,
    baths: 1,
    availability: [
      { checkIn: new Date("2025-06-01"), checkOut: new Date("2025-06-10") }
    ]
  },

  {
    name: "Lake View Villa in Udaipur",
    images: {
      bedroom: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0"
      ],
      bathroom: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1"
      ],
      exterior: [
        "https://images.unsplash.com/photo-1548013146-72479768bada"
      ],
      other: [
        "https://images.unsplash.com/photo-1505692794403-34cbbaecf9c6"
      ]
    },
    description: "Premium villa overlooking the lake.",
    category: "Villa",
    owner: owner1,
    pricePerNight: 6000,
    location: "Udaipur, India",
    coordinates: { lat: 24.5854, long: 73.7125 },
    amenities: ["WiFi", "Lake View", "AC", "Parking"],
    houseRules: "No smoking",
    maxGuests: 8,
    bedrooms: 4,
    baths: 4,
    availability: [
      { checkIn: new Date("2025-07-01"), checkOut: new Date("2025-07-07") }
    ]
  }
];

export default houses;
