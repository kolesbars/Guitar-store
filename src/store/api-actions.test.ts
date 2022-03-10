import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { createAPI} from '../services/api';
import { APIRoute} from '../const';
import { emptyGuitar, emptyComment, emptyCommentPost } from '../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import {
  loadGuitarData,
  loadCurrentGuitarComments,
  addGuitarComment,
  loadGuitarList,
  loadSimilarGuitars,
  loadMaxMinPrices,
  loadGuitarComments,
  applyCoupon
} from './api-actions';
import {
  updateGuitarsList,
  updateGuitarData,
  updateCurrentGuitarComments,
  addNewGuitarComment,
  setCommentSendigStatusFalse,
  setLoadedStatusFalse,
  updateSimilarGuitarsList,
  updateGuitarsPrices,
  updateGuitarsComents,
  updateDiscount,
  setIsSuccessValue
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

  it('should load guitar data', async () => {
    const store = mockStore();
    const mockGuitarData = emptyGuitar;
    const mockId = '1';

    mockAPI
      .onGet(`${APIRoute.Guitars}/${mockId}`)
      .reply(200, mockGuitarData);

    await store.dispatch(loadGuitarData(mockId));

    expect(store.getActions()).toEqual([
      updateGuitarData(mockGuitarData),
    ]);
  });

  it('should load current guitars comments', async () => {
    const store = mockStore();
    const mockGuitarComments = [emptyComment];
    const mockId = '1';

    mockAPI
      .onGet(`${APIRoute.Guitars}/${mockId}/comments`)
      .reply(200, mockGuitarComments);

    await store.dispatch(loadCurrentGuitarComments(mockId));

    expect(store.getActions()).toEqual([
      updateCurrentGuitarComments(mockGuitarComments),
    ]);
  });

  it('should add new comment', async () => {
    const store = mockStore();
    const mockGuitarComment = emptyComment;
    const mockGuitarCommentPost = emptyCommentPost;

    mockAPI
      .onPost(APIRoute.Comments)
      .reply(200, mockGuitarComment);

    await store.dispatch(addGuitarComment(mockGuitarCommentPost));

    expect(store.getActions()).toEqual([
      setCommentSendigStatusFalse(),
      addNewGuitarComment(mockGuitarComment),
    ]);
  });

  it('should applay coupon', async () => {
    const store = mockStore();
    const mockDiscount = 15;
    const mockCouponPost = {
      coupon: 'middle-444',
    };

    mockAPI
      .onPost(APIRoute.Coupons)
      .reply(200, mockDiscount);

    await store.dispatch(applyCoupon(mockCouponPost));

    expect(store.getActions()).toEqual([
      setIsSuccessValue(null),
      updateDiscount(mockDiscount),
      setIsSuccessValue(true),
    ]);
  });
});
