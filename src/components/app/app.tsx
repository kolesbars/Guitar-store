import {Routes, Route, BrowserRouter} from 'react-router-dom';
//import {browserHistory} from '../../brower-history';
import { AxiosInstance } from 'axios';
import { AppRoute } from '../../const';
import Catalog from '../catalog/catalog';
import GuitarCard from '../guitar-card/guitar-card';
import Navigation from '../navigation/navigation';

type AppProps = {
  api: AxiosInstance
}

function App({api}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Navigation}
          element={<Navigation/>}
        >
        </Route>
        <Route
          path={`${AppRoute.Catalog}`}
          element={<Catalog api={api}/>}
        >
        </Route>
        <Route
          path={`${AppRoute.Catalog}/:pageParam`}
          element={<Catalog api={api}/>}
        >
        </Route>
        <Route
          path={`${AppRoute.Guitar}/:id`}
          element={<GuitarCard api={api}/>}
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
