import SearchForm from './search-form';
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

describe('Component: SearchForm', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchForm api={api} guitars={[]}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/что вы ищете/i)).toBeInTheDocument();
  });
});
