import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import {
  Typography,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  CircularProgress
} from '@mui/material'
import useDebounce from '../hooks/useDebounce'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import * as React from 'react'
import locale from 'date-fns/locale/fi'
import useStateContext from '../hooks/useStateContex'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.3),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.4)
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
  justifyContent: 'center',
  color: '#383636'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    color: '#383636',
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

const Layout = () => {
  const { context, setContext, resetContext } = useStateContext()
  const [searchTerm, setSearchTerm] = useState<string>(context ? context.searchTerm : '')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const debouncedValue = useDebounce<string>(searchTerm, 500)
  const open = Boolean(anchorEl)
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const location = useLocation()
  const navigate = useNavigate()

  const goToRides = () => {
    navigate('/')
    setAnchorEl(null)
  }

  const goToStation = () => {
    navigate('/stations')
    setAnchorEl(null)
  }

  useEffect(() => {
    if (context !== undefined) {
      setContext({ ...context, ...{ searchTerm: debouncedValue } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  const handleStartDateChange = (value: any) => {
    if (context !== undefined) {
      const selectedDate = new Date(value)
      const minDate = new Date('04/30/2021')
      const maxDate = new Date(context.date2)
      if (selectedDate > minDate && selectedDate < maxDate) {
        setContext({ ...context, ...{ date1: selectedDate } })
      } else {
        return
      }
    } else {
      resetContext()
    }
  }

  const handleEndDateChange = (value: any) => {
    if (context !== undefined) {
      const selectedDate = new Date(value)
      const minDate = new Date(context.date1)
      const maxDate = new Date('08/19/2021')
      if (selectedDate > minDate && selectedDate < maxDate) {
        setContext({ ...context, ...{ date2: selectedDate } })
      } else {
        return
      }
    } else {
      resetContext()
    }
  }

  const handleReset = () => {
    resetContext()
    setSearchTerm("")
  }

  if (context === undefined) return <CircularProgress sx={{ color: '#deced1' }} />
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
      <AppBar position="sticky" sx={{ maxWidth: 'xl', bgcolor: '#deced1' }}>
        <Toolbar>
          <IconButton
            id="menu-button"
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2, color: '#383636' }}
            onClick={handleMenuClick}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={goToStation}>Bike Stations</MenuItem>
            <MenuItem onClick={goToRides}>Bike Rides</MenuItem>
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: '#383636' } }}
          >
            {location.pathname === '/' ? 'City Bike Rides' : 'City Bike Stations'}
          </Typography>
          {location.pathname === '/stations' ? (
            <>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  id="search"
                  placeholder="Search by station name or address…"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </Search>
              <Button
                color="secondary"
                onClick={handleReset}
                variant="outlined"
                sx={{ ml: 2, maxWidth: 100, color: '#968185', borderColor: '#b89ea3' }}
              >
                Reset
              </Button>
            </>
          ) : null}
          {location.pathname === '/' ? (
            <>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                <DesktopDateTimePicker
                  minDate={new Date('2021-05-01')}
                  maxDate={new Date('2021-07-31')}
                  label="Matkat alkaen"
                  slotProps={{ textField: { id: 'startDate', size: 'small', color: 'secondary' } }}
                  defaultValue={new Date(context.date1)}
                  value={new Date(context.date1)}
                  onChange={handleStartDateChange}
                />
                <DesktopDateTimePicker
                  minDate={new Date('2021-05-01')}
                  maxDate={new Date('2021-08-18')}
                  label="Matkat päättyen"
                  slotProps={{ textField: { id: 'endDate', size: 'small', color: 'secondary' } }}
                  defaultValue={new Date(context.date2)}
                  value={new Date(context.date2)}
                  onChange={handleEndDateChange}
                />
                <Button
                  color="secondary"
                  onClick={handleReset}
                  variant="outlined"
                  sx={{ ml: 2, maxWidth: 100, color: '#968185', borderColor: '#b89ea3' }}
                >
                  Reset
                </Button>
              </LocalizationProvider>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Stack>
  )
}

export default Layout
