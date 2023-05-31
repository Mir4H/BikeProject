import { apiEndpoint } from '../api'
import { secToMin, mToKm, dateToString } from '../helpers'
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
import useStateContext from '../hooks/useStateContex'

interface BikeRide {
  id: number
  departureTime: string
  returnTime: string
  departureStationId: number
  departureStationName: string
  returnStationId: number
  returnStationName: string
  coveredDistance: number
  duration: number
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
  const { context, setContext, resetContext } = useStateContext()

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (context !== undefined) {
      setContext({ ...context, ...{ ridesPage: value } })
    } else {
      resetContext()
    }
  }

  const handleSorting = (sortby: string) => {
    if (context !== undefined) {
      setContext({
        ...context,
        ...{ ridesOrderBy: sortby },
        ...{ ridesOrderByAsc: context.ridesOrderByAsc === 1 ? 0 : 1 }
      })
    } else {
      resetContext()
    }
  }
  const { isLoading, data, error } = useSWR<BikeRideData>(
    `?Page=${context ? context.ridesPage : ''}&OrderBy=${
      context ? context.ridesOrderBy : ''
    }&OrderByAsc=${context ? context.ridesOrderByAsc : ''}&date1=${
      context ? new Date(context.date1).toISOString() : ''
    }&date2=${context ? new Date(context.date2).toISOString() : ''}`,
    fetcher
  )

  if (error) return <h2>{error.message}</h2>
  if (isLoading || context === undefined) return <CircularProgress sx={{ color: '#deced1' }} />
  return (
    <>
      {data && data.bikeRideList.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ maxWidth: 'xl' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead id="back-to-top-anchor">
                <TableRow>
                  <TableCell id="lahtoaika" onClick={() => handleSorting('DepartureTime')}>
                    <TableSortLabel direction={context.ridesOrderByAsc === 1 ? 'asc' : 'desc'}>
                      Lähtöaika
                    </TableSortLabel>
                  </TableCell>
                  <TableCell id="loppuaika" onClick={() => handleSorting('ReturnTime')}>
                    <TableSortLabel direction={context.ridesOrderByAsc === 1 ? 'asc' : 'desc'}>
                      Loppuaika
                    </TableSortLabel>
                  </TableCell>
                  <TableCell id="lahtoasema" onClick={() => handleSorting('DepartureStationName')}>
                    <TableSortLabel direction={context.ridesOrderByAsc === 1 ? 'asc' : 'desc'}>
                      Lähtöasema
                    </TableSortLabel>
                  </TableCell>
                  <TableCell id="loppuasema" onClick={() => handleSorting('ReturnStationName')}>
                    <TableSortLabel direction={context.ridesOrderByAsc === 1 ? 'asc' : 'desc'}>
                      Loppuasema
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    id="matka"
                    align="right"
                    onClick={() => handleSorting('CoveredDistance')}
                  >
                    <TableSortLabel direction={context.ridesOrderByAsc === 1 ? 'asc' : 'desc'}>
                      Matka
                    </TableSortLabel>
                  </TableCell>
                  <TableCell id="aika" align="right" onClick={() => handleSorting('Duration')}>
                    <TableSortLabel direction={context.ridesOrderByAsc === 1 ? 'asc' : 'desc'}>
                      Aika
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.bikeRideList.map((bikeRide) => (
                  <TableRow
                    key={Number(bikeRide.id)}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell id="departureTime" component="th" scope="row">
                      {dateToString(bikeRide.departureTime)}
                    </TableCell>
                    <TableCell id="returnTime">{dateToString(bikeRide.returnTime)}</TableCell>
                    <TableCell id="departureStationName">{bikeRide.departureStationName}</TableCell>
                    <TableCell id="returnStationName">{bikeRide.returnStationName}</TableCell>
                    <TableCell id="coveredDistance" align="right">
                      {mToKm(Number(bikeRide.coveredDistance))}
                    </TableCell>
                    <TableCell id="duration" align="right">
                      {secToMin(Number(bikeRide.duration))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={data.numberOfPages}
            page={context.ridesPage}
            onChange={handlePageChange}
          />
          <ScrollTop />
        </>
      ) : (
        <h2>No data found</h2>
      )}
    </>
  )
}

export default BikeRides
