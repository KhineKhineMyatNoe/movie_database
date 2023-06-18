import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchPage from '../scenes/SearchPage';
import HomePage from '../scenes/HomePage';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('../images/homepage.png')
              : require('../images/homeInactive.png');
          } else if (route.name === 'Search') {
            iconName = focused
              ? require('../images/searchpage.png')
              : require('../images/SearchInactive.png');
          }

          return <Image source={iconName} style={{width: 30, height: 30}} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#1c1c27',
        },
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomePage}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Search"
        component={SearchPage}
      />
    </Tab.Navigator>
  );
}
