import BikeRides from './components/BikeRides'
import BikeStations from './components/BikeStations'
import SingleBikeStation from './components/SingleBikeStation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BikeRides />} />
        <Route path="/stations" element={<BikeStations />} />
        <Route path="/stations/:id" element={<SingleBikeStation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
