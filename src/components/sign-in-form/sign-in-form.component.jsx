import { useState } from "react";
import { createUserDocumentFromAuth, signInWithEmailPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  
  const handleChange = ({target}) => {
    const {name, value} = target;
    setFormFields((prev) => ({...prev, [name]: value}));
  };

  const resetFormFields =  () => {
    setFormFields(defaultFormFields);
  }

  const signInWithCredentials = async () => {
    try {
      const {user} = await signInWithEmailPassword(email, password);
      await createUserDocumentFromAuth(user);
      resetFormFields();
    } catch(error) {
      console.log('Error while signin in ', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const {user} = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
      resetFormFields();
    } catch(error) {
      console.log('Error while signin in ', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithCredentials();
  }

  return (
    <div className="sign-in-container">
      <h2>Sign in</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label={'email'} 
          name={'email'}
          value={email}
          type={'email'}
          onChange={handleChange} />

        <FormInput 
          label={'password'} 
          name={'password'}
          value={password}
          type={'password'}
          onChange={handleChange} />

        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType={'google'}>Google SIGN IN</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;