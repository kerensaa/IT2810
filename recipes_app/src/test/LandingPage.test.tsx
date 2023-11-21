import LandingPage from '../pages/LandingPage';
import { render, screen } from '@testing-library/react';
import { LinkProps } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }: LinkProps) => (
    <a href={typeof to === 'string' ? to : undefined} {...props}>
      {children}
    </a>
  ),
}));

describe('Renders LandingPage correctly', async () => {
  beforeEach(() => {
    render(<LandingPage />);
  });
  it('Renders LandingPage correctly', () => {
    const sort = screen.getByText('No Sorting');
    expect(sort).not.toBeNull;
  });
});

describe('Snapshot testing of LandingPage', async () => {
  it('should perform snapshot test LandingPage', async () => {
    const landingPage = render(<LandingPage />);
    expect(landingPage).toMatchSnapshot();
  });
});
