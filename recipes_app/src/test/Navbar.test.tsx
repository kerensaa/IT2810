import { render, screen } from '@testing-library/react';
import { LinkProps } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Navbar from '../components/Navbar';

vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }: LinkProps) => (
    <a href={typeof to === 'string' ? to : undefined} {...props}>
      {children}
    </a>
  ),
}));

describe('Renders Navbar correctly', async () => {
  beforeEach(() => {
    render(<Navbar />);
  });
  it('Renders NavBar correctly', () => {
    const logo = screen.getByText('Recipes4You');
    expect(logo).not.toBeNull;
  });
});

describe('Snapshot testing of Navbar', async () => {
  it('should perform snapshot test Navbar', async () => {
    const navbar = render(<Navbar />);
    expect(navbar).toMatchSnapshot();
  });
});
