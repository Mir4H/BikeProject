import { useState } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import {
  Typography,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import * as React from 'react';
import locale from 'date-fns/locale/fi'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location.pathname)
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
      <AppBar position="sticky" sx={{ maxWidth: 'xl', bgcolor: '#deced1' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2, color: '#383636' }}
            onClick={handleClick}
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
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={() => navigate('/stations')}>Bike Stations</MenuItem>
            <MenuItem onClick={() => navigate('/')}>Bike Rides</MenuItem>
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
          ) : null}
          {location.pathname === '/' ? (
            <>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                <DesktopDateTimePicker
                  label="Lähtöaika"
                  slotProps={{ textField: { size: 'small' } }}
                  defaultValue={new Date('2021-05-01T00:00')}
                />
                <DesktopDateTimePicker
                  label="Paluuaika"
                  slotProps={{ textField: { size: 'small' } }}
                  defaultValue={new Date('2021-07-31T23:59')}
                />
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
