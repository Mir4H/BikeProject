import { apiEndpoint } from '../api'
import { useEffect, useState } from 'react'
import { ENDPOINTS } from '../api'
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  Box
} from '@mui/material'
import React from 'react'

interface BikeStation {
  stationID: Number
  finnishName: String
  swedishName: String
  englishName: String
  finnishAddress: String
  swedishAddress: String
  finnishCity: String
  swedishCity: String
  operator: String
  capacity: Number
  locationX: Number
  locationY: Number
}

const BikeStations = () => {
  const [bikeStations, setBikeStations] = useState<BikeStation[]>([])

  useEffect(() => {
    apiEndpoint(ENDPOINTS.BikeStation)
      .fetch()
      .then((res) => {
        console.log(res.data)
        setBikeStations(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <TableContainer sx={{ maxWidth: 'xl' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Aseman numero</TableCell>
              <TableCell>Nimi</TableCell>
              <TableCell>Osoite</TableCell>
              <TableCell align="right">Kapasiteetti</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bikeStations.map((bikeStation) => (
              <TableRow
                key={Number(bikeStation.stationID)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {bikeStation.stationID.toString()}
                </TableCell>
                <TableCell>{bikeStation.finnishName}</TableCell>
                <TableCell>{bikeStation.finnishAddress}</TableCell>
                <TableCell align="right">{Number(bikeStation.capacity)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default BikeStations
