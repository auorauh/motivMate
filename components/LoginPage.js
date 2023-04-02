import { StyleSheet, View, TextInput, Text, Pressable, Modal} from 'react-native';
import { useState,useEffect } from 'react';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import storage from "@react-native-async-storage/async-storage";
import {API_URL} from '@env';

function LoginPage({navigation}) {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMsg, setError] = useState('');
  const [creatingAccount, setCreation] = useState(false);

  useEffect(() => {
    checkForCache();
  }, []);
  async function checkForCache() {
    let cached = false;
    try {
      let userEmail = await getLocalData('email');
      if(userEmail != null){
      cached = true;
      fetch(`${API_URL}/users/${userEmail}`)
      .then(response => response.json())
      .then(user => {navigation.navigate('Main', user)})
      .catch(err => failedLogin('unable to login'));
      setTimeout(() => {
          
      }, 0);
    }
    } 
    catch {

    }
  }
  async function deleteLocalData(key) {
    try {
      await storage.removeItem(key);
      //console.log(`Deleted ${key}`);
    } catch (error) {
      console.log(`Error deleting ${key}:`, error);
    }
  }
  async function saveLocalData(key, value) {
    try {
      await storage.setItem(key, JSON.stringify(value));
      //console.log(`Saved ${key}: ${JSON.stringify(value)}`);
    } catch (error) {
      console.log(`Error saving ${key}:`, error);
    }
  }
  async function getLocalData(key) {
    try {
      const value = await storage.getItem(key);
      //console.log(`Retrieved ${key}: ${value}`);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.log(`Error retrieving ${key}:`, error);
    }
  }
function nameInputHandler(enteredText) {
  setName(enteredText);
}
function emailInputHandler(enteredText) {
    setUserEmail(enteredText);
}
function passInputHandler(enteredText) {
    setPass(enteredText);
}
function login(){
  if((userEmail != undefined && userEmail != null && userEmail != '') && (pass != undefined && pass != null && pass != '')){
    userEmailCheck();
} else {
    setError('Incorrect Email or Password');
}
}
function userEmailCheck(){
    fetch(`${API_URL}/users/${userEmail}`)
    .then(response => response.json())
    .then(user => {passCheck(user)})
    .catch(err => failedLogin('unable to login'));
}
function passCheck(user){
    if (user.pass === pass){
      saveLocalData('email', userEmail);
      navigation.navigate('Main', user);
    }
    else {
      addPassHandler()
      setError('Password Email/Incorrect');
    }
}
function failedLogin(string){
  let str = string.toString();
  setUserEmail('');
  setPass('');
  setError(str);
}
function startCreation(){
  setCreation(true);
}
function createAccount(){
  //vaidate info
  setError('');
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if(emailRegex.test(userEmail)){
    if(pass != null && pass != undefined && pass != '') {
      if(name != '' && name != null && name != undefined) {
        newUserAPICall();
      } else {
        setError('Enter a name');
      }
    } else {
      setError('Please enter a vaild password');
    }
  } else {
    setError('Please enter a vaild email');
  }
  //call api - if successful close account creation
}
function newUserAPICall(){
  let user = {name: name, email: userEmail.toLowerCase(), pass: pass};
  axios.post(`${API_URL}/users`, user, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => closeCreation())
  .catch(err => console.log('Error'));
}
function closeCreation(){
  setUserEmail('');
  setPass('');
  setName('');
  setCreation(false);
  setError('');
}
    return (
          <View style={styles.LoginPage}>
            <View style={styles.loginForm}>
            {!creatingAccount ?
            <View>
                <Text style={[styles.fontSizeMed]}>Sign In</Text>
                <Text style={styles.errorMsg}>{errorMsg}</Text>
                <TextInput style={styles.formInput} 
                  placeholder='Email'
                  placeholderTextColor={'gray'}
                  onChangeText={emailInputHandler}
                  value={userEmail} 
                  selectionColor={'#d4af37'}
                  required
                />
                <TextInput style={styles.formInput} 
                  placeholder='Password'
                  placeholderTextColor={'gray'}
                  onChangeText={passInputHandler}
                  value={pass} 
                  selectionColor={'#d4af37'}
                  required
                />
                <Pressable style={styles.loginButton} onPress={login}><Text style={styles.fontSizeMed}>Login</Text></Pressable>
                <Pressable style={styles.signUpButton} onPress={startCreation}><Text style={styles.fontSizeMed}>Sign Up</Text></Pressable>
                </View>
                :
                <View >
                  <Text style={styles.fontSizeMed}>Create Account</Text>
                  <Text style={styles.errorMsg}>{errorMsg}</Text>
                  <TextInput style={styles.formInput}
                    placeholder='Name'
                    placeholderTextColor={'gray'}
                    onChangeText={nameInputHandler}
                    value={name} 
                    selectionColor={'#d4af37'}
                    required
                  />
                  <TextInput style={styles.formInput}
                    placeholder='Email'
                    placeholderTextColor={'gray'}
                    onChangeText={emailInputHandler}
                    value={userEmail} 
                    selectionColor={'#d4af37'}
                    required
                  />
                  <TextInput style={styles.formInput}
                    placeholder='Password'
                    placeholderTextColor={'gray'}
                    onChangeText={passInputHandler}
                    value={pass} 
                    selectionColor={'#d4af37'}
                    required
                  />
                  <Pressable style={styles.loginButton} onPress={createAccount}><Text style={styles.fontSizeMed}>Create  <FontAwesome5 style={styles.planeIcon} name={'paper-plane'} /></Text></Pressable>
                  <Pressable style={styles.signUpButton} onPress={closeCreation}><Text style={styles.fontSizeMed}>Login</Text></Pressable>
            </View>
                }
            </View>
          </View>
      );
};

export default LoginPage;

const styles = StyleSheet.create({
    LoginPage: {
    marginTop: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff9ef',
  },
  loginForm: {
    width: '100%',
    height: '80%',
    paddingTop: '50%',
    display: 'flex',
  },
  formInput: {
    borderWidth: 1,
    height: 50,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  loginButton: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    backgroundColor: '#FFC107',
  },
  signUpButton: {
    height: 50,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  fontSizeMed: {
    fontSize: 20,
  },
  primColor: {
    color: '#FFC107'
  },
  errorMsg: {
    color: 'red',
  },
  planeIcon: {
    fontSize: 15,
  },
})