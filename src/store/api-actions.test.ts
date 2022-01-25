import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { createAPI} from '../services/api';
import { APIRoute} from '../const';
import { emptyGuitar } from '../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import {
  loadGuitarList,
  loadSimilarGuitars,
  loadMaxMinPrices,
  loadGuitarComments
} from './api-actions';
import {
  setLoadedStatusFalse,
  updateGuitarsList,
  updateSimilarGuitarsList,
  updateGuitarsPrices,
  updateGuitarsComents
} from '../store/action';

describe('Async action', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should load guitar list', async () => {
    const store = mockStore();
    const mockGuitars = [emptyGuitar];
    const mockSearchParams = 'type=ukulele';

    mockAPI
      .onGet(`${APIRoute.Guitars}?${mockSearchParams}`)
      .reply(200, mockGuitars);

    await store.dispatch(loadGuitarList(mockSearchParams));

    expect(store.getActions()).toEqual([
      setLoadedStatusFalse(),
      updateGuitarsList(mockGuitars),
    ]);
  });

  it('should load similar guitar list', async () => {
    const store = mockStore();
    const mockGuitars = [emptyGuitar];
    const mockSearchParams = 'чест';

    mockAPI
      .onGet(`${APIRoute.Guitars}?name_like=${mockSearchParams}`)
      .reply(200, mockGuitars);

    await store.dispatch(loadSimilarGuitars(mockSearchParams));

    expect(store.getActions()).toEqual([
      updateSimilarGuitarsList(mockGuitars),
    ]);
  });

  it('should load max and min guitar prices', async () => {
    const store = mockStore();
    const mockGuitars = [
      {
        'price': 1000,
      },
      {
        'price': 2000,
      }];

    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, mockGuitars);

    await store.dispatch(loadMaxMinPrices());

    expect(store.getActions()).toEqual([
      updateGuitarsPrices({
        min: '1000',
        max: '2000',
      }),
    ]);
  });

  it('should load guitar comments', async () => {
    const store = mockStore();
    const mockCount = [{}];

    mockAPI
      .onGet(`${APIRoute.Guitars}/1/comments`)
      .reply(200, mockCount);

    await store.dispatch(loadGuitarComments(1));

    expect(store.getActions()).toEqual([
      updateGuitarsComents({
        id: 1,
        count: 1,
      }),
    ]);
  });
});
