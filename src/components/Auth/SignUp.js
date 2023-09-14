import React from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { useDispatch } from 'react-redux'
import { register } from '../../state/actions/authActions'

function SignUp(prop) {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const firstname = data.get('firstname')
    const lastname = data.get('lastname')
    const email = data.get('email')
    const password = data.get('password')
    const phone_number = data.get('phone_number')
    const address = data.get('address')
    const region = data.get('region')
    const country = data.get('country')

    const details = {
      firstname: firstname,
      lastname: lastname,
      password: password,
      phone: phone_number,
      contactEmail: email,
      country: country,
      region: region,
      location: address,
    }

    dispatch(register(details))
  }

  return (
    <Container maxWidth='s'>
      <Box
        sx={{
          paddingTop: 10,
          px: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontSize: '20pt', fontWeight: 'bold' }}>
          Create an account !
        </div>
        <div style={{color:"grey",fontSize:"10pt"}}>Register into the world of automated deliveries</div>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>

          <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant='standard'
                id='firstname'
                label='First Name'
                name='firstname'
                autoComplete='firstname'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant='standard'
                id='lastname'
                label='Last Name'
                name='lastname'
                autoComplete='lastname'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant='standard'
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant='standard'
                name='phone_number'
                label='Phone_number'
                id='phone_number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant='standard'
                fullWidth
                id='address'
                label='Address'
                name='address'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                variant='standard'
                fullWidth
                name='country'
                label='Country'
                id='country'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                variant='standard'
                fullWidth
                name='region'
                label='region'
                id='region'
              />
            </Grid>
            
           
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant='standard'
                type='password'
                name='password'
                label='Password'
                id='password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{
              mt: 3,
              mb: 2,
              color: 'white',
              backgroundColor: 'black',
              borderRadius: '20px',
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button
                fullWidth
                variant='text'
                sx={{
                  mt: 3,
                  borderRadius: '20px',
                  color: 'black',
                }}
                 onClick={() => prop.handleAuthToggle(false)}
              >
                Already have an account? Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
