import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateDepartmentInfo } from '../../../state/actions/authActions'

const Profile = () => {
  const departmentInitialValues = useSelector((state) => state.auth.department)
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleFormSubmit = (updatedDepartmentValue) => {
    dispatch(
      updateDepartmentInfo(state.auth.accessToken, updatedDepartmentValue)
    )
  }

  const phoneRegExp = /^[6-9]\d{9}$/

  const checkoutSchema = yup.object().shape({
    name: yup.string().required('required'),
    registrationNumber: yup.string().required('required'),
    contactEmail: yup.string().email('invalid email').required('required'),
    contactNumber: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('required'),
    location: yup.string().required('required'),
    country: yup.string().required('required'),
    state: yup.string().required('required'),
    city: yup.string().required('required'),
    pinCode: yup.number().required('required'),
  })

  return (
    <Box m='20px'>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={departmentInitialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            >
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name='name'
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                disabled={true}
                label='First Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registrationNumber}
                name='First Name'
                error={
                  !!touched.firstName && !!errors.firstName
                }
                helperText={
                  touched.firstName && errors.firstName
                }
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Last Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name='Last Name'
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Pjone Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactNumber}
                name='phoneNumber'
                error={!!touched.phoneNumber && !!errors.phoneNumberNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Region'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.region}
                name='location'
                error={!!touched.region && !!errors.region}
                helperText={touched.region && errors.region}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Country'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name='country'
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: 'span 1' }}
              />
             
              
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button
                type='submit'
                variant='contained'
                disabled={values === departmentInitialValues}
                sx={{
                  color: 'white',
                  backgroundColor: 'black',
                  borderRadius: '20px',
                }}
              >
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Profile
