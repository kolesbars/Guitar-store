import PageItem from './page-item';
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

describe('Component: PageItem', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PageItem
            page='1'
            pageCount='1'
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });
});
