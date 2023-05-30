import {apiEndpoint} from '../api'
import { useState } from 'react'
import {secToMin, mToKm, dateToString} from '../helpers'
import { ENDPOINTS } from '../api'
import useSWR from 'swr'
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper,
    CircularProgress,
    TableSortLabel,
    Pagination
  } from '@mui/material'
import { ScrollTop } from './ScrollToTop'

interface BikeRide {
    id: number; 
    departureTime: string;
    returnTime: string;
    departureStationId: number;
    departureStationName: string;
    returnStationId: number;
    returnStationName: string;
    coveredDistance: number;
    duration: number;
}

interface BikeRideData {
    bikeRideList: Array<BikeRide>
    numberOfPages: number
  }

const fetcher = (queryParams: string) =>
  apiEndpoint(`${ENDPOINTS.BikeRide + queryParams}`)
    .fetch()
    .then((res) => res.data)

const BikeRides = () => {
    const [page, setPage] = useState(1)
    const [orderBy, setOrderBy] = useState('')
    const [orderByAsc, setOrderByAsc] = useState(1)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
      }

    const handleSorting = (sortby: string) => {
        setOrderBy(sortby)
        setOrderByAsc(orderByAsc === 1 ? 0 : 1)
  }
    const { isLoading, data, error } = useSWR<BikeRideData>(
        `?Page=${page}&OrderBy=${orderBy}&OrderByAsc=${orderByAsc}&date1=&date2=`,
        fetcher
      )

    if (error) return <h2>{error.message}</h2>
    if (isLoading) return <CircularProgress sx={{color: '#deced1'}}/>
    return (
        <>
            {data && data.bikeRideList.length > 0 ? (
            <>
            <TableContainer component={Paper} sx={{ maxWidth: 'xl' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleSorting('StationID')}><TableSortLabel direction={orderByAsc === 1 ? 'asc' : 'desc'}>Lähtöaika</TableSortLabel></TableCell>
                    <TableCell onClick={() => handleSorting('FinnishName')}><TableSortLabel direction={orderByAsc === 1 ? 'asc' : 'desc'}>Loppuaika</TableSortLabel></TableCell>
                    <TableCell onClick={() => handleSorting('FinnishAddress')}><TableSortLabel direction={orderByAsc === 1 ? 'asc' : 'desc'}>Lähtöasema</TableSortLabel></TableCell>
                    <TableCell onClick={() => handleSorting('Capacity')}><TableSortLabel direction={orderByAsc === 1 ? 'asc' : 'desc'}>Loppuasema</TableSortLabel></TableCell>
                    <TableCell align="right" onClick={() => handleSorting('FinnishAddress')}><TableSortLabel direction={orderByAsc === 1 ? 'asc' : 'desc'}>Matka</TableSortLabel></TableCell>
                    <TableCell align="right" onClick={() => handleSorting('Capacity')}><TableSortLabel direction={orderByAsc === 1 ? 'asc' : 'desc'}>Aika</TableSortLabel></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {data.bikeRideList.map((bikeRide) => (
                    <TableRow
                      key={Number(bikeRide.id)}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {dateToString(bikeRide.departureTime)}
                      </TableCell>
                      <TableCell>{dateToString(bikeRide.returnTime)}</TableCell>
                      <TableCell>{bikeRide.departureStationName}</TableCell>
                      <TableCell>{bikeRide.returnStationName}</TableCell>
                      <TableCell align="right">{mToKm(Number(bikeRide.coveredDistance))}</TableCell>
                      <TableCell align="right">{secToMin(Number(bikeRide.duration))}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination count={data.numberOfPages} page={page} onChange={handleChange} />
          <ScrollTop />
            </>
            ) : <h2>loading</h2>}
            </>
          );
}

export default BikeRides