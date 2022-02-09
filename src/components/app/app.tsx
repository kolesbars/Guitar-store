import {Routes, Route, Navigate} from 'react-router-dom';
import { AppRoute } from '../../const';
import Catalog from '../catalog/catalog';
import GuitarScreen from '../guitar-screen/guitar-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Layout from '../layout/layout';

function App(): JSX.Element {
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
