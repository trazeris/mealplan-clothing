import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { GlobalStyle } from './global.styles';

import Spinner from './components/spinner/spinner.component';

import Navigation from './routes/navigation/navigation.component';
import { checkUserSession } from './store/user/user.action';

const Home = lazy(() => import('./routes/home/home.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Authentication = lazy(
  () => import('./routes/authentication/authentication.component')
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />}></Route>
            <Route path="auth" element={<Authentication />}></Route>
            <Route path="shop/*" element={<Shop />}></Route>
            <Route path="checkout" element={<Checkout />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
