import React, {useMemo} from 'react';
import ReactDOM from 'react-dom';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer';
import App from './components/app/app';
import { configureStore } from '@reduxjs/toolkit';
import { QueryParamProvider } from 'use-query-params';
import { Location } from 'history';
import { BrowserRouter, useLocation, useNavigate} from 'react-router-dom';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
});

const RouteAdapter: React.FC = ({ children }) => {
  const reactRouterNavigate = useNavigate();
  const reactRouterLocation = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      replace(location: Location) {
        reactRouterNavigate(location, { replace: true, state: location.state });
      },
      push(location: Location) {
        reactRouterNavigate(location, {
          replace: false,
          state: location.state,
        });
      },
    }), [reactRouterNavigate],
  );
  //https://github.com/pbeshai/use-query-params/issues/196
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return children({ history: adaptedHistory, reactRouterLocation });
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={RouteAdapter}>
          <App api={api}/>
        </QueryParamProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
