import React from 'react';
import { Keyboard } from 'react-native'
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
    this.clearData = this.clearData.bind(this);
    this.textInput = React.createRef();
    this.state = {
      currItem: "",
      data: []
    }
  }
  renderItem = ({ item }) => (
    <Item title={item.title} />
  )

  clearData = (() => (
    this.setState({ data: [] })
  ))
  addItem = ({ item }) => (
    this.setState({ data: this.state.data.push(item) })
  )
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
          keyExtractor={item => item.id}
        />
        <BigBtn onPress={this.clearData}>
          <SubmitText>Clear List</SubmitText>
        </BigBtn>
      </MainView>
    );
  }
}

const Input = styled.TextInput`
  background: ${colors.veryLightPurple};
  height: 50px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  font-size: 18;
  color: white;
`
const Item = ({ title }) => (
  <ListText>{title}</ListText>
);

const ListText = styled.Text`
  color: yellow;
  background: ${colors.purple};
  margin-bottom: 5px;
  padding: 8px;
`

const HeaderText = styled.Text`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: bold;
  color: ${colors.lightPurple};
  font-size: 28;
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

const ClearDataBtn = styled.TouchableOpacity`

`


