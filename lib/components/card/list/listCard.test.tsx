import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  it('handles toggleFavoriteCallback event', async () => {
    render(<ListCard {...props} />);

    const favoriteIcon = screen.getByTestId('listCard-favorite-icon');
    await userEvent.click(favoriteIcon);
    expect(props.toggleFavoriteCallback).toHaveBeenCalled();
  });

  it('handles openTagsLinkDialogCallback event', async () => {
    render(<ListCard {...props} />);

    const tagIcon = screen.getByTestId('listCard-tag-icon');
    await userEvent.click(tagIcon);
    expect(props.openTagsLinkDialogCallback).toHaveBeenCalled();
  });
})