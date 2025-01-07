import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Swiper from './swiper'
 
describe('Card', () => {
  const props = {
    slides: []
  }

  it('renders a swiper', () => {
    render(<Swiper {...props} />);

    const title = screen.getByTestId('swiper')
    expect(title).toBeDefined()
  });
})