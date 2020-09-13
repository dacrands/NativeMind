import styled from "styled-components/native";
import COLORS from "../assets/colors";

const Header = styled.Text`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: bold;
  color: ${COLORS.lightPurple};
  font-size: 28;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  background: ${COLORS.veryLightPurple};
  height: 50px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  font-size: 18;
  color: yellow;
`;

const MainView = styled.View`
  background: ${COLORS.darkPurple};
  padding: 10px;
  padding-top: 50px;
  padding-bottom: 80px;
  flex: 1;
`;

const BigBtn = styled.TouchableOpacity`
  background: orange;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SubmitText = styled.Text`
  color: ${COLORS.purple};
  font-size: 18;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
`;

export { Header, SubmitText, MainView, BigBtn, Input };
