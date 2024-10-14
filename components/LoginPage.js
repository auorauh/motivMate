import { StyleSheet, View, TextInput, Text, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SlidingNotification from './SlidingNotification';
import {API_URL} from '@env';
import { getLocalData, saveLocalData } from '../functions/localDataUtility';

function LoginPage({navigation}) {
  const childRef = useRef();
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [pass, setPass] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setError] = useState('');
  const [creatingAccount, setCreation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkForCache();
  }, []);
  async function checkForCache() {
    let cached = false;
    try {
      let userEmail = await getLocalData('email');
      if(userEmail != null){
      childRef.current.OpenSpinner();
      cached = true;
      fetch(`${API_URL}/api/users/${userEmail}`)
      .then(response => response.json())
      .then(responseJson => reviewResponse(responseJson))
      .then(user => {navigation.navigate('Main', user)})
      .catch(err => failedLogin('Unable to login'));
      setTimeout(() => { }, 0);
      }
    } 
    catch (e){
    }
  }
 function reviewResponse(response){
    if(response.message == 'Error fetching user' || response.message == "User not found"){
      childRef.current.CloseSpinner();
      throw new Error('Error fetching user');
    }
    childRef.current.CloseSpinner();
    return response;
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
    fetch(`${API_URL}/api/users/${userEmail}`)
    .then(response => response.json())
    .then(user => {passCheck(user)})
    .catch(err => failedLogin('Unable to login'));
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
}
function newUserAPICall(){
  let user = {name: name, email: userEmail.toLowerCase(), pass: pass};
  axios.post(`${API_URL}/api/users`, user, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => successfulCreation())
  .catch(err => console.log('Error' , err));
}
function successfulCreation(){
  setSuccessMsg('Account Created');
  closeCreation();
}
function closeCreation(){
  setUserEmail('');
  setPass('');
  setName('');
  setCreation(false);
  setError('');
}
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <>
        <SlidingNotification loading={loading} ref={childRef}/>
          <View style={styles.LoginPage}>
            <View style={styles.loginForm}>
            {!creatingAccount ?    
            <View>
                <Text style={styles.successMsg}>{successMsg}</Text>
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
              </>
          </TouchableWithoutFeedback>
      );
};

export default LoginPage;

const styles = StyleSheet.create({
    LoginPage: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff9ef',
    zIndex: -100
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
  successMsg: {
    color: 'green',
  },
  planeIcon: {
    fontSize: 15,
  },
})