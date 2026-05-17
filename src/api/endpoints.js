import client from './client'

export async function predictConcert(artist, country) {
  const url = `/predict?artist=${encodeURIComponent(artist)}&country=${encodeURIComponent(country)}`
  console.log('URL de la petición:', url)
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
