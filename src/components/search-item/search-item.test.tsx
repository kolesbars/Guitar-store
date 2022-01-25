import SearchItem from './search-item';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {render, screen} from '@testing-library/react';
import { emptyGuitar } from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

const store = mockStore({
  GUITARS: {guitarsList: []},
  PARAMS: {sortParams: {}, filterParams: {}, searchFormParams: {}, paginationParams: {}},
  PAGE: {pageCount: '', totalCount: ''},
});

describe('Component: SearchItem', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchItem guitar={emptyGuitar} id={1} currentItem={1}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId('search-item')).toBeInTheDocument();
  });
});
