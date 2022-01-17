import {render, screen} from '@testing-library/react';
import Loading from './loading';

describe('Component: Loading', () => {
  it('should render correctly', () => {
    render(
      <Loading/>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  });
});
