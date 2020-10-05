import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { mount } from 'enzyme'
import { HomeScreen } from '../../src/components/HomeScreen';
import { Input } from "../../src/styles/Main";

jest.mock('@react-navigation/native'); 
jest.useFakeTimers()

describe('<HomeScreen />', () => {
    it('has 5 children', async () => {
        const tree = renderer.create(<HomeScreen />).toJSON();
        await act(
            async () => {
                expect(tree.children.length).toBe(5);
            }
        )
    });

    it('Input change should update state.currItem', async () => {
        const component = mount(<HomeScreen/>)
        component
            .find('TextInput')
            .hostNodes()
            .props()
            .onChangeText('test')
        const currItem = component.find(HomeScreen).state().currItem;
        expect(currItem).toEqual('test');
    });
});