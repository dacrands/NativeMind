import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { mount } from 'enzyme'
import { HomeScreen } from '../../src/components/HomeScreen';
import { Alert } from 'react-native';

jest.mock('@react-navigation/native'); 
jest.useFakeTimers()
jest.spyOn(Alert, 'alert')

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

    it('Should add a new item to state.data on btn press', async () => {
        const component = mount(<HomeScreen/>)
        const testTitle = 'test'

        component.setState({ currItem : testTitle })

        component
            .find('#add-item-btn')
            .at(1)
            .props()
            .onPress()

        expect(component.find(HomeScreen).state().data[0].title).toEqual(testTitle);
    })

    it('Should add a new item to state.data on btn press', async () => {
        const component = mount(<HomeScreen/>)
        const testData = [ { id: 1, title: "Test"} ]

        component.setState({ data : testData })
        
        component
            .find('#clear-data-btn')
            .at(1)
            .props()
            .onPress()

        Alert.alert.mock.calls[0][2][1].onPress()
        expect(component.find(HomeScreen).state().data).toEqual([]);
    })

    it('Should remove an item by id', async () => {
        const component = mount(<HomeScreen/>)
        const testData = [ { id: "test", title: "Test"} ]

        component.setState({ data : testData })
        component.update()

        component
            .find('#test')
            .props()
            .removeItem('test')
        
        expect(component.find(HomeScreen).state().data).toEqual([])
    })
});