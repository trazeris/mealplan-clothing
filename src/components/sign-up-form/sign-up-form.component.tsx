import { AuthError, AuthErrorCodes } from 'firebase/auth';
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';
import { Button } from '../button/button.styles';
import FormInput from '../form-input/form-input.component';
import { AuthFormContainer } from '../sign-in-form/sign-in-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [arePasswordsMatching, setArePasswordsMatching] = useState(true);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  useEffect(() => {
    setArePasswordsMatching(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (arePasswordsMatching) {
      try {
        dispatch(signUpStart(email, password, displayName));
        resetFormFields();
      } catch (error) {
        if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
          console.log('Cannot create user, email already in use');
        } else {
          console.log('user creatiion failed');
        }
      }
    }
  };

  return (
    <AuthFormContainer>
      <h2>Don&apos;t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmit}>
        <FormInput
          label={'Display name'}
          name={'displayName'}
          value={displayName}
          type={'text'}
          onChange={handleChange}
        />

        <FormInput
          label={'Email'}
          name={'email'}
          value={email}
          type={'email'}
          onChange={handleChange}
        />

        <FormInput
          label={'Password'}
          name={'password'}
          value={password}
          type={'password'}
          onChange={handleChange}
        />

        <FormInput
          label={'Confirm password'}
          name={'confirmPassword'}
          value={confirmPassword}
          type={'password'}
          onChange={handleChange}
        />
        {!arePasswordsMatching && <span>Passwords do not match</span>}

        <Button disabled={!arePasswordsMatching}>SIGN UP</Button>
      </form>
    </AuthFormContainer>
  );
};

export default SignUpForm;
