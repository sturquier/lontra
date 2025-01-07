import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from './checkbox'
 
describe('Checkbox', () => {
  const defaultProps = {
    id: '1',
    isChecked: false,
    onChangeCallback: vi.fn()
  }

  it('renders a checkbox', () => {
    const props = { ...defaultProps }
    render(<Checkbox {...props} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('id', 'checkbox-1');
  });

  it('renders a checked checkbox', () => {
    const props = { ...defaultProps, isChecked: true }
    render(<Checkbox {...props} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('handles onChangeCallback event', async () => {
    const props = { ...defaultProps }
    render(<Checkbox {...props} />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(props.onChangeCallback).toHaveBeenCalled();
  });
})