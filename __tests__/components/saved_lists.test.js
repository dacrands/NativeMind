import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { mount } from 'enzyme'
import SavedLists  from '../../src/components/SavedLists';
import { Alert } from 'react-native';

jest.mock('@react-navigation/native'); 
jest.useFakeTimers()
jest.spyOn(Alert, 'alert')
jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('<SavedLists />', () => {
    it('has 1 child', async () => {
        const tree = renderer.create(<SavedLists />).toJSON();
        await act(
            async () => {
                expect(tree.children.length).toBe(1);
            }
        )
    });

    it('Deletes a list by id', async () => {
        const component = mount(<SavedLists/>)
        const testList = [{
            title: 'Test Title',
            list: [ { id: 2, title: "Test"} ],
            id: 1
        }]

        component.setState({ lists: testList })

        component
            .find(`#delete-list-${testList[0].id}-btn`)
            .at(1)
            .props()
            .onPress()

        Alert.alert.mock.calls[0][2][1].onPress()
        expect(component.find(SavedLists).state().lists).toEqual([])
    });

    it('Does not delete list if delete cancelled', async () => {
        const component = mount(<SavedLists/>)
        const testList = [{
            title: 'Test Title',
            list: [ { id: 2, title: "Test"} ],
            id: 1
        }]

        component.setState({ lists: testList })

        component
            .find(`#delete-list-${testList[0].id}-btn`)
            .at(1)
            .props()
            .onPress()

        Alert.alert.mock.calls[0][2][0].onPress()
        expect(component.find(SavedLists).state().lists).toEqual(testList)
    });

})