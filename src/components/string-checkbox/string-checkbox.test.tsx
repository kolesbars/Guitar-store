import StringCheckbox from './string-checkbox';
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

describe('Component: StringCheckbox', () => {
  it('should render correctly', () => {

    const cb =jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <StringCheckbox
            count={4}
            onHandleStringCount={cb}
            currentStrings={[]}
            currentTypes= {[]}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId('string-checkbox')).toBeInTheDocument();
  });
});
