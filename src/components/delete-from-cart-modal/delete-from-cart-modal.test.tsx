import DeleteFromCartModal from './delete-from-cart-modal';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { emptyGuitar } from '../../const';
import thunk, {ThunkDispatch} from 'redux-thunk';

describe('Component: DeleteFromCartModal', () => {
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

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DeleteFromCartModal
            data = {emptyGuitar}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
});
