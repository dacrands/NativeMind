import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { mount } from 'enzyme'
import SavedLists  from '../../src/components/SavedLists';
import { Alert } from 'react-native';


describe('<SavedLists />', () => {
    it('has 1 children', async () => {
        const tree = renderer.create(<SavedLists />).toJSON();
        await act(
            async () => {
                expect(tree.children.length).toBe(1);
            }
        )
    });
})