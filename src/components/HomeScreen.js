import React from "react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, Alert, View } from "react-native";
import { MainView, SubmitText, BigBtn, Input, CircleBtn } from "../styles/Main";
import { ItemList, Item } from "../styles/ListItems";
import { getData, storeData } from "../common/storage";
import { Ionicons } from "@expo/vector-icons";

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clearData = this.clearData.bind(this);
    this.storeList = this.storeList.bind(this);
    this.textInput = React.createRef();
    this.state = {
      currItem: "",
      data: [],
    };
  }

  async componentDidMount() {
    const currData = await getData("data");
    if (currData !== null) {
      this.setState({ data: currData });
      return;
    } else {
      storeData("data", []);
    }
  }

  clearData = () => {
    if (this.state.data.length < 1) {
      alert("You don't have any items in your list");
      return;
    }
    Alert.alert(
      "Clear List",
      "Are you sure you want to clear your list?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.setState({ data: [] });
            storeData("data", []);
          },
        },
      ],
      { cancelable: false }
    );
  };

  storeList = async () => {
    if (this.state.data.length < 1) {
      alert("You don't have any items in your list");
      return;
    }
    let currLists = await getData("lists");
    if (currLists === null) {
      storeData("lists", []);
    }
    currLists = await getData("lists");
    const newLists = [
      {
        id: "list-" + new Date().getTime(),
        date: moment().format("MMMM Do YYYY, h:mm a"),
        data: this.state.data,
      },
    ].concat(currLists);
    await storeData("lists", newLists);
    this.props.navigation.navigate("Saved Lists");
  };

  renderItem = ({ item }) => (
    <Item title={item.title} id={item.id} removeItem={this.removeItem} />
  );

  addItem = async () => {
    this.setState((state) => {
      Keyboard.dismiss();
      if (state.currItem === "") {
        alert("Please enter a value");
        return;
      }
      const data = this.state.data.concat({
        id: new Date().getTime(),
        title: state.currItem,
      });
      // Set storage here to avoid race condition
      storeData("data", data);
      return {
        data,
        currItem: "",
      };
    });
  };

  removeItem = (id) =>
    this.setState({
      data: this.state.data.filter((item) => item.id != id),
    });

  render() {
    return (
      <MainView>
        <View
          style={{
            borderBottomColor: "#ffffff",
            borderBottomWidth: 2,
            marginBottom: 20,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Input
            ref={this.textInput}
            placeholder="What are you thankful for?"
            onChangeText={(currItem) => this.setState({ currItem })}
            onSubmitEditing={this.addItem}
            value={this.state.currItem}
          />
        </View>
        <CircleBtn id="add-item-btn" onPress={this.addItem}>
          <Ionicons name="ios-add" size={40} color="#11998e" />
        </CircleBtn>
        <ItemList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <BigBtn
          id="store-list-btn"
          style={{
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={this.storeList}
        >
          <SubmitText>Save List</SubmitText>
        </BigBtn>
        <BigBtn
          id="clear-data-btn"
          style={{ backgroundColor: "rgba(235, 184, 29, 0.9)" }}
          onPress={this.clearData}
        >
          <SubmitText>Clear List</SubmitText>
        </BigBtn>
      </MainView>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <HomeScreen {...props} navigation={navigation} />;
}
