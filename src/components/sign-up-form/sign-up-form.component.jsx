import { useEffect, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [arePasswordsMatching, setArePasswordsMatching] = useState(true);
  const { displayName, email, password, confirmPassword } = formFields;


  useEffect(() => {
    setArePasswordsMatching(password === confirmPassword);
  }, [password, confirmPassword])
  
  const handleChange = ({target}) => {
    const {name, value} = target;
    setFormFields((prev) => ({...prev, [name]: value}));
  };

  const resetFormFields =  () => {
    setFormFields(defaultFormFields);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if(arePasswordsMatching) {
      try {
        const userAuth = await createAuthUserWithEmailAndPassword(email, password);
        await createUserDocumentFromAuth({...userAuth.user, displayName: displayName});
        resetFormFields();
      } catch(error) {
        console.log('Error while creating user ', error);
      }
    }
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={onSubmit}>
        <label>Display name</label>
        <input type="text" required onChange={handleChange} name="displayName" value={displayName} />
        
        <label>Email</label>
        <input type="email" required  onChange={handleChange} name="email" value={email} />
        
        <label>Password</label>
        <input type="password" required  onChange={handleChange} name="password"  value={password} />

        <label>Confirm password</label>
        <input type="password" required  onChange={handleChange} name="confirmPassword"  value={confirmPassword} />
        {!arePasswordsMatching && <span>Passwords do not match</span>}

        <input type='submit' value="Submit" disabled={!arePasswordsMatching} />
      </form>
    </div>
  )
}

export default SignUpForm;