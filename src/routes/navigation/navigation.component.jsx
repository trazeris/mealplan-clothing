import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <nav className="navigation">
        <Link className="logo-container" to='/'>
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            Shop
          </Link>
          { 
            currentUser ? 
            <span className="nav-link" onClick={signOutUser}>Sign out</span> : 
            <Link className="nav-link" to='/auth'>
              SignIn
            </Link>
          }
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;