import {Routes, Route} from 'react-router-dom';
import { AxiosInstance } from 'axios';
import { AppRoute } from '../../const';
import Catalog from '../catalog/catalog';
import GuitarScreen from '../guitar-screen/guitar-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Navigation from '../navigation/navigation';

type AppProps = {
  api: AxiosInstance
}

function App({api}: AppProps): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Navigation}
        element={<Navigation/>}
      >
      </Route>
      <Route
        path={`${AppRoute.Catalog}/:pageParam`}
        element={<Catalog api={api}/>}
      >
      </Route>
      <Route
        path={`${AppRoute.Guitar}/:id`}
        element={<GuitarScreen api={api}/>}
      >
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
