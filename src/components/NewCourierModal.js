import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import {
  Button,
  Dialog,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { apiHost } from '../apiLoc'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function additionalTabWiseAttributes(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const NewCourierModal = (props) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const accessToken = useSelector((state) => state.auth.accessToken)
  const [value, setValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const createPdf = (data, refId) => {
    const pdfGenerator = pdfMake.createPdf({
      pageSize: 'A7',
      header: [
        {
          text: 'Dropoff',
          margin: 5,
          fontSize: '10',
          bold: true,
          alignment: 'center',
        },
      ],
      content: [
        {
          text: 'Receiver Details',
          fontSize: '7',
          bold: true,
          decoration: 'underline',
        },
        {
          text: `Name: ${data.receiverDetails.name}\nPhone: ${data.receiverDetails.phone}\nEmail: ${data.receiverDetails.email}\nAddress: ${data.receiverDetails.adress}`,
          fontSize: '5',
          marginTop: 2,
        },
        {
          text: 'Sender Details',
          fontSize: '7',
          bold: true,
          decoration: 'underline',
          marginTop: 5,
        },
        {
          text: `Name: ${data.receiverDetails.name}\nPhone: ${data.receiverDetails.phone}\nEmail: ${data.receiverDetails.email}\nAddress: ${data.receiverDetails.adress}`,
          fontSize: '5',
          marginTop: 2,
        },
        {
          text: 'Package Details',
          fontSize: '7',
          bold: true,
          decoration: 'underline',
          marginTop: 5,
        },
        {
          text: `Reference ID: ${refId}\nItem Description: ${data.courierDetails.packageName}\nWeight: ${data.courierDetails.packageWeight}`,
          fontSize: '5',
          bold: true,
          marginTop: 5,
        },
      ],
    })
    var win = window.open('', '_blank')
    pdfGenerator.print({}, win)
  }

  const handleNewCourierFormSubmit = async (formData) => {
    const data = {
      receiverDetails: {
        name: formData.receiverName,
        phoneNumber: formData.receiverPhone,
        email: formData.receiverEmail,
        address: formData.receiverAddress,
      },
      senderDetails: {
        name: formData.senderName,
        phoneNumber: formData.senderPhone,
        email: formData.senderEmail,
        address: formData.senderAddress,
      },
      courierDetails: {
        packageName: formData.packageName,
        packageWeight: formData.packageWeight,
      },
    }
    try {
      const url = `${apiHost}/api/couriers/addCourier`
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const courierEntryResponse = await response.json()

      if (response.status === 204 || response.status === 201) {
        createPdf(data, courierEntryResponse.data._id)
        toast.success('Entry Successful', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      } else {
        toast.error(courierEntryResponse.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      }
    } catch (error) {
      console.log(error)
    }
    props.handleModalClose()
  }

  const handleCourierEntryFormSubmit = async (formData) => {
    const data = {
      courierDetails: {
        _id: formData._id,
      },
    }
    try {
      const url = `${apiHost}/api/couriers/addCourier`
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const courierEntryResponse = await response.json()

      response.status === 204 || response.status === 201
        ? toast.success('Entry Successful', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        : toast.error(courierEntryResponse.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
    } catch (error) {
      console.log(error)
    }
    props.handleModalClose()
  }

  const initValues = {
    receiverName: '',
    receiverEmail: '',
    receiverPhone: '',
    receiverAddress: '',

    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderAddress: '',

    packageName: '',
    packageWeight: '',
  }

  const phoneRegExp = /^[6-9]\d{9}$/

  const brandNewCourierSchema = yup.object().shape({
    receiverName: yup.string().required('required'),
    receiverEmail: yup.string().email('invalid email').required('required'),
    receiverPhone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('required'),
    receiverAddress: yup.string().required('required'),

    senderName: yup.string().required('required'),
    senderEmail: yup.string().email('invalid email').required('required'),
    senderPhone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('required'),
    senderAddress: yup.string().required('required'),

    packageName: yup.string().required('required'),
    packageWeight: yup.string().required('required'),
  })

  const courierEntrySchema = yup.object().shape({
    _id: yup.string().required('required'),
  })

  return (
    <div>
      <Dialog open={props.modalOpen} onClose={props.handleModalClose}>
        <DialogTitle>Add Courier</DialogTitle>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleTabChange} centered>
              <Tab
                label='mark courier entry'
                {...additionalTabWiseAttributes(0)}
              />
              <Tab
                label='start new courier'
                {...additionalTabWiseAttributes(1)}
              />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            {/* Entry of a courier form */}
            <Formik
              initialValues={{ _id: '' }}
              onSubmit={handleCourierEntryFormSubmit}
              validationSchema={courierEntrySchema}
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
                      variant='standard'
                      type='text'
                      label='Reference ID'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='_id'
                      value={values._id}
                      error={!!touched._id && !!errors._id}
                      helperText={touched._id && errors._id}
                      sx={{ gridColumn: 'span 4' }}
                    />
                  </Box>

                  <Box display='flex' justifyContent='end' mt='20px'>
                    <Button
                      type='submit'
                      variant='contained'
                      sx={{
                        color: '#cc3c2f',
                        backgroundColor: '#cc3c2f',
                        borderRadius: '20px',
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* New Courier Form */}
            <Formik
              initialValues={initValues}
              onSubmit={handleNewCourierFormSubmit}
              validationSchema={brandNewCourierSchema}
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
                  <Typography sx={{ backgroundColor: '#cc3c2f' }}>
                    Package Details
                  </Typography>
                  <Box
                    display='grid'
                    gap='30px'
                    gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  >
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Item Description'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='packageName'
                      value={values.packageName}
                      error={!!touched.packageName && !!errors.packageName}
                      helperText={touched.packageName && errors.packageName}
                      sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Weight'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='packageWeight'
                      value={values.packageWeight}
                      error={!!touched.packageWeight && !!errors.packageWeight}
                      helperText={touched.packageWeight && errors.packageWeight}
                      sx={{ gridColumn: 'span 2' }}
                    />
                  </Box>

                  <Typography sx={{ backgroundColor: '#cc3c2f' }} mt={2}>
                    Receiver's Details
                  </Typography>
                  <Box
                    display='grid'
                    gap='30px'
                    gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  >
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Name'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='receiverName'
                      value={values.receiverName}
                      error={!!touched.receiverName && !!errors.receiverName}
                      helperText={touched.receiverName && errors.receiverName}
                      sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Phone'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='receiverPhone'
                      value={values.receiverPhone}
                      error={!!touched.receiverPhone && !!errors.receiverPhone}
                      helperText={touched.receiverPhone && errors.receiverPhone}
                      sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Email'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='receiverEmail'
                      value={values.receiverEmail}
                      error={!!touched.receiverEmail && !!errors.receiverEmail}
                      helperText={touched.receiverEmail && errors.receiverEmail}
                      sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Address'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='receiverAddress'
                      value={values.receiverAddress}
                      error={
                        !!touched.receiverAddress && !!errors.receiverAddress
                      }
                      helperText={
                        touched.receiverAddress && errors.receiverAddress
                      }
                      sx={{ gridColumn: 'span 4' }}
                    />
                    
                  
                  </Box>
                  <Typography sx={{ backgroundColor: '#cc3c2f' }} mt={2}>
                    Sender's Details
                  </Typography>
                  <Box
                    display='grid'
                    gap='30px'
                    gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  >
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Name'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderName'
                      value={values.senderName}
                      error={!!touched.senderName && !!errors.senderName}
                      helperText={touched.senderName && errors.senderName}
                      sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Phone'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderPhone'
                      value={values.senderPhone}
                      error={!!touched.senderPhone && !!errors.senderPhone}
                      helperText={touched.senderPhone && errors.senderPhone}
                      sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Email'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderEmail'
                      value={values.senderEmail}
                      error={!!touched.senderEmail && !!errors.senderEmail}
                      helperText={touched.senderEmail && errors.senderEmail}
                      sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Address'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderAddress'
                      value={values.senderAddress}
                      error={
                        !!touched.senderAddress && !!errors.senderAddress
                      }
                      helperText={
                        touched.senderAddress && errors.senderAddress
                      }
                      sx={{ gridColumn: 'span 4' }}
                    />
                    
                  </Box>
                  <Box display='flex' justifyContent='end' mt='20px'>
                    <Button
                      type='submit'
                      variant='contained'
                      sx={{
                        color: 'white',
                        backgroundColor: 'black',
                        borderRadius: '20px',
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </TabPanel>
        </Box>
      </Dialog>
    </div>
  )
}

export default NewCourierModal
