import { useState, useEffect } from 'react'
import { predictConcert, fetchArtists, fetchCountries } from '../api/endpoints'
import GlassCard from '../components/GlassCard'
import CustomSelect from '../components/CustomSelect'
import SelectionOverlay from '../components/SelectionOverlay'
import ResultCard from '../components/ResultCard'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import './PredictionPage.css'

function getErrorMessage(error) {
  const status = error.response?.status
  if (status === 404) return 'No encontramos suficientes datos para este artista.'
  if (status === 422) return 'Verifica que el nombre del artista y el país sean correctos.'
  return 'Ha ocurrido un error inesperado. Inténtalo de nuevo.'
}

function PredictionPage() {
  const [artist, setArtist] = useState('')
  const [country, setCountry] = useState('')
  const [overlayOpen, setOverlayOpen] = useState(null)
  const [pageStatus, setPageStatus] = useState('idle')
  const [result, setResult] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [artists, setArtists] = useState([])
  const [countries, setCountries] = useState([])
  const [catalogLoading, setCatalogLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchArtists(), fetchCountries()])
      .then(([artistsData, countriesData]) => {
        console.log('Artistas recibidos:', artistsData)
        console.log('Países recibidos:', countriesData)
        setArtists(artistsData)
        setCountries(countriesData)
      })
      .catch((error) => {
        console.error('Error al cargar catálogo:', error)
      })
      .finally(() => setCatalogLoading(false))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setResult('')
    setErrorMsg('')
    setPageStatus('loading')
    console.log('--- Enviando predicción ---')
    console.log('artist (tipo):', typeof artist, '| valor:', JSON.stringify(artist))
    console.log('country (tipo):', typeof country, '| valor:', JSON.stringify(country))
    try {
      const prediction = await predictConcert(artist, country)
      setResult(prediction)
      setPageStatus('success')
    } catch (error) {
      console.error('Error 422 detalle completo:', error.response?.data)
      setErrorMsg(getErrorMessage(error))
      setPageStatus('error')
    }
  }

  function handleSelect(value) {
    if (overlayOpen === 'artist') setArtist(value)
    else setCountry(value)
    setOverlayOpen(null)
  }

  const isLoading = pageStatus === 'loading'
  const overlayConfig = overlayOpen === 'artist'
    ? { title: 'Selecciona un Artista', options: artists, value: artist, placeholder: 'Buscar artista...' }
    : { title: 'Selecciona un País', options: countries, value: country, placeholder: 'Buscar país...' }

  return (
    <>
      <GlassCard>
        <h2 className="card-title">Concert Return Predictor</h2>

        <form onSubmit={handleSubmit}>
          <CustomSelect
            label="Artista (Punk Rock / Emo)"
            value={artist}
            placeholder={catalogLoading ? 'Cargando artistas...' : 'Selecciona un artista'}
            onClick={() => setOverlayOpen('artist')}
            disabled={isLoading || catalogLoading}
          />
          <CustomSelect
            label="País (Europa)"
            value={country}
            placeholder={catalogLoading ? 'Cargando países...' : 'Selecciona un país'}
            onClick={() => setOverlayOpen('country')}
            disabled={isLoading || catalogLoading}
          />
          <button
            className="submit-btn"
            type="submit"
            disabled={isLoading || !artist || !country}
          >
            {isLoading ? <><Spinner /> Calculando...</> : 'Predecir'}
          </button>
        </form>

        {pageStatus === 'success' && <ResultCard result={result} />}
        {pageStatus === 'error' && <ErrorMessage message={errorMsg} />}
      </GlassCard>

      {overlayOpen && (
        <SelectionOverlay
          title={overlayConfig.title}
          options={overlayConfig.options}
          selectedValue={overlayConfig.value}
          searchPlaceholder={overlayConfig.placeholder}
          onSelect={handleSelect}
          onClose={() => setOverlayOpen(null)}
        />
      )}
    </>
  )
}

export default PredictionPage
