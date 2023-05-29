import {apiEndpoint} from '../api'
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

interface BikeRide {
    id: Number; 
    departureTime: String;
    returnTime: String;
    departureStationId: Number;
    departureStationName: String;
    returnStationId: Number;
    returnStationName: String;
    coveredDistance: Number;
    duration: Number;
}

const BikeRides = () => {
    const [bikeRides, setBikeRides] = useState<BikeRide[]>([])


    useEffect(() => {
        apiEndpoint(ENDPOINTS.BikeRide)
          .fetch()
          .then((res) => {
            console.log(res.data)
            setBikeRides(res.data)
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
                    <TableCell>Departure Time</TableCell>
                    <TableCell>Return Time</TableCell>
                    <TableCell>Departure Station Name</TableCell>
                    <TableCell>Return Station Name</TableCell>
                    <TableCell align="right">Covered Distance</TableCell>
                    <TableCell align="right">Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bikeRides.map((bikeRide) => (
                    <TableRow
                      key={Number(bikeRide.id)}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {bikeRide.departureTime}
                      </TableCell>
                      <TableCell>{bikeRide.returnTime}</TableCell>
                      <TableCell>{bikeRide.departureStationName}</TableCell>
                      <TableCell>{bikeRide.returnStationName}</TableCell>
                      <TableCell align="right">{Number(bikeRide.coveredDistance)}</TableCell>
                      <TableCell align="right">{Number(bikeRide.duration)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Box>
          );
}

export default BikeRides