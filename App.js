import React from 'react';
import { Text, View } from 'react-native'
import styled  from 'styled-components/native'

export default class App extends React.Component {
  render() {
    return (
      <MainView>
        <Text>This Is Really Cool</Text>
      </MainView>
    );
  }
}

const MainView = styled.View`
  background: tan;
  padding-top: 50px;
  flex: 1;
`

const LoginView = styled.View`
  color: #EDFAFD;
  flex: 1;
  background: #042291;
  justify-content: center;
  align-items: center;
`

const LoginInput = styled.TextInput`
  background: white;
  width: 40%;
  margin-bottom: 8px;
  font-size: 20px;
  padding: 5px;
`

const Submit = styled.TouchableHighlight`
  background: #3DDAD7;
  /* padding: 5%; */

`

const SubmitText = styled.Text`
  color: #f9f9f9;
  font-size: 20;
  padding: 5px;
`

