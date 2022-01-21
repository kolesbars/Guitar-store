import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { createAPI } from '../../services/api';
import App from './app';

const mockStore = configureMockStore();

const store = mockStore({
  GUITARS: {guitarsList: []},
  PARAMS: {sortParams: {}, filterParams: {}, searchFormParams: {}, paginationParams: {}},
  PAGE: {pageCount: '', totalCount: ''},
});

const history = createMemoryHistory();

const api = createAPI();

const fakeApp = (
  <Provider store={store}>
    <BrowserRouter>
      <App api={api}/>
    </BrowserRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render navigate screen when user navigate to "/"', () => {
    history.push(AppRoute.Navigation);
    render(fakeApp);

    expect(screen.getByText(/Список страниц/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});

