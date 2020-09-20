import React from "react";
import { TouchableHighlight } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';

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
  padding: 12px 6px;
  border-radius: 5px;
`;

const ListText = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  width: 96%;
  padding-right: 10;
  line-height: 20;
`;


const Item = ({ title, id, removeItem }) => (
  <ListView>
    <ListText>{title}</ListText>
    <TouchableHighlight onPress={() => removeItem(id)}>
      <Ionicons name="md-close" size={20} color="#11998e" />
    </TouchableHighlight>
  </ListView>
);

export { ItemList, Item };
