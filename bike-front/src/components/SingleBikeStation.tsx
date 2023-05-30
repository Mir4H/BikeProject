import { apiEndpoint } from '../api'
import { useState } from 'react'
import {secToMin, mToKm} from '../helpers'
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from '../api'
import useSWR from 'swr'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Stack,
  Paper,
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress
} from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Map, Marker } from 'pigeon-maps'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface BikeStation {
  stationID: number
  finnishName: string
  swedishName: string
  englishName: string
  finnishAddress: string
  swedishAddress: string
  finnishCity: string
  swedishCity: string
  operator: string
  capacity: number
  locationX: number
  locationY: number
  totalDepartures: number
  totalReturns: number
  avgDistanceDep: number
  avgDistanceReturn: number
  avgDurationDep: number
  avgDurationReturn: number
}

interface Statistics {
  stationName: string
  stationId: number
}

interface BikeStationValues {
  bikeStationValues: BikeStation
  popularDeparture: Array<Statistics>
  popularReturn: Array<Statistics>
}

interface MapProps {
  lon: number
  lat: number
}

const MyMap = (props: MapProps) => {
  return (
    <Map height={300} defaultCenter={[props.lat, props.lon]} defaultZoom={14}>
      <Marker width={50} anchor={[props.lat, props.lon]} />
    </Map>
  )
}

const fetcher = (queryParams: string) =>
  apiEndpoint(`${ENDPOINTS.BikeStation + queryParams}`)
    .fetch()
    .then((res) => res.data)

const SingleBikeStation = () => {
  const [month, setMonth] = useState<string>('')
  const { id } = useParams()
  const navigate = useNavigate();
  const { isLoading, data, error } = useSWR<BikeStationValues>(`/${id}?Month=${month}`, fetcher, {
    keepPreviousData: true
  })

  const handleFiltering = (event: SelectChangeEvent) => {
    console.log(event.target.value)
    setMonth(event.target.value)
  }
  if (error) return <h2>{error.message}</h2>
  if (isLoading) return <CircularProgress sx={{color: '#deced1'}}/>
  return data ? (
    <Container component={Paper} sx={{ maxWidth: 'xl' }}>
        <Typography sx={{ mt: 5, mx: 5 }} variant="h3">
          {data.bikeStationValues.finnishName}
        </Typography>
        <Typography sx={{ mx: 5 }} variant="h6">
          {data.bikeStationValues.swedishName}
        </Typography>
        {data.bikeStationValues.finnishName === data.bikeStationValues.englishName ? null : (
          <Typography sx={{ mx: 5 }} variant="h6">
            {data?.bikeStationValues.englishName}
          </Typography>
        )}
        <Box sx={{ mt: 3 }}>
          <MyMap
            lon={data.bikeStationValues.locationX}
            lat={data.bikeStationValues.locationY}
          ></MyMap>
        </Box>
        <Box sx={{ mt: 3, mx: 5 }}>
          <Typography>
            {data.bikeStationValues.finnishAddress} {data.bikeStationValues.finnishCity}
          </Typography>
          <Typography>
            {data.bikeStationValues.swedishAddress} {data.bikeStationValues.swedishCity}
          </Typography>
        </Box>

        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
        ><Grid item xs={12} sm={6}>
          <Typography sx={{ mx: 5, my: 2, minWidth: 200 }} variant="h6">
            Aseman statistiikka
          </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel sx={{ mx: 5, mb: 2 }} id="select-month">
              Kuukausiarvot
            </InputLabel>
            <Select
              sx={{ maxWidth: 200, height: 55, mx: 5, mb: 2 }}
              labelId="select-month"
              id="month-select"
              value={month}
              label="Filter by Month"
              onChange={handleFiltering}
            >
              <MenuItem value={'5'}>Toukokuu</MenuItem>
              <MenuItem value={'6'}>Kesäkuu</MenuItem>
              <MenuItem value={'7'}>Heinäkuu</MenuItem>
              <MenuItem value={''}>Kaikki</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ mx: 5 }}>
              Lähdöt: {data.bikeStationValues.totalDepartures}
            </Typography>
            <Typography sx={{ mx: 5, mt: 3 }}>Lähtöjen keskimääräinen matkapituus: {mToKm(data.bikeStationValues.avgDistanceDep)}</Typography>
            <Typography sx={{ mx: 5, mt: 3 }}>Lähtöjen keskimääräinen matka-aika: {secToMin(data.bikeStationValues.avgDurationDep)}</Typography>
            <Typography sx={{ mx: 5, my: 3 }}>Popular return stations: </Typography>
            <Stack direction='column'>
            {data?.popularReturn.map((station, index) => (
              <Button onClick={() => navigate(`/stations/${station.stationId}`)} variant="outlined" sx={{ ml: 5, mb: 1, maxWidth: 350 }} key={station.stationId}>{station.stationName}</Button>
        ))}
        </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
          
            <Typography sx={{ mx: 5 }}>
              Palautukset: {data.bikeStationValues.totalReturns}
            </Typography>
            <Typography sx={{ mx: 5, mt: 3 }}>Palautusten keskimääräinen matkapituus: {mToKm(data.bikeStationValues.avgDistanceReturn)}</Typography>
            <Typography sx={{ mx: 5, mt: 3 }}>Palautusten keskimääräinen matka-aika: {secToMin(data.bikeStationValues.avgDurationReturn)}</Typography>
            <Typography sx={{ mx: 5, my: 3}}>Popular departure stations: </Typography>
            <Stack direction='column'>
            {data?.popularDeparture.map((station, index) => (
          <Button onClick={() => navigate(`/stations/${station.stationId}`)} variant="outlined" sx={{ ml: 5, mb: 1, maxWidth: 350 }} key={station.stationId}>{station.stationName}</Button>
        ))}</Stack>
          </Grid>
        </Grid>

        
        </Container>

  ) : (
    <Typography>No data found</Typography>
  )
}

export default SingleBikeStation
