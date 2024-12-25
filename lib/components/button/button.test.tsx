import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './button'
 
describe('Button', () => {
  it('renders a button', () => {
    const children = 'Basic button';
    render(<Button>{children}</Button>);

    const button = screen.getByRole('button', { name: children });
    expect(button).toBeDefined();
  });

  it('renders a submit button', () => {
    const children = 'Submit button';
    render(<Button type='submit'>{children}</Button>);
    
    const button = screen.getByRole('button', { name: children });
    expect(button).toHaveAttribute('type', 'submit')
  });

  it('renders a disabled button', () => {
    const children = 'Disabled button';
    render(<Button disabled>{children}</Button>);

    const button = screen.getByRole('button', { name: children });
    expect(button).toBeDisabled();
  });

  it('applies a className', () => {
    const children = 'Button with className';
    const className = 'secondary';
    render(<Button className={className}>{children}</Button>);

    const button = screen.getByRole('button', { name: children });
    expect(button).toHaveClass(new RegExp(`button-${className}`))
  });

  it('renders with an icon', () => {
    const children = 'Button with icon';
    const icon = {
      src: '/icons/email.svg',
      alt: 'Email icon'
    }
    render(<Button icon={icon}>{children}</Button>);

    const image = screen.getByRole('img', { name: icon.alt });
    expect(image).toBeDefined();
  });

  it('handles onClick event', async () => {
    const children = 'Button with onClick callback';
    const onClickCallback = vi.fn();
    render(<Button onClickCallback={onClickCallback}>{children}</Button>);

    const button = screen.getByRole('button', { name: children});
    await userEvent.click(button);
    expect(onClickCallback).toHaveBeenCalled();
  });
})