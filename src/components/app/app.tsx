import {Routes, Route, Navigate} from 'react-router-dom';
import { AppRoute } from '../../const';
import Catalog from '../catalog/catalog';
import GuitarScreen from '../guitar-screen/guitar-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Cart from '../cart/cart';
import { AxiosInstance } from 'axios';
import Layout from '../layout/layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateGuitarsIDInCart } from '../../store/action';

type AppProps = {
  api: AxiosInstance,
};

function App({api}: AppProps): JSX.Element {

  const dispatch = useDispatch();

  useEffect(() => {
    const ids = localStorage.getItem('guitarsIDInCart');
    if (ids !== null) {
      dispatch(updateGuitarsIDInCart(JSON.parse(ids)));
    }
  }, []);

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout/>}>
        <Route
          path={AppRoute.Main}
          element={<Navigate to={AppRoute.Catalog}/>}
        >
        </Route>
        <Route
          path={AppRoute.Catalog}
          element={<Catalog/>}
        >
        </Route>
        <Route
          path={`${AppRoute.Guitar}/:id`}
          element={<GuitarScreen/>}
        >
        </Route>
        <Route
          path={AppRoute.Cart}
          element={<Cart api={api}/>}
        >
        </Route>
      </Route>
      <Route
        path="*"
        element={<NotFoundScreen/>}
      >
      </Route>
    </Routes>
  );
}

export default App;
