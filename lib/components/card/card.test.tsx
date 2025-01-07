import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { VIEW_MODE } from '@utils/card';
import { articleMock } from '@utils/mocks/article';
import Card from './card'
 
describe('Card', () => {
  const defaultProps = {
    mode: VIEW_MODE.LIST,
    article: articleMock,
    toggleFavoriteCallback: vi.fn(),
    unlinkTagCallback: vi.fn(),
    openTagsLinkDialogCallback: vi.fn()
  }

  it('renders a listCard', () => {
    const props = { ...defaultProps }
    render(<Card {...props} />);

    const title = screen.getByRole('heading', { name: articleMock.title, level: 3 });
    expect(title).toHaveTextContent(articleMock.title);
  });

  it('renders a gridCard', () => {
    const props = { ...defaultProps, mode: VIEW_MODE.GRID }
    render(<Card {...props} />);

    const title = screen.getByRole('heading', { name: articleMock.title, level: 3 });
    expect(title).toHaveTextContent(articleMock.title);
  });
})