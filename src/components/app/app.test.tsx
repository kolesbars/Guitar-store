import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { createAPI } from '../../services/api';
import App from './app';
import { State } from '../../types/state';
import { Action } from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';

const api = createAPI();

const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

const store = mockStore({
  GUITARS: {guitarsList: []},
  PARAMS: {sortParams: {}, filterParams: {}, searchFormParams: {}, paginationParams: {}},
  PAGE: {pageCount: '', totalCount: ''},
  CART: {guitarsID: [], guitarsQuantity: []},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <BrowserRouter>
      <App api={api}/>
    </BrowserRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render main screen when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  });
});

