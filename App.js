import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screans
import { Start_screen } from './Screens/Start'
import { Main_Game } from './Screens/Game/Main_Game'

//Main stack 
const Stack = createStackNavigator();        

function App() {

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start_screen} options={{ headerShown: false}}/>
        <Stack.Screen name="Game" component={Main_Game} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;