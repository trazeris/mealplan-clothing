import { useSelector } from 'react-redux';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import {
  selectCurrentUser,
  selectIsAuthLoading,
} from '../../store/user/user.selector';
import { AuthContainer } from './authentication.styles';
import Spinner from '../../components/spinner/spinner.component';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Authentication = () => {
  const isAuthLoading = useSelector(selectIsAuthLoading);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && currentUser) {
      navigate('/shop');
    }
  }, [isAuthLoading, currentUser, navigate]);

  return (
    <AuthContainer>
      {isAuthLoading ? (
        <Spinner>
          <h4>Working...</h4>
        </Spinner>
      ) : (
        <>
          <SignInForm />
          <SignUpForm />
        </>
      )}
    </AuthContainer>
  );
};

export default Authentication;
