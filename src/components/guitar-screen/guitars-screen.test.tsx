import GuitarScreen from './guitar-screen';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

describe('Component: GuitarScreen', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <GuitarScreen/>
      </BrowserRouter>,
    );

    expect(screen.getByTestId('characteristics')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
  });
});
