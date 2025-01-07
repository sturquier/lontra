import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  it('handles toggleFavoriteCallback event', async () => {
    render(<GridCard {...props} />);

    const favoriteIcon = screen.getByTestId('gridCard-favorite-icon');
    await userEvent.click(favoriteIcon);
    expect(props.toggleFavoriteCallback).toHaveBeenCalled();
  });

  it('handles openTagsLinkDialogCallback event', async () => {
    render(<GridCard {...props} />);

    const tagIcon = screen.getByTestId('gridCard-tag-icon');
    await userEvent.click(tagIcon);
    expect(props.openTagsLinkDialogCallback).toHaveBeenCalled();
  });
})