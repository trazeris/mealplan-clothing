import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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
            (
              <span className="nav-link" onClick={signOutUser}>Sign out</span>
              ) : 
            <Link className="nav-link" to='/auth'>
              SignIn
            </Link>
          }
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;