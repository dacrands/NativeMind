import * as React from 'react';
import SavedLists from "./components/SavedLists"
import { TouchableHighlight } from "react-native"
import { Header } from "./components/Main"
import HomeScreen from "./components/HomeScreen"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({ 
            headerTitle: () => <Header>Gratitude</Header>,
            headerStyle: {
              backgroundColor: '#38ef7d'
            },
            headerRight: () => (
              <TouchableHighlight
                onPress={() => navigation.navigate('Saved Lists')}
                title="Info"
                color="#fff"
                style={{ paddingRight:10 }}
              >
                <Ionicons name="md-list" size={32} color="white" />
              </TouchableHighlight>
            ),
           })}
        />
        <Stack.Screen 
          name="Saved Lists"
          component={SavedLists}
          options={{ title: 'Saved Lists' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;