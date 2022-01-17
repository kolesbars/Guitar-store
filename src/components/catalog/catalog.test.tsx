import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { APIRoute} from '../../const';
//import {configureMockStore} from '@jedmao/redux-mock-store';
//import {Action} from 'redax';
//import { makeFakeGuitar } from '../../utils/mock';
import { updateGuitarsList, updateTotalCount } from '../../store/action';
import { guitarsData } from '../../store/guitars-data/guitars-data';
import { pageCount } from '../../store/page-count/page-count';
import { emptyGuitar } from '../../const';
import Catalog from './catalog';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
//import { State } from '../../types/state';

const api = createAPI();

const mockStore = configureMockStore();

const store = mockStore({
  GUITARS: {guitarsList: []},
  PARAMS: {sortParams: {}, filterParams: {}, searchFormParams: {}, paginationParams: {}},
  PAGE: {pageCount: '', totalCount: ''},
});

describe('Async action', () => {

  const mockAPI = new MockAdapter(api);

  // const mockStore = configureMockStore<
  //   State,
  //   Action,
  //   >();

  it('should load guitar list', async () => {
    const mockGuitars = [emptyGuitar];
    const totalCount = '27';

    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, mockGuitars)
      .onHead(totalCount);

    const guitarDataState = { guitarsList: []};
    const pageCountState = {
      pageCount: '1',
      totalCount: '',
    };

    expect(guitarsData(guitarDataState, updateGuitarsList(mockGuitars)))
      .toEqual({guitarsList: [emptyGuitar]});

    expect(pageCount(pageCountState, updateTotalCount(totalCount)))
      .toEqual({
        pageCount: '1',
        totalCount: '27',
      });
  });
});

describe('Component: Catalog', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Catalog api={api}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });
});
