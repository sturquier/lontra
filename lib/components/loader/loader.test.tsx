import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Loader from './loader'
 
describe('Loader', () => {
  it('renders a loader', () => {
    render(<Loader />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeDefined();
  });

  it('renders a full page', () => {
    render(<Loader fullPage />);

    const loader = screen.getByTestId('loader-global');
    expect(loader).toHaveClass(new RegExp('loader-global'))
  });
})