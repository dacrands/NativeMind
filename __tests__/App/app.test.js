import React from 'react';
import renderer, { act } from 'react-test-renderer';

import App from '../../App';

jest.useFakeTimers()

describe('<App />', () => {
  it('has 1 child', async () => {
    const tree = renderer.create(<App />).toJSON();
    await act(
        async () => {
            expect(tree.children.length).toBe(1);
        }
    )
  });
});