import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import Main from './components/Main';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator detachInactiveScreens={true}>
        <Stack.Screen name='LoginPage' options={{headerShown: false}} component={LoginPage}/>
        <Stack.Screen name='Main' options={{headerShown: false, gestureEnabled: false}} component={Main}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}
