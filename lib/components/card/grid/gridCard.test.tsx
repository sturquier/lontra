import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { articleMock } from '@utils/mocks/article';
import GridCard from './gridCard'
 
describe('GridCard', () => {
  const props = {
    article: articleMock,
    toggleFavoriteCallback: vi.fn(),
    unlinkTagCallback: vi.fn(),
    openTagsLinkDialogCallback: vi.fn()
  }

  it('renders a gridCard', () => {
    render(<GridCard {...props} />);

    const title = screen.getByRole('heading', { name: articleMock.title, level: 3 });
    expect(title).toHaveTextContent(articleMock.title);
  });
})