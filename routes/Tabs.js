import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from '../screens/Home';
import History from '../screens/History';

const Tab = createMaterialTopTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#333',
        labelStyle: { fontFamily: 'montserrat-regular', fontSize: 12 },
        style: { backgroundColor: '#fafafa' },
        initialLayout: {
          width: Dimensions.get('window').width
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{ tabBarLabel: 'History' }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;