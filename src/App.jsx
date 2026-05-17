import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PredictionPage from './pages/PredictionPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PredictionPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
