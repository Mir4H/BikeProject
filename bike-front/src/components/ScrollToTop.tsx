import {
  Box,
  Fade,
  Fab
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import * as React from 'react'

export const ScrollTop = () => {
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