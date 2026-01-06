export const COUNTRY_DATA = {
  IN: {
    name: "India",
    code: "IN",
    coordinates: [78.9629, 20.5937], // [lon, lat]
    emissions: 2300000, // tons CO₂/year
    factories: 890,
    gridIntensity: 708, // gCO₂/kWh
    materials: { cotton: 60, polyester: 30, other: 10 },
    exports: ["USA", "EU", "UK", "Australia"]
  },
  BD: {
    name: "Bangladesh",
    code: "BD",
    coordinates: [90.3563, 23.6850],
    emissions: 1100000,
    factories: 450,
    gridIntensity: 580,
    materials: { cotton: 85, other: 15 },
    exports: ["USA", "EU", "Canada"]
  },
  CN: {
    name: "China",
    code: "CN",
    coordinates: [104.1954, 35.8617],
    emissions: 3800000,
    factories: 1200,
    gridIntensity: 640,
    materials: { polyester: 65, cotton: 25, other: 10 },
    exports: ["Global"]
  },
  VN: {
    name: "Vietnam",
    code: "VN",
    coordinates: [108.2772, 14.0583],
    emissions: 890000,
    factories: 320,
    gridIntensity: 490,
    materials: { cotton: 70, other: 30 },
    exports: ["USA", "EU", "Japan"]
  },
  US: {
    name: "United States",
    code: "US",
    coordinates: [-95.7129, 37.0902],
    emissions: 450000,
    factories: 180,
    gridIntensity: 385,
    materials: { cotton: 40, polyester: 35, other: 25 },
    exports: ["Canada", "Mexico"]
  },
  EU: {
    name: "European Union",
    code: "EU",
    coordinates: [10.4515, 51.1657],
    emissions: 320000,
    factories: 95,
    gridIntensity: 275,
    materials: { cotton: 45, polyester: 30, other: 25 },
    exports: ["USA", "UK"]
  },
  JP: {
    name: "Japan",
    code: "JP",
    coordinates: [138.2529, 36.2048],
    emissions: 280000,
    factories: 85,
    gridIntensity: 480,
    materials: { polyester: 50, cotton: 35, other: 15 },
    exports: ["USA", "China"]
  },
  AU: {
    name: "Australia",
    code: "AU",
    coordinates: [133.7751, -25.2744],
    emissions: 180000,
    factories: 42,
    gridIntensity: 620,
    materials: { cotton: 55, polyester: 30, other: 15 },
    exports: ["USA", "Japan"]
  },
  CA: {
    name: "Canada",
    code: "CA",
    coordinates: [-106.3468, 56.1304],
    emissions: 195000,
    factories: 58,
    gridIntensity: 130,
    materials: { cotton: 42, polyester: 38, other: 20 },
    exports: ["USA"]
  }
}

export const SUPPLY_CHAIN_ROUTES = [
  {
    id: "india_usa",
    from: "IN",
    to: "US",
    steps: [
      { location: "Gujarat, India", type: "farm", emissions: 120, duration: "3 months" },
      { location: "Mumbai, India", type: "mill", emissions: 450, duration: "2 weeks", distance: 1200 },
      { location: "Mumbai Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 82.5, distance: 13500, duration: "30 days" },
      { location: "Los Angeles Port", type: "port", emissions: 0 },
      { location: "Los Angeles Factory", type: "factory", emissions: 380, duration: "1 week" },
      { location: "New York Retail", type: "retail", emissions: 45, distance: 4500 }
    ],
    totalEmissions: 2450, // per 1,000 units
    unitsPerYear: 50000
  },
  {
    id: "bangladesh_eu",
    from: "BD",
    to: "EU",
    steps: [
      { location: "Dhaka, Bangladesh", type: "farm", emissions: 95, duration: "3 months" },
      { location: "Chittagong Mill", type: "mill", emissions: 320, duration: "2 weeks" },
      { location: "Chittagong Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 68, distance: 8200, duration: "25 days" },
      { location: "Hamburg Port", type: "port", emissions: 0 },
      { location: "Germany Distribution", type: "retail", emissions: 52, distance: 300 }
    ],
    totalEmissions: 1890,
    unitsPerYear: 35000
  },
  {
    id: "china_usa_air",
    from: "CN",
    to: "US",
    steps: [
      { location: "Guangzhou, China", type: "mill", emissions: 580, duration: "1 week" },
      { location: "Guangzhou Airport", type: "port", emissions: 0 },
      { location: "Air Freight", type: "transport", emissions: 6020, distance: 11000, duration: "2 days" },
      { location: "LAX Airport", type: "port", emissions: 0 },
      { location: "California Retail", type: "retail", emissions: 20, distance: 50 }
    ],
    totalEmissions: 6620, // Much higher due to air freight
    unitsPerYear: 10000
  },
  {
    id: "vietnam_usa",
    from: "VN",
    to: "US",
    steps: [
      { location: "Hanoi, Vietnam", type: "farm", emissions: 80, duration: "3 months" },
      { location: "Ho Chi Minh Mill", type: "mill", emissions: 290, duration: "2 weeks" },
      { location: "Ho Chi Minh Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 75, distance: 12500, duration: "28 days" },
      { location: "Seattle Port", type: "port", emissions: 0 },
      { location: "Seattle Distribution", type: "retail", emissions: 38, distance: 200 }
    ],
    totalEmissions: 1670,
    unitsPerYear: 28000
  },
  {
    id: "india_eu",
    from: "IN",
    to: "EU",
    steps: [
      { location: "Delhi, India", type: "farm", emissions: 110, duration: "3 months" },
      { location: "Mumbai Mill", type: "mill", emissions: 420, duration: "2 weeks" },
      { location: "Mumbai Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 72, distance: 9500, duration: "26 days" },
      { location: "Hamburg Port", type: "port", emissions: 0 },
      { location: "Germany Distribution", type: "retail", emissions: 48, distance: 280 }
    ],
    totalEmissions: 1850,
    unitsPerYear: 42000
  },
  {
    id: "bangladesh_us",
    from: "BD",
    to: "US",
    steps: [
      { location: "Dhaka, Bangladesh", type: "farm", emissions: 88, duration: "3 months" },
      { location: "Chittagong Mill", type: "mill", emissions: 305, duration: "2 weeks" },
      { location: "Chittagong Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 85, distance: 14200, duration: "32 days" },
      { location: "New York Port", type: "port", emissions: 0 },
      { location: "New York Distribution", type: "retail", emissions: 42, distance: 150 }
    ],
    totalEmissions: 1720,
    unitsPerYear: 38000
  },
  {
    id: "china_eu",
    from: "CN",
    to: "EU",
    steps: [
      { location: "Shanghai, China", type: "mill", emissions: 520, duration: "1 week" },
      { location: "Shanghai Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 95, distance: 16000, duration: "35 days" },
      { location: "Rotterdam Port", type: "port", emissions: 0 },
      { location: "Netherlands Distribution", type: "retail", emissions: 55, distance: 380 }
    ],
    totalEmissions: 2140,
    unitsPerYear: 55000
  },
  {
    id: "vietnam_eu",
    from: "VN",
    to: "EU",
    steps: [
      { location: "Hanoi, Vietnam", type: "farm", emissions: 75, duration: "3 months" },
      { location: "Ho Chi Minh Mill", type: "mill", emissions: 280, duration: "2 weeks" },
      { location: "Ho Chi Minh Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 78, distance: 13000, duration: "30 days" },
      { location: "Rotterdam Port", type: "port", emissions: 0 },
      { location: "Amsterdam Distribution", type: "retail", emissions: 45, distance: 250 }
    ],
    totalEmissions: 1530,
    unitsPerYear: 32000
  },
  {
    id: "china_cn_domestic",
    from: "CN",
    to: "CN",
    steps: [
      { location: "Chengdu, China", type: "mill", emissions: 480, duration: "1 week" },
      { location: "Rail Freight", type: "transport", emissions: 25, distance: 1800, duration: "3 days" },
      { location: "Shanghai Distribution", type: "retail", emissions: 18, distance: 50 }
    ],
    totalEmissions: 523,
    unitsPerYear: 85000
  },
  {
    id: "india_in_domestic",
    from: "IN",
    to: "IN",
    steps: [
      { location: "Ahmedabad, India", type: "mill", emissions: 410, duration: "1 week" },
      { location: "Truck Freight", type: "transport", emissions: 32, distance: 1200, duration: "2 days" },
      { location: "Delhi Distribution", type: "retail", emissions: 22, distance: 80 }
    ],
    totalEmissions: 464,
    unitsPerYear: 95000
  },
  {
    id: "us_us_domestic",
    from: "US",
    to: "US",
    steps: [
      { location: "Los Angeles Factory", type: "factory", emissions: 320, duration: "1 week" },
      { location: "Truck Freight", type: "transport", emissions: 58, distance: 4500, duration: "5 days" },
      { location: "New York Distribution", type: "retail", emissions: 28, distance: 100 }
    ],
    totalEmissions: 406,
    unitsPerYear: 22000
  },
  {
    id: "china_japan",
    from: "CN",
    to: "JP",
    steps: [
      { location: "Shanghai, China", type: "mill", emissions: 510, duration: "1 week" },
      { location: "Shanghai Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 18, distance: 1800, duration: "3 days" },
      { location: "Tokyo Port", type: "port", emissions: 0 },
      { location: "Tokyo Distribution", type: "retail", emissions: 32, distance: 120 }
    ],
    totalEmissions: 560,
    unitsPerYear: 48000
  },
  {
    id: "india_australia",
    from: "IN",
    to: "AU",
    steps: [
      { location: "Bangalore, India", type: "farm", emissions: 102, duration: "3 months" },
      { location: "Chennai Mill", type: "mill", emissions: 395, duration: "2 weeks" },
      { location: "Chennai Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 62, distance: 10200, duration: "22 days" },
      { location: "Sydney Port", type: "port", emissions: 0 },
      { location: "Sydney Distribution", type: "retail", emissions: 38, distance: 180 }
    ],
    totalEmissions: 1597,
    unitsPerYear: 25000
  },
  {
    id: "vietnam_japan",
    from: "VN",
    to: "JP",
    steps: [
      { location: "Ho Chi Minh, Vietnam", type: "farm", emissions: 72, duration: "3 months" },
      { location: "Ho Chi Minh Mill", type: "mill", emissions: 275, duration: "2 weeks" },
      { location: "Ho Chi Minh Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 22, distance: 2800, duration: "5 days" },
      { location: "Osaka Port", type: "port", emissions: 0 },
      { location: "Osaka Distribution", type: "retail", emissions: 28, distance: 95 }
    ],
    totalEmissions: 397,
    unitsPerYear: 41000
  },
  {
    id: "bangladesh_canada",
    from: "BD",
    to: "CA",
    steps: [
      { location: "Dhaka, Bangladesh", type: "farm", emissions: 90, duration: "3 months" },
      { location: "Chittagong Mill", type: "mill", emissions: 312, duration: "2 weeks" },
      { location: "Chittagong Port", type: "port", emissions: 0 },
      { location: "Sea Freight", type: "transport", emissions: 88, distance: 14800, duration: "33 days" },
      { location: "Vancouver Port", type: "port", emissions: 0 },
      { location: "Toronto Distribution", type: "retail", emissions: 52, distance: 4400 }
    ],
    totalEmissions: 1842,
    unitsPerYear: 29000
  }
]

export const FACTORY_LOCATIONS = {
  IN: [
    { lat: 19.0760, lon: 72.8777, city: "Mumbai", count: 230, emissions: 520000 },
    { lat: 28.7041, lon: 77.1025, city: "Delhi", count: 180, emissions: 410000 },
    { lat: 12.9716, lon: 77.5946, city: "Bangalore", count: 150, emissions: 340000 },
    { lat: 23.0225, lon: 72.5714, city: "Ahmedabad", count: 120, emissions: 280000 },
    { lat: 22.5726, lon: 88.3639, city: "Kolkata", count: 95, emissions: 215000 },
    { lat: 17.3850, lon: 78.4867, city: "Hyderabad", count: 75, emissions: 170000 },
    { lat: 13.0827, lon: 80.2707, city: "Chennai", count: 50, emissions: 113000 }
  ],
  BD: [
    { lat: 23.8103, lon: 90.4125, city: "Dhaka", count: 320, emissions: 704000 },
    { lat: 22.3569, lon: 91.7832, city: "Chittagong", count: 130, emissions: 286000 }
  ],
  CN: [
    { lat: 23.1291, lon: 113.2644, city: "Guangzhou", count: 280, emissions: 1064000 },
    { lat: 31.2304, lon: 121.4737, city: "Shanghai", count: 250, emissions: 950000 },
    { lat: 30.5728, lon: 104.0668, city: "Chengdu", count: 190, emissions: 722000 },
    { lat: 22.5431, lon: 114.0579, city: "Shenzhen", count: 180, emissions: 684000 },
    { lat: 39.9042, lon: 116.4074, city: "Beijing", count: 150, emissions: 570000 },
    { lat: 34.2658, lon: 108.9541, city: "Xi'an", count: 150, emissions: 570000 }
  ],
  VN: [
    { lat: 21.0285, lon: 105.8542, city: "Hanoi", count: 140, emissions: 308000 },
    { lat: 10.8231, lon: 106.6297, city: "Ho Chi Minh", count: 180, emissions: 396000 }
  ],
  US: [
    { lat: 34.0522, lon: -118.2437, city: "Los Angeles", count: 45, emissions: 99000 },
    { lat: 40.7128, lon: -74.0060, city: "New York", count: 38, emissions: 83600 },
    { lat: 33.4484, lon: -112.0740, city: "Phoenix", count: 22, emissions: 48400 }
  ],
  EU: [
    { lat: 52.5200, lon: 13.4050, city: "Berlin", count: 28, emissions: 61600 },
    { lat: 48.1351, lon: 11.5820, city: "Munich", count: 25, emissions: 55000 },
    { lat: 51.5074, lon: -0.1278, city: "London", count: 32, emissions: 70400 },
    { lat: 53.4808, lon: -2.2426, city: "Manchester", count: 18, emissions: 39600 }
  ],
  JP: [
    { lat: 35.6762, lon: 139.6503, city: "Tokyo", count: 38, emissions: 83600 },
    { lat: 34.6937, lon: 135.5023, city: "Osaka", count: 30, emissions: 66000 },
    { lat: 35.0116, lon: 135.7681, city: "Kyoto", count: 17, emissions: 37400 }
  ],
  AU: [
    { lat: -33.8688, lon: 151.2093, city: "Sydney", count: 22, emissions: 48400 },
    { lat: -37.8136, lon: 144.9631, city: "Melbourne", count: 20, emissions: 44000 }
  ],
  CA: [
    { lat: 43.6532, lon: -79.3832, city: "Toronto", count: 28, emissions: 61600 },
    { lat: 49.2827, lon: -123.1207, city: "Vancouver", count: 18, emissions: 39600 },
    { lat: 45.5017, lon: -73.5673, city: "Montreal", count: 12, emissions: 26400 }
  ]
}
