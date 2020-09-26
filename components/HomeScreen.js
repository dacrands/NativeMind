import React from 'react';
import moment from 'moment';
import { Keyboard, Alert, View } from "react-native";
import { SubmitText, BigBtn, Input } from "./Main";
import { ItemList, Item } from "./ListItems";
import { getData, storeData } from '../common/storage'


export default class HomeScreen extends React.Component {
    constructor(props) {
      super(props);
      this.renderItem = this.renderItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.clearData = this.clearData.bind(this);
      this.storeList = this.storeList.bind(this);
      this.textInput = React.createRef();
      this.state = {
        currItem: "",
        data: []
      };
    }
  
    async componentDidMount() {
      const currData = await getData("data");
      if (currData !== null) {
        this.setState({ data: currData });
        return;
      } else {
        console.log("setting state");
        storeData("data", []);
      }
    }
    
    clearData = () =>
      Alert.alert(
        "Clear List",
        "Are you sure you want to clear your list?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", 
            onPress: () => {
              this.setState({ data: [] }) 
              storeData("data", []);
            }
          }
        ],
        { cancelable: false }
      );

      storeList = async () => {
        console.log("testing")
        let currLists = await getData("lists");
        if (currLists === null) {
          storeData("lists", [])
        }
        currLists = await getData("lists");
        const newLists = currLists.concat({
          id: "list-" + new Date().getTime(),
          date: moment().format('MMMM Do YYYY, h:mm:ss a'),
          data: this.state.data
        })
        await storeData("lists", newLists)
      }
  
    renderItem = ({ item }) => (
      <Item title={item.title} id={item.id} removeItem={this.removeItem} />
    );
  
    addItem = async () => {
      this.setState(state => {
        Keyboard.dismiss();
        if (state.currItem === "") {
          alert("Please enter a value");
          return;
        }
        const data = this.state.data.concat({
          id: new Date().getTime(),
          title: state.currItem
        });
        // Set storage here to avoid race condition
        storeData("data", data);
        return {
          data,
          currItem: ""
        };
      });
    };
  
    removeItem = id =>
      this.setState({
        data: this.state.data.filter(item => item.id != id)
      });
  
    render() {
      return (
        <View
          style={{
            padding: 10,
            paddingTop: 10,
            paddingBottom: 20,
            flex: 1,
            backgroundColor: '#38ef7d'
          }}>
          <View style={{borderBottomColor: '#ffffff',
                  borderBottomWidth: 2,
                  marginBottom: 20,
                  marginLeft: 10,
                  marginRight: 10,
                  }}>
            <Input
              ref={this.textInput}
              placeholder="What are you thankful for?"
              onChangeText={currItem => this.setState({ currItem })}
              onSubmitEditing={this.addItem}
              value={this.state.currItem}
            />
          </View>
          <BigBtn onPress={this.addItem}>
            <SubmitText>Submit</SubmitText>
          </BigBtn>
          <ItemList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id.toString()}
          />
          <BigBtn style={{
              alignItems: 'center',
              marginTop: 10
            }}
            onPress={this.storeList}
          >
            <SubmitText>Save List</SubmitText>
          </BigBtn>
          <BigBtn style={{ backgroundColor: 'rgba(235, 184, 29, 0.9)' }} onPress={this.clearData}>
            <SubmitText>Clear List</SubmitText>
          </BigBtn>
        </View>
      );
    }
  }