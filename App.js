import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, useRef} from 'react';
import LoginPage from './components/LoginPage';
//import {API_URL} from '@env';

export default function App() {
  const [loggedIn, setLoginStatus] = useState(false);
  function login() {
    setLoginStatus(true);
  }
  return (
    <>
    {!loggedIn && <LoginPage login={login}/>}
    {loggedIn &&
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
