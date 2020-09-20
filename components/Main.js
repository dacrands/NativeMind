import styled from "styled-components/native";


const Header = styled.Text`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: bold;
  color: #ffffff;
  font-size: 28;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.8)'
})`
  height: 50px;
  padding: 12px 0;
  border-radius: 5px;
  font-size: 18;
  color: #ffffff;
`;

const MainView = styled.View`
  padding: 10px;
  padding-top: 50px;
  padding-bottom: 80px;
  flex: 1;
`;

const BigBtn = styled.TouchableOpacity`
  background: rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SubmitText = styled.Text`
  color: #ffffff;
  font-size: 18;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
`;

export { Header, SubmitText, MainView, BigBtn, Input };
