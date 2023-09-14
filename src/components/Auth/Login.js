import React from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { login } from '../../state/actions/authActions'

function Login(prop) {
  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const emailAddress = data.get('emailAddress')
    const password = data.get('password')

    const credentials = {
      emailAddress: emailAddress,
      password: password,
    }

    dispatch(login(credentials))
  }

  return (
    <Container maxWidth='s'>
      <Box
        sx={{
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div id='loginText' style={{ fontSize: '20pt', fontWeight: 'bold' }}>
          Hey! Welcome
        </div>
        <div style={{ color: 'grey', fontSize: '10pt' }}>
        "Experience seamless access to your delivery services."
        </div>
        <Box component='form' onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            variant='standard'
            required
            fullWidth
            id='emailAdress'
            label='email address'
            name='email address'
            autoFocus
          />
          <TextField
            margin='normal'
            variant='standard'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: '20px',
              color: 'white',
              backgroundColor: 'black',
            }}
          >
            Login
          </Button>

          <Grid container>
            <Grid item>
              <Button
                fullWidth
                variant='text'
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '20px',
                  color: 'black',
                }}
                onClick={() => prop.handleAuthToggle(true)}
              >
                Create an Account
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
