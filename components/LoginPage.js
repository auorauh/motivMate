import { StyleSheet, View, TextInput, Image, Text, Pressable, Modal} from 'react-native';
import { useState } from 'react'
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function LoginPage(props) {

  const [userScore, setuserScore] = useState('');
  const [goalCompleted, setgoalCompleted] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMsg, setError] = useState('');

function emailInputHandler(enteredText) {
    setUserEmail(enteredText);
}
function addEmailHandler() {
    setUserEmail('');
}
function passInputHandler(enteredText) {
    setPass(enteredText);
}
function addPassHandler() {
    setPass('');
}
function setUser(user){
    props.setUser(user);
    props.setTheme(user.theme);
  };
function login(){
    if((userEmail != undefined &&userEmail != null && userEmail != '') && (pass != undefined && pass != null && pass != '')){
        userEmailCheck();
    } else {
        setError('Incorrect Email or Password');
    }
}
async function userEmailCheck(){
    axios.get(`${props.API_URL}/users/${userEmail}`)
  .then(response => {
      passCheck(response.data);
  })
  .catch(error => {
    console.log(error)
    console.error(error.message);
  });

}
function passCheck(user){
    if (user.pass === pass){
        props.setUser(user);
        props.login();
    }
    else {
      addPassHandler()
      setError('Password Email/Incorrect');
    }
}
function failedLogin(string){
  console.log(string)
  let str = string.toString();
  setUserEmail('');
  setPass('');
  setError(str);
}

    return (
        <Modal visible={props.visible} animationType="slide" >
          <View style={styles.LoginPage}>
            <View style={styles.loginForm}>
                <Text style={[styles.fontSizeMed]}>Sign In</Text>
                <FontAwesome5 name={'user-circle'} />
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
            </View>
          </View>
      </Modal>
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
    //backgroundColor: '#0e1111',
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
  fontSizeMed: {
    fontSize: 20,
  },
  primColor: {
    color: '#FFC107'
  },
  errorMsg: {
    color: 'red',
  }
})