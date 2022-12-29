import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
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
          <Link className="nav-link" to='/sign-in'>
            SignIn
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;