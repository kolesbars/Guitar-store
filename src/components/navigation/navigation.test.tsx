import Navigation from './navigation';
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

describe('Component: Navigation', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navigation/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Список страниц/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});
