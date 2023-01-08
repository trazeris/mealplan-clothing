const initialState = {
  currentUser: null
}

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case 'setCurrentUser':
      return {
        currentUser: payload
      }
    default:
      return state;
  }
}