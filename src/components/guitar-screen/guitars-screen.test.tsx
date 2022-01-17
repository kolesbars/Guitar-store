import GuitarScreen from './guitar-screen';
import {BrowserRouter} from 'react-router-dom';
//import { Provider } from 'react-redux';
import {render, screen} from '@testing-library/react';
import { createAPI } from '../../services/api';
//import {configureMockStore} from '@jedmao/redux-mock-store';


const api = createAPI();

// const mockStore = configureMockStore();

// const store = mockStore({
//   GUITARS: {guitarsList: []},
//   PARAMS: {sortParams: {}, filterParams: {}, searchFormParams: {}, paginationParams: {}},
//   PAGE: {pageCount: '', totalCount: ''},
// });

describe('Component: GuitarScreen', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <GuitarScreen api={api}/>
      </BrowserRouter>,
    );

    expect(screen.getByTestId('characteristics')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
  });
});
