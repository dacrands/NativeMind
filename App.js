import React from 'react';
import { Keyboard, Alert, Text } from 'react-native'
import styled  from 'styled-components/native'
import _uniqueId from 'lodash/uniqueId';

const colors = {
  /* Color Theme Swatches in Hex */
  veryDarkPurple: '#6A0DC4',
  darkPurple: '#8D18FF',
  purple: '#A240FC',
  lightPurple: '#B850FF',
  veryLightPurple: '#D168FF'
}



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
        <HeaderText>Gratitude</HeaderText>
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
        <MainList 
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

const Item = ({ title, id, removeItem }, ) => (
  <ListView>
    <ListText>
      {title}
    </ListText>
    <CloseBtn onPress={() => removeItem(id)}>
      <Text>{"\u274C"}</Text>
    </CloseBtn>
  </ListView>
);

const Input = styled.TextInput`
  background: ${colors.veryLightPurple};
  height: 50px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  font-size: 18;
  color: yellow;
`

const ListView = styled.View`
  display: flex;
  flex-direction: row;
  background: ${colors.purple};
  margin-bottom: 5px;
  padding: 8px;
`

const ListText = styled.Text`
  color: yellow;
  flex-grow: 1;
`

const HeaderText = styled.Text`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: bold;
  color: ${colors.lightPurple};
  font-size: 28;
  margin-bottom: 20px;
`

const MainList = styled.FlatList`
  background: ${colors.veryDarkPurple};
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
`

const MainView = styled.View`
  background: ${colors.darkPurple};
  padding: 10px;
  padding-top: 50px;
  padding-bottom: 80px;
  flex: 1;
`

const BigBtn = styled.TouchableOpacity`
  background: orange;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`

const SubmitText = styled.Text`
  color: ${colors.purple};
  font-size: 18;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
`

const CloseBtn = styled.TouchableHighlight`
  color: yellow;
  width: 20px;
`


