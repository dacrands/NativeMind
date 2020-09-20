import React from 'react';
import { Keyboard, Alert, View } from "react-native";
import { SubmitText, BigBtn, Input } from "./Main";
import { ItemList, Item } from "./ListItems";
import AsyncStorage from "@react-native-community/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


class HomeScreen extends React.Component {
    constructor(props) {
      super(props);
      this.renderItem = this.renderItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.clearData = this.clearData.bind(this);
      this.getData = this.getData.bind(this);
      this.storeData = this.storeData.bind(this);
      this.textInput = React.createRef();
      this.state = {
        currItem: "",
        data: []
      };
    }
  
    async componentDidMount() {
      const currData = await this.getData("data");
      if (currData !== null) {
        this.setState({ data: currData });
        return;
      } else {
        console.log("setting state");
        this.storeData("data", []);
      }
    }
  
    getData = async key => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.error(e);
      }
    };
  
    storeData = async (key, value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
  
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
              this.storeData("data", []);
            }
          }
        ],
        { cancelable: false }
      );
  
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
        this.storeData("data", data);
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
        <LinearGradient colors={['#38ef7d', '#11998e']} style={{
          padding: 10,
          paddingTop: 10,
          paddingBottom: 80,
          flex: 1
          }}>
          <View style={{borderBottomColor: '#ffffff',
                  borderBottomWidth: 2,
                  marginBottom: 20,
                  marginLeft: 10,
                  marginRight: 10,
                  }}>
            <Input
              ref={this.textInput}
              placeholder="What are you thankful for"
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
          <BigBtn onPress={this.clearData}>
            <SubmitText>Clear List</SubmitText>
          </BigBtn>
        </LinearGradient>
      );
    }
  }

  export default function(props) {
    return <HomeScreen {...props} />;
  }