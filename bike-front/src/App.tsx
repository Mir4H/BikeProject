import BikeRides from './components/BikeRides'
import BikeStations from './components/BikeStations'
import SingleBikeStation from './components/SingleBikeStation'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<BikeRides />} />
          <Route path="/stations" element={<BikeStations />} />
          <Route path="/stations/:id" element={<SingleBikeStation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
