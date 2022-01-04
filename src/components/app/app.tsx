import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {browserHistory} from '../../brower-history';
import { AxiosInstance } from 'axios';
import Main from '../main/main';
import Navigation from '../navigation/navigation';

type AppProps = {
  api: AxiosInstance
}

function App({api}: AppProps): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path="/" exact>
          <Navigation/>
        </Route>
        <Route path="/main" exact>
          <Main api={api}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
