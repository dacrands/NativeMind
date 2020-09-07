import React from 'react';
import { Keyboard, Alert } from 'react-native'
import _uniqueId from 'lodash/uniqueId';
import { Header, SubmitText, MainView, BigBtn, Input } from './components/Main'
import { ItemList, Item } from './components/ListItems'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clearData = this.clearData.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
    this.textInput = React.createRef();
    this.state = {
      currItem: "",
      data: [
        {title: "test",
        id: 1234},
        {title: "test2",
        id: 1235},
      ]
    }
  }

  clearAlert = () => (
    Alert.alert(
    "Clear List",
    "Are you sure you want to clear your list?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", 
        onPress: () => this.setState({ data: [] }) }
    ],
    { cancelable: false }
  ))

  renderItem = ({ item }) => (
    <Item title={item.title} id={item.id} removeItem={this.removeItem} />
  )

  clearData = (() => (
    this.setState({ data: [] })
  ))

  addItem = ({ item }) => (
    this.setState({ data: this.state.data.push(item) })
  )

  removeItem = ((id) => (
    this.setState({
      data: this.state.data.filter(item => item.id != id)
    })
  ))

  render() {
    return (
      <MainView>
        <Header>Gratitude</Header>
        <Input
          ref={this.textInput}
          placeholder="What are you thankful for"
          onChangeText={(currItem) => this.setState({ currItem })}
          value={this.state.currItem}
        />
        <BigBtn onPress={() => this.setState(state => {
          Keyboard.dismiss();
          if(state.currItem === '') {
            alert('Please enter a value');
            return;
          }
          const data = this.state.data.concat({
            id: _uniqueId(),
            title: state.currItem,
          })
          return {
            data,
            currItem: ''
          }
        })}>
          <SubmitText>Submit</SubmitText>
        </BigBtn>
        <ItemList 
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
        />
        <BigBtn onPress={this.clearAlert}>
          <SubmitText>Clear List</SubmitText>
        </BigBtn>
      </MainView>
    );
  }
}







