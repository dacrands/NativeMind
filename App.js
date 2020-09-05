import React from 'react';
import { Text, Button } from 'react-native'
import styled  from 'styled-components/native'

const colors = {
  /* Color Theme Swatches in Hex */
  veryDarkPurple: '#6A0DC4',
  darkPurple: '#8D18FF',
  purple: '#A240FC',
  lightPurple: '#B850FF',
  veryLightPurple: '#D168FF'
}

export default class App extends React.Component {
  render() {
    return (
      <MainView>
        <HeaderText>Gratitude</HeaderText>
        <Input
          placeholder="What are you thankful for"
        />
        <Submit>
          <SubmitText>Submit</SubmitText>
        </Submit>
      </MainView>
    );
  }
}

const Input = styled.TextInput`
  background: ${colors.veryLightPurple};
  height: 50px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  font-size: 18;
  color: white;
`

const HeaderText = styled.Text`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: bold;
  color: ${colors.lightPurple};
  font-size: 28;
`

const MainView = styled.View`
  background: ${colors.veryDarkPurple};
  padding-top: 50px;
  flex: 1;
`

const Submit = styled.TouchableOpacity`
  background: orange;
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
`

const SubmitText = styled.Text`
  color: ${colors.purple};
  font-size: 18;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
`



