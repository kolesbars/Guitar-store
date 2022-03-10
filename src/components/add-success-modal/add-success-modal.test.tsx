import AddSuccessModal from './add-success-modal';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { emptyGuitar } from '../../const';
import thunk, {ThunkDispatch} from 'redux-thunk';

describe('Component: AddSuccessModal', () => {
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
          <AddSuccessModal
            onSetIsAddSuccessModalHidden={cb}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});
