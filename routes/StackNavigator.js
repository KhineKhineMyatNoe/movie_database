import {createStackNavigator} from '@react-navigation/stack';
import MovieDetail from '../scenes/MovieDetail';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}
export default StackNavigator();
