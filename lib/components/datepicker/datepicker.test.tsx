import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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
    await waitFor(async () =>
      await userEvent.type(datepicker, newDate)
    );
    expect(props.onChangeCallback).toHaveBeenCalled();
  });
})