import { apiEndpoint } from '../api'
import { useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import { useNavigate } from "react-router-dom";
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
  Box,
  Typography,
  Pagination,
  CircularProgress,
  TableSortLabel
} from '@mui/material'
import * as React from 'react'
import { ScrollTop } from './ScrollToTop'
import useStateContext from '../hooks/useStateContex'

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

interface BikeStationData {
  bikeStationList: Array<BikeStation>
  numberOfPages: number
}

const fetcher = (queryParams: string) =>
  apiEndpoint(`${ENDPOINTS.BikeStation + queryParams}`)
    .fetch()
    .then((res) => res.data)

const BikeStations = () => {
  const { context, setContext, resetContext } = useStateContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('')
  const [orderByAsc, setOrderByAsc] = useState(1)
  const debouncedValue = useDebounce<string>(searchTerm, 500)
  const navigate = useNavigate();
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (context !== undefined) {
      setContext({ ...context, ...{ stationsPage: value } })
    } else {
      resetContext()
    }
  }
  const { isLoading, data, error } = useSWR<BikeStationData>(
    `?SearchTerm=${context ? context.searchTerm : ''}
    &Page=${context ? context.stationsPage : ''}
    &OrderBy=${context ? context.stationsOrderBy : ''}
    &OrderByAsc=${context ? context.stationsOrderByAsc : ''}`,
    fetcher
  )

  const handleSorting = (sortby: string) => {
    if (context !== undefined) {
      setContext({
        ...context,
        ...{ stationsOrderBy: sortby },
        ...{ stationsOrderByAsc: context.stationsOrderByAsc === 1 ? 0 : 1 }
      })
    } else {
      resetContext()
    }
  }

  if (error) return <h2>{error.message}</h2>
  if (isLoading || context === undefined) return <CircularProgress sx={{color: '#deced1'}}/>
  return (
    <>
      {data && data.bikeStationList.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ maxWidth: 'xl' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead id="back-to-top-anchor">
                <TableRow>
                  <TableCell onClick={() => handleSorting('StationID')}><TableSortLabel direction={context.stationsOrderByAsc === 1 ? 'asc' : 'desc'}>Aseman numero</TableSortLabel></TableCell>
                  <TableCell onClick={() => handleSorting('FinnishName')}><TableSortLabel direction={context.stationsOrderByAsc === 1 ? 'asc' : 'desc'}>Nimi</TableSortLabel></TableCell>
                  <TableCell onClick={() => handleSorting('FinnishAddress')}><TableSortLabel direction={context.stationsOrderByAsc === 1 ? 'asc' : 'desc'}>Osoite</TableSortLabel></TableCell>
                  <TableCell align="right" onClick={() => handleSorting('Capacity')}><TableSortLabel direction={context.stationsOrderByAsc === 1 ? 'asc' : 'desc'}>Kapasiteetti</TableSortLabel></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.bikeStationList?.map((bikeStation) => (
                  <TableRow
                    hover
                    key={Number(bikeStation.stationID)}
                    sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => navigate(`/stations/${bikeStation.stationID}`)}
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
          <Pagination count={data.numberOfPages} page={context.stationsPage} onChange={handlePageChange} />
          <ScrollTop />
        </>
      ) : (
        <Box>
          <Typography>No data found</Typography>
        </Box>
      )}
    </>
  )
}

export default BikeStations
