import { fireEvent, render, screen } from '@testing-library/react';
import { LinkProps } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Sorting from '../components/Sorting';

vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }: LinkProps) => (
    <a href={typeof to === 'string' ? to : undefined} {...props}>
      {children}
    </a>
  ),
}));

describe('Renders Sorting correctly', async () => {
  beforeEach(() => {
    render(<Sorting sortingOption="default" onSortChange={() => {}} />);
  });
  it('Dropdown sort component works correctly', () => {
    const nosort = screen.getByText('No Sorting');
    expect(nosort).not.toBeNull;
    fireEvent.mouseDown(nosort);
    fireEvent.click(screen.getByText('Prep Time'));
    const preptime = screen.getByText('Prep Time');
    expect(preptime).not.toBeNull;
    fireEvent.mouseDown(preptime);
    fireEvent.click(screen.getByText('Name'));
    const name = screen.getByText('Name');
    expect(name).not.toBeNull;
  });
});

describe('Snapshot testing of Sorting', async () => {
  it('should perform snapshot test Sorting', async () => {
    const navbar = render(<Sorting sortingOption="default" onSortChange={() => {}} />);
    expect(navbar).toMatchSnapshot();
  });
});
