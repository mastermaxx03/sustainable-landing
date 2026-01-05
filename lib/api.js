import { COUNTRY_DATA, SUPPLY_CHAIN_ROUTES, FACTORY_LOCATIONS } from './data'

export async function fetchEmissionData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalEmissions = Object.values(COUNTRY_DATA).reduce(
        (sum, country) => sum + country.emissions,
        0
      )

      resolve({
        countries: COUNTRY_DATA,
        routes: SUPPLY_CHAIN_ROUTES,
        factories: FACTORY_LOCATIONS,
        totalEmissions,
        lastUpdated: new Date().toISOString()
      })
    }, 1500) // Simulate network delay
  })
}

export async function fetchCountryDetails(countryCode) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(COUNTRY_DATA[countryCode])
    }, 500)
  })
}
