import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Chip from './chip'
 
describe('Chip', () => {
  const props = {
    onDeleteCallback: vi.fn()
  }

  it('renders a chip', () => {
    const children = 'Basic chip';
    render(<Chip {...props}>{children}</Chip>);

    const chip = screen.getByRole('img');
    expect(chip).toBeDefined();
  });

  it('handles onDeleteCallback event', async () => {
    const children = 'Chip with onDeleteCallback';
    render(<Chip {...props}>{children}</Chip>);

    const chip = screen.getByRole('img');
    await userEvent.click(chip);
    expect(props.onDeleteCallback).toHaveBeenCalled();
  });
})