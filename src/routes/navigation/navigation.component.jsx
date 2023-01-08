import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { LogoContainerLink, NavigationContainer, NavigationLink, NavLinksContainer } from "./navigation.styles";


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  return (
    <>
      <NavigationContainer>
        <LogoContainerLink to='/'>
          <CrownLogo className="logo" />
        </LogoContainerLink>
        <NavLinksContainer>
          <NavigationLink to='/shop'>
            Shop
          </NavigationLink>
          { 
            currentUser ? 
            (
              <NavigationLink as="span" onClick={signOutUser}>Sign out</NavigationLink>
            ) : 
            <NavigationLink className="nav-link" to='/auth'>
              SignIn
            </NavigationLink>
          }
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
}

export default Navigation;