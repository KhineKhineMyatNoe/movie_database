import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import MovieDetail from '../scenes/MovieDetail';

const Stack = createStackNavigator();

export default function AppStart() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeTab"
          component={TabNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MovieDetail"
          component={MovieDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
