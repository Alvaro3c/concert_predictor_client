import client from './client'

export async function predictConcert(artist, country) {
  const response = await client.get('/predict', {
    params: { artist, country },
  })
  return response.data
}

export async function fetchArtists() {
  const response = await client.get('/catalog/artists')
  return response.data
}

export async function fetchCountries() {
  const response = await client.get('/catalog/countries')
  return response.data
}
