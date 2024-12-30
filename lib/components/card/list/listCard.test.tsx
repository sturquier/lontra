import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { articleMock } from '@utils/mocks/article';
import ListCard from './listCard'
 
describe('ListCard', () => {
  const props = {
    article: articleMock,
    toggleFavoriteCallback: vi.fn(),
    unlinkTagCallback: vi.fn(),
    openTagsLinkDialogCallback: vi.fn()
  }

  it('renders a listCard', () => {
    render(<ListCard {...props} />);

    const title = screen.getByRole('heading', { name: articleMock.title, level: 3 });
    expect(title).toHaveTextContent(articleMock.title);
  });
})