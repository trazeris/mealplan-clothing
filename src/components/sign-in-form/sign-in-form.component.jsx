import { useState } from "react";
import { signInWithEmailPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { Button, GoogleSignInButton } from "../button/button.styles";
import FormInput from "../form-input/form-input.component";
import { ButtonsContainer, AuthFormContainer } from "./sign-in-form.styles";


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
      await signInWithEmailPassword(email, password);
      resetFormFields();
    } catch(error) {
      console.log('Error while signin in ', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
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
    <AuthFormContainer>
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

        <ButtonsContainer>
          <Button type="submit">SIGN IN</Button>
          <GoogleSignInButton type="button" onClick={signInWithGoogle}>Google SIGN IN</GoogleSignInButton>
        </ButtonsContainer>
      </form>
    </AuthFormContainer>
  )
}

export default SignInForm;