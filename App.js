import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, useRef} from 'react';
import LoginPage from './components/LoginPage';
import {API_URL} from '@env';

export default function App() {
  const [loggedIn, setLoginStatus] = useState(false);
  const [userObj, setuserObj] = useState({});
  function login() {
    setLoginStatus(true);
  }
  const handleUserObjChange = (user) => {
    setuserObj(user);
  };
  console.log(process.env.API_URL);
  return (
    <>
    {!loggedIn && <LoginPage API_URL={API_URL} setUser={handleUserObjChange} login={login}/>}
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
