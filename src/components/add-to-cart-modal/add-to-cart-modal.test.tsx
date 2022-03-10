import AddToCartModal from './add-to-cart-modal';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { emptyGuitar } from '../../const';
import thunk, {ThunkDispatch} from 'redux-thunk';

describe('Component: AddToCartModal', () => {
  it('should render correctly', () => {

    const api = createAPI();

    const middlewares = [thunk.withExtraArgument(api)];

    const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

    const store = mockStore({
      GUITAR: {guitarData: emptyGuitar, isDataLoaded: true, isCommentsLoaded: true, isCommentSent: false,comments: []},
      GUITARS: {guitarsList: []},
      PARAMS: {sortParams: {}, filterParams: {}, searchFormParams: {}, paginationParams: {}},
      PAGE: {pageCount: '', totalCount: ''},
      CART: {guitarsID: [], totalPrices: [],
        guitarsQuantity: [],
        discount: 0,
        isSuccess: null,
        isDeleteFromCartModalHidden: true},
    });

    const cb = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddToCartModal
            data = {emptyGuitar}
            onSetIsAddToCartModalHidden={cb}
            onSetIsAddSuccessModalHidden={cb}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
  });
});
