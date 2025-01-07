import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePicker from './datepicker';
 
describe('DatePicker', () => {
  const props = {
    startDate: new Date(),
    onChangeCallback: vi.fn()
  }

  it('renders a datePicker', () => {
    render(<DatePicker {...props} />);

    const datepicker = screen.getByRole('textbox');
    expect(datepicker).toBeDefined();
  });

  it('handles onChangeCallback event', async () => {
    const newDate = 'January 01, 2025';
    render(<DatePicker {...props} />);

    const datepicker = screen.getByRole('textbox');
    await act(async () =>
      await userEvent.type(datepicker, `${newDate}{enter}`)
    );
    expect(props.onChangeCallback).toHaveBeenCalled();
  });
})