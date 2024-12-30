import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tag from './tag'
 
describe('Tag', () => {
  const props = {
    onDeleteCallback: vi.fn()
  }

  it('renders a tag', () => {
    const children = 'Basic tag';
    render(<Tag {...props}>{children}</Tag>);

    const tag = screen.getByRole('img');
    expect(tag).toBeDefined();
  });

  it('handles onClick event', async () => {
    const children = 'Tag with onClick callback';
    render(<Tag {...props}>{children}</Tag>);

    const tag = screen.getByRole('img');
    await userEvent.click(tag);
    expect(props.onDeleteCallback).toHaveBeenCalled();
  });
})