import { toast } from 'react-toastify'
import { apiHost } from '../../apiLoc'

export const login = (credential) => {
  return (dispatch) => {
    const url = `https://data-j87g.onrender.com`
    fetch(url, {
      method: 'post',
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 404) {
          dispatch({
            type: 'DEPARTMENT_NOT_FOUND',
          })
          toast.error('Department not found with given credentials', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 401) {
          dispatch({
            type: 'INVALID_PASSWORD',
          })
          toast.error('Invalid Password', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 200) {
          response.json().then((res) => {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: res.data.accessToken,
            })
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'LOGIN_REQUEST_ERROR',
        })
      })
  }
}

export const register = (details) => {
  return (dispatch) => {
    const url = ``
    fetch(url, {
      method: 'post',
      body: JSON.stringify({
        firstname: details.first_name,
        lastname: details.last_name,
        country: details.country,
        city: details.city,
        address: details.address,
        password: details.password,
        phoneNumber: details.phone_number,
        contactEmail: details.contactEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 400) {
          response.json().then((res) => {
            dispatch({
              type: 'REGISTER_FAILURE',
              payload: res,
            })
            toast.error(res.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
          })
        } else if (response.status === 201) {
          response.json().then((res) => {
            dispatch({
              type: 'REGISTER_SUCCESS',
              payload: res.data.accessToken,
            })
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'REGISTER_REQUEST_ERROR',
        })
      })
  }
}

export const getDepartmentInfo = (accessToken) => {
  return (dispatch) => {
    const url = `https://data-j87g.onrender.com`
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          dispatch({
            type: 'DEPARTMENT_NOT_FOUND',
          })
          toast.error('Department not found with given credentials', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 401) {
          dispatch({
            type: 'UNAUTHORIZED',
          })
          toast.error('Unauthorized', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 403) {
          dispatch({
            type: 'INVALID_ACCESS_TOKEN',
          })
          toast.error('Invalid access token', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 200) {
          response.json().then((res) => {
            dispatch({
              type: 'PROFILE_FETCH_SUCCESS',
              payload: res.data,
            })
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'PROFILE_FETCH_ERROR',
          payload: 'Something went wrong !',
        })
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  }
}

export const updateDepartmentInfo = (accessToken, details) => {
  return (dispatch) => {
    const url = ``
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        firstname: details.first_name,
        lastname: details.last_name,
        country: details.country,
        city: details.city,
        address: details.address,
        password: details.password,
        phoneNumber: details.phone_number,
        contactEmail: details.contactEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          dispatch({
            type: 'DEPARTMENT_NOT_FOUND',
          })
          toast.error('Department not found with given credentials', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 401) {
          dispatch({
            type: 'UNAUTHORIZED',
          })
          toast.error('Unauthorized', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 403) {
          dispatch({
            type: 'INVALID_ACCESS_TOKEN',
          })
          toast.error('Invalid access token', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 200) {
          response.json().then((res) => {
            dispatch({
              type: 'PROFILE_UPDATE_SUCCESS',
              payload: res.data,
            })
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'PROFILE_FETCH_ERROR',
          payload: 'Something went wrong !',
        })
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  }
}


export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}
