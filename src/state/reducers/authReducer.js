const initState = {
  error: null,
  accessToken: null,
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST_ERROR':
      return {
        ...state,
        error: 'Login Failed',
        accessToken: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload,
        error: null,
      }

    case 'DELIVERY_AGENT_LOGIN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        error: null,
      }
    case 'DEPARTMENT_NOT_FOUND':
      return {
        ...state,
        error: 'No Department found with the given registration number',
        accessToken: null,
      }
    case 'DELIVERYAGENT_NOT_FOUND':
      return {
        ...state,
        error: 'No Delivery agent found with the given email',
        accessToken: null,
      }
    case 'INVALID_PASSWORD':
      return {
        ...state,
        error: 'Incorrect Password',
        accessToken: null,
      }
    case 'REGISTER_REQUEST_ERROR':
      return {
        ...state,
        error: 'Login Failed',
        accessToken: null,
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        accessToken: action.payload,
        error: null,
      }

    case 'REGISTER_FAILURE':
      return {
        ...state,
        accessToken: null,
        error: action.payload.message,
      }
    case 'UNAUTHORIZED':
      return {
        ...state,
        error: 'Unauthorized',
      }
    case 'INVALID_ACCESS_TOKEN':
      return {
        ...state,
        error: 'INVALID ACCESS TOKEN',
      }
    case 'PROFILE_FETCH_SUCCESS':
      return {
        ...state,
        error: null,
      }
    case 'PROFILE_FETCH_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    case 'PROFILE_UPDATE_SUCCESS':
      return {
        ...state,
        error: null,
      }

    case 'LOGOUT':
      return {
        ...state,
        accessToken: null,
        error: null,
      }
    default:
      return state
  }
}

export default authReducer
