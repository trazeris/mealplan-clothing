export const checkUserSession = 
  () => 
    ({type: 'user/checkUserSession'});

export const googleSignInStart = 
  () => 
    ({type: 'user/googleSignInStart'});

export const emailSignInStart = 
  (email, password) => 
    ({type: 'user/emailSignInStart', payload: {email, password}});

export const signInSuccess = 
  (user) => 
    ({type: 'user/signInSuccess', payload: user});
    
export const signInFailed = 
  (error) => 
    ({type: 'user/signInFailed', payload: error});

export const signUpStart = 
  (email, password, displayName) => 
    ({type: 'user/signUpStart', payload: {email, password, displayName}});

export const signUpSuccess = 
  (user, additionalDetails) => 
    ({type: 'user/signUpSuccess', payload: {user, additionalDetails}});

export const signUpFailed = 
  (error) => 
    ({type: 'user/signUpFailed', payload: error});


export const signOutStart = 
  () => 
    ({type: 'user/signOutStart'});

export const signOutSuccess = 
  () => 
    ({type: 'user/signOutSuccess'});

export const signOutFailed = 
  (error) => 
    ({type: 'user/signOutFailed', payload: error});