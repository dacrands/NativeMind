import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import COLORS from "../assets/colors";

const ItemList = styled.FlatList`
  background: ${COLORS.veryDarkPurple};
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ListView = styled.View`
  display: flex;
  flex-direction: row;
  background: ${COLORS.purple};
  margin-bottom: 5px;
  padding: 8px;
`;

const ListText = styled.Text`
  color: yellow;
  flex-grow: 1;
`;

const CloseBtn = styled.TouchableHighlight`
  color: yellow;
  width: 20px;
`;

const Item = ({ title, id, removeItem }) => (
  <ListView>
    <ListText>{title}</ListText>
    <CloseBtn onPress={() => removeItem(id)}>
      <Text>{"\u274C"}</Text>
    </CloseBtn>
  </ListView>
);

export { ItemList, Item };
