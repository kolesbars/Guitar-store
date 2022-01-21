import GuitarScreen from './guitar-screen';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import { createAPI } from '../../services/api';


const api = createAPI();

describe('Component: GuitarScreen', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <GuitarScreen api={api}/>
      </BrowserRouter>,
    );

    expect(screen.getByTestId('characteristics')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
  });
});
