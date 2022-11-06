import React from 'react'
import {
  Button,
  Typography,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom'
import AuthWrapper from '../components/layout/authWrapper';


const NotFound = () => {
  return (
    <AuthWrapper style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <Typography variant='h1'>
        Page not found
      </Typography>
      <NavLink to="/" variant="body2" style={{textDecoration:'none'}}>
        <Button color='primary' variant='contained'>
          Go Back
        </Button>
      </NavLink>
    </AuthWrapper>
  )
}

export default NotFound