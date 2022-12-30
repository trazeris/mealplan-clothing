import { useEffect, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';

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
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmit}>
        <FormInput 
          label={'Display name'} 
          name={'displayName'}
          value={displayName}
          type={'text'}
          onChange={handleChange} />

        <FormInput 
          label={'Email'} 
          name={'email'}
          value={email}
          type={'email'}
          onChange={handleChange} />
          
        <FormInput 
          label={'Password'} 
          name={'password'}
          value={password}
          type={'password'}
          onChange={handleChange} />
        
        <FormInput 
          label={'Confirm password'} 
          name={'confirmPassword'}
          value={confirmPassword}
          type={'password'}
          onChange={handleChange} />
        {!arePasswordsMatching && <span>Passwords do not match</span>}

        <Button disabled={!arePasswordsMatching}>Submit</Button>
      </form>
    </div>
  )
}

export default SignUpForm;