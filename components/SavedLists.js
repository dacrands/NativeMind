import React from 'react';
import { View, FlatList, Alert } from "react-native";
import { BigBtn, SubmitText } from "./Main";
import { ItemList, ListView, ListText } from "./ListItems";
import { getData, storeData } from '../common/storage'


export default class SavedLists extends React.Component  {
  constructor(props) {
    super(props);
    this.removeList = this.removeList.bind(this);
    this.state = {
      lists: []
    };
  }

  async componentDidMount() {
    const currLists = await getData("lists");
    if (currLists !== null) {
      this.setState({ lists: currLists });
      return;
    } else {
      console.log("setting state");
      storeData("lists", []);
    }
  }

  removeList = id => {
    Alert.alert(
      "Delete List",
      "Are you sure you want to delete this list?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel delete list"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.setState({
              lists: this.state.lists.filter(list => list.id != id)
            })
            storeData("lists", this.state.lists)
          }
        }
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#38ef7d', padding: 10 }}>
        <ItemList
          data={this.state.lists}
          renderItem={({item}) => <RenderLists title={item.date} list={item.data} id={item.id} removeList={this.removeList} />}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

const RenderLists = (props) => (
  <ListView style={{ margin: 5, flexDirection: 'column', padding: 20}}>
    <ListText style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>{props.title}</ListText>
    <FlatList
      data={props.list}
      renderItem={({item, index}) => 
        <ListText style={{ marginBottom: 8 }}>
          {index + 1}). {item.title}
        </ListText>}
      keyExtractor={item => item.id.toString()}
    /> 
    <BigBtn
      onPress={() => props.removeList(props.id)}
      style={{ backgroundColor: 'rgba(235, 184, 29, 0.9)', marginBottom: 0, marginTop: 15 }}
    >
      <SubmitText style={{ fontSize: 12}}>Delete List</SubmitText>
    </BigBtn>
  </ListView>
)
