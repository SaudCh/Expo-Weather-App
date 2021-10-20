import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Current from './screens/current'
import Temp from './screens/temp'
import Detail from './screens/detail'
import Search from './screens/search'
import SCurrent from './screens/city/current'
import SCurrent from './screens/city/current'

const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf")
  })
}

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 30,
          left: 100,
          right: 100,
          height: 2,
          backgroundColor: 'white',
          elevation: 0

        }
      }}
    >
      <Tab.Screen name="Current" component={Current} />
      <Tab.Screen name="Detail" component={Detail} />
    </Tab.Navigator>
  );
}


export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

  return (
    <NavigationContainer

    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="Search" component={Search} />

        <Stack.Screen name="SCurrent" component={SCurrent} />

      </Stack.Navigator>
    </NavigationContainer>

  )
}

