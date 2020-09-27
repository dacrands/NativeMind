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
  placeholderTextColor: "rgba(255,255,255,0.8)",
})`
  height: 50px;
  padding: 12px 0;
  border-radius: 5px;
  font-size: 18;
  color: #ffffff;
`;

const MainView = styled.View`
  flex: 1;
  padding: 10px;
  padding-bottom: 20px;
  background: #38ef7d;
`;

const BigBtn = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const CircleBtn = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 70px;
  height: 70px;
  border-radius: 50;
`;

const SubmitText = styled.Text`
  color: #ffffff;
  font-size: 18;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
`;

export { Header, SubmitText, MainView, BigBtn, Input, CircleBtn };
