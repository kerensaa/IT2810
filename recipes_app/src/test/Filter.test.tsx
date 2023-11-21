import { fireEvent, render, screen } from '@testing-library/react';
import { LinkProps } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Filtering from '../components/Filtering';

vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }: LinkProps) => (
    <a href={typeof to === 'string' ? to : undefined} {...props}>
      {children}
    </a>
  ),
}));

describe('Renders Filtering correctly', async () => {
  beforeEach(() => {
    render(<Filtering courseOption="default" onCourseChange={() => {}} />);
  });
  it('Dropdown Filter component works correctly', () => {
    const nofilter = screen.getByText('No filter');
    expect(nofilter).not.toBeNull;
    fireEvent.mouseDown(nofilter);
    fireEvent.click(screen.getByText('Dinner'));
    const dinner = screen.getByText('Dinner');
    expect(dinner).not.toBeNull;
    fireEvent.mouseDown(dinner);
    fireEvent.click(screen.getByText('Snack'));
    const snack = screen.getByText('Snack');
    expect(snack).not.toBeNull;
  });
});

describe('Snapshot testing of Filtering', async () => {
  it('should perform snapshot test Filtering', async () => {
    const filtering = render(<Filtering courseOption="default" onCourseChange={() => {}} />);
    expect(filtering).toMatchSnapshot();
  });
});
