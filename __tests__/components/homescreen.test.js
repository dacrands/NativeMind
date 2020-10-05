import React from 'react';
import renderer, { act } from 'react-test-renderer';

import HomeScreen from '../../src/components/HomeScreen';

jest.mock('@react-navigation/native'); 
jest.useFakeTimers()

describe('<HomeScreen />', () => {
    it('has 5 children', async () => {
        const tree = renderer.create(<HomeScreen />).toJSON();
        console.log(tree)
        await act(
            async () => {
                expect(tree.children.length).toBe(5);
            }
        )
    });
});