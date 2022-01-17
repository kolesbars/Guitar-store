import Sorting from './sorting';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

const store = mockStore({
  GUITARS: {guitarsList: []},
  PARAMS: {sortParams: {}, filterParams: {}, searchFormParams: {}, paginationParams: {}},
  PAGE: {pageCount: '', totalCount: ''},
});

describe('Component: Sorting', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Sorting/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByTestId('asc')).toBeInTheDocument();
  });
});
