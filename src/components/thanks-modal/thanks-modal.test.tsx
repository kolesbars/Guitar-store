import ThanksModal from './thanks-modal';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { emptyGuitar } from '../../const';
import thunk, {ThunkDispatch} from 'redux-thunk';

describe('Component: ThanksModal', () => {
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
    });

    const cb = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThanksModal
            onSetIsThanksModalHidden={cb}
            id={1}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за ваш отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/К покупкам/i)).toBeInTheDocument();
  });
});
