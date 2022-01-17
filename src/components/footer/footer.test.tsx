import Footer from './footer';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

describe('Component: Footer', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <Footer/>
      </BrowserRouter>,
    );

    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
  });
});
