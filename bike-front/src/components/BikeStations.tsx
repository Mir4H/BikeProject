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
  Fade,
  Typography,
  Pagination,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  TableSortLabel
} from '@mui/material'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch'
      }
    }
  }
}))

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

const ScrollTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    )

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center'
      })
    }
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  )
}

const fetcher = (queryParams: string) =>
  apiEndpoint(`${ENDPOINTS.BikeStation + queryParams}`)
    .fetch()
    .then((res) => res.data)

const BikeStations = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('')
  const [orderByAsc, setOrderByAsc] = useState(1)
  const debouncedValue = useDebounce<string>(searchTerm, 500)
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const { isLoading, data, error } = useSWR<BikeStationData>(
    `?SearchTerm=${debouncedValue}&Page=${page}&OrderBy=${orderBy}&OrderByAsc=${orderByAsc}`,
    fetcher, { keepPreviousData: true }
  )

  const handleSorting = (sortby: string) => {
        setOrderBy(sortby)
        setOrderByAsc(orderByAsc === 1 ? 0 : 1)
  }

  console.log(data)

  if (error) return <h2> {error.message} </h2>
  
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
      <AppBar position="sticky" sx={{ maxWidth: 'xl' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            City Bike Stations
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by station name or address…"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
      {isLoading ? <h2> loading... </h2> :
      data && data.bikeStationList.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ maxWidth: 'xl' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead id="back-to-top-anchor">
                <TableRow>
                  <TableCell onClick={() => handleSorting('StationID')}><TableSortLabel direction={orderByAsc === 1 ? 'asc' : 'desc'}>Aseman numero</TableSortLabel></TableCell>
                  <TableCell onClick={() => handleSorting('FinnishName')}><TableSortLabel direction={orderByAsc === 1 ? 'asc' : 'desc'}>Nimi</TableSortLabel></TableCell>
                  <TableCell onClick={() => handleSorting('FinnishAddress')}><TableSortLabel direction={orderByAsc === 1 ? 'asc' : 'desc'}>Osoite</TableSortLabel></TableCell>
                  <TableCell align="right" onClick={() => handleSorting('Capacity')}><TableSortLabel direction={orderByAsc === 1 ? 'asc' : 'desc'}>Kapasiteetti</TableSortLabel></TableCell>
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
          <Pagination count={data.numberOfPages} page={page} onChange={handleChange} />
          <ScrollTop />
        </>
      ) : (
        <Box>
          <Typography>No data found</Typography>
        </Box>
      )}
    </Stack>
  )
}

export default BikeStations
