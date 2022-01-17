import GuitarCatalog from './guitars-catalog';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {render, screen} from '@testing-library/react';
import { createAPI } from '../../services/api';
import { emptyGuitar } from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';


const api = createAPI();

const mockStore = configureMockStore();

const store = mockStore({
  GUITARS: {guitarsList: []},
  PARAMS: {sortParams: {}, filterParams: {}, searchFormParams: {}, paginationParams: {}},
  PAGE: {pageCount: '', totalCount: ''},
});

describe('Component: GuitarsCatalog', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <GuitarCatalog api={api} guitars={[emptyGuitar]}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId('guitars-catalog')).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });
});
