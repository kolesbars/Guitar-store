import Header from './header';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {render, screen} from '@testing-library/react';
import { createAPI } from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';


const api = createAPI();

const mockStore = configureMockStore();

const store = mockStore({
  GUITARS: {guitarsList: []},
  PARAMS: {sortParams: {}, filterParams: {}, searchFormParams: {}, paginationParams: {}},
  PAGE: {pageCount: '', totalCount: ''},
});

describe('Component: Header', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header api={api} guitars={[]}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByAltText('Логотип')).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
  });
});
