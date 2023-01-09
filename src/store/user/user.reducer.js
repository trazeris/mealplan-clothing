const initialState = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case 'user/signInSuccess':
      return {
        ...state,
        isLoading: false,
        currentUser: payload
      }
    case 'user/signUpFailed':
    case 'user/signInFailed':
    case 'user/signOutFailed':
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    case 'user/signOutStart':
    case 'user/signUpStart':
    case 'user/googleSignInStart':
    case 'user/emailSignInStart':
      return {
        ...state,
        isLoading: true
      }
    case 'user/signOutSuccess':
      return {
        ...state,
        isLoading: false,
        currentUser: null
      }
    default:
      return state;
  }
}