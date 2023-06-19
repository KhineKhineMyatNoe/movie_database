import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import MovieDetail from '../scenes/MovieDetail';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

export default function AppStart() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
