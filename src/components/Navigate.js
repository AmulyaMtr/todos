import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from "./Login";
import Home from "./Home";
import Posts from "./Posts";
import Album from "./Album";
import Tasks from "./Tasks";

const Stack = createStackNavigator()

const Navigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />


        <Stack.Screen
          name="Posts"
          component={Posts}
        />
        <Stack.Screen
          name="Tasks"
          component={Tasks}
        />
        <Stack.Screen
          name="Album"
          component={Album}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigate;
