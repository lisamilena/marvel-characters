import { describe, expect, test } from 'vitest';

import { render, screen } from '@/tests/react-test-utils';

import Home from './page';

describe('Home Page', () => {
  test('displays the results counter', () => {
    render(<Home />);

    expect(screen.getByText('RESULTS')).toBeInTheDocument();
  });
});
