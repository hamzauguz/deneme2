import React, { Component, useEffect, useState } from "react";

import MainMenu from "./screens/MainMenu";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import CheckScreen from "./screens/CheckScreen";
import SignUpScreen from "./screens/SignUpScreen";
import saatdeneme from "./screens/saatdeneme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MainMenu" component={MainMenu} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      <Tab.Screen options={{}} name="CheckScreen" component={CheckScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="saatdeneme"
          component={saatdeneme}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="all"
          component={MyTabs}
        />

        <Stack.Screen name="CheckScreen" component={CheckScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
