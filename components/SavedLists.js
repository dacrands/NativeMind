import React from 'react';
import { Text, View, FlatList, TouchableHighlight, Alert } from "react-native";
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
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.lists}
          renderItem={({item}) => <RenderLists title={item.date} list={item.data} id={item.id} removeList={this.removeList} />}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

const RenderLists = (props) => (
  <View style={{ padding: 20, margin: 5, borderColor: 'black', borderWidth: 1 }}>
    <Text style={{ fontWeight: 'bold', marginBottom: 16 }}>{props.title}</Text>
    <FlatList
      data={props.list}
      renderItem={({item}) => <Text style={{ marginBottom: 8 }}>{item.title}</Text>}
      keyExtractor={item => item.id.toString()}
    /> 
    <TouchableHighlight 
      onPress={() => props.removeList(props.id)}
      style={{ backgroundColor: 'red', marginTop: 10, padding: 10}}
    >
      <Text style={{ color: 'white', textAlign: 'center'}}>{props.id}</Text>
    </TouchableHighlight>
  </View>
)
