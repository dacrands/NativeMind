import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";


const ItemList = styled.FlatList`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid rgba(255,255,255,0.7);
`;

const ListView = styled.View`
  display: flex;
  flex-direction: row;
  background: rgba(255,255,255,0.7);
  margin-bottom: 5px;
  padding: 8px;
  border-radius: 5px;
`;

const ListText = styled.Text`
  color: rgba(0, 0, 0, 0.6);
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
