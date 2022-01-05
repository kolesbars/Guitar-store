import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {browserHistory} from '../../brower-history';
import { AxiosInstance } from 'axios';
import { AppRoute } from '../../const';
import Main from '../main/main';
import GuitarCard from '../guitar-card/guitar-card';
import Navigation from '../navigation/navigation';

type AppProps = {
  api: AxiosInstance
}

function App({api}: AppProps): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppRoute.Navigation} exact>
          <Navigation/>
        </Route>
        <Route path={AppRoute.Main} exact>
          <Main api={api}/>
        </Route>
        <Route path={`${AppRoute.Guitar}/:id`} exact>
          <GuitarCard/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
