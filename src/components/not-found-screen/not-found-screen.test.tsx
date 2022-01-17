import NotFoundScreen from './not-found-screen';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <NotFoundScreen/>
      </BrowserRouter>,
    );

    expect(screen.getByText(/404 - The Page can not be found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go TO Homepage/i)).toBeInTheDocument();
  });
});
