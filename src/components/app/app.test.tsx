import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { createAPI } from '../../services/api';
//import MockAdapter from 'axios-mock-adapter';
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

// render(<App />);
//     const textElement = screen.getByText(/Hello, world!/i);
//     expect(textElement).toBeInTheDocument();

describe('Application Routing', () => {
  it('should render navigate screen when user navigate to "/"', () => {
    history.push(AppRoute.Navigation);
    render(fakeApp);

    expect(screen.getByText(/Список страниц/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });

  // it('should render catalog screen when user navigate to "/catalog/:pageParam"', () => {
  //   window.history.push(`${AppRoute.Catalog}/1`);
  //   render(fakeApp);

  //   expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  // });
});

