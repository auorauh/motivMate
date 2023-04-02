import { StyleSheet, View, Text, Pressable, Modal, Switch, Button} from 'react-native';
import { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Notifications from 'expo-notifications';
import { getAllScheduledNotificationsAsync, cancelAllScheduledNotificationsAsync } from 'expo-notifications';
import Constants from 'expo-constants';
import storage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const red = {
  primary: '#D62828',
  secondary: 'gray',
  background: '#fff9ef'
};
const yellow = {
  primary: '#FFBA08',
  secondary: 'gray',
  background: '#fff9ef'
};
const blue = {
  primary: '#00bcd4',
  secondary: 'gray',
  background: '#fff9ef'
};
const lavender = {
  primary: '#C8B6FF',
  secondary: 'gray',
  background: '#fff9ef'
};
const dark = {
  primary: '#fff9ef',
  secondary: '#fff9ef',
  background: '#0e1111'
};

function Settings(props) {
  const [userColor, setUserColor] = useState('#00bcd4');
  const [newTheme, setNewTheme] = useState(blue);
  const [userNotifications, setUserNotifications] = useState(false);

  useEffect(() => {
    setNewTheme(props.userObj.theme);
    setUserColor(props.userObj.theme.primary);
    checkForLocalNoties();
  },[])


  function changeColor(color){
    switch (color) {
      case 'red':
        setNewTheme(red);
        break;
      case '#FFBA08':
        setNewTheme(yellow);
        break;
      case '#00bcd4':
        setNewTheme(blue);
        break;
      case '#C8B6FF':
        setNewTheme(lavender);
        break;
      case '#000':
        setNewTheme(dark);
        break;
      default:
        break;
    }
    setUserColor(color);
  }
  const setTheme = (newValue) => {
    props.setTheme(newValue);
  };
  async function saveAndExit(){
    props.userObj.theme = newTheme;
    setTheme(newTheme);
    try {
      const response = await axios.put(`${props.api}/users/${props.userObj._id}`, props.userObj);
      props.cancel();
      return response.data;
    } catch (error) {
      //console.error(error);
    }
  }
  async function toggleNotifications(){
    if(userNotifications){
      //turn off notifications 
      await cancelAllScheduledNotificationsAsync();
      deleteLocalData('NotiesScheduled');
      setUserNotifications(false);
    } else {
      //turn on
      scheduleNotification();
    }
  }
  async function scheduleNotification(){
    await saveLocalData('NotiesScheduled',{scheduled: true});
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder to review your goals!",
        body: "Beat your score yesterday and complete some daily goals!",
        // data: { data: "data goes here" }
      },
      trigger: {
        hour: 7,
        minute: 30,
        repeats: true
      }
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Update your score and check out your score!",
        body: "Mark your goals complete and see if your score is acceptable!",
        // data: { data: "data goes here" }
      },
      trigger: {
        hour: 14,
        minute: 30,
        repeats: true
      }
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Last chance to complete some goals!",
        body: "Beat your score yesterday and complete some daily goals!",
        // data: { data: "data goes here" }
      },
      trigger: {
        hour: 21,
        minute: 30,
        repeats: true
      }
    });
    setUserNotifications(true);
}
async function saveLocalData(key, value) {
  try {
    await storage.setItem(key, JSON.stringify(value));
    //console.log(`Saved ${key}: ${JSON.stringify(value)}`);
  } catch (error) {
    //console.log(`Error saving ${key}:`, error);
  }
}
async function getLocalData(key) {
  try {
    const value = await storage.getItem(key);
    //console.log(`Retrieved ${key}: ${value}`);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    //console.log(`Error retrieving ${key}:`, error);
  }
}
async function deleteLocalData(key) {
  try {
    await storage.removeItem(key);
    //console.log(`Deleted ${key}`);
  } catch (error) {
    //console.log(`Error deleting ${key}:`, error);
  }
}
async function checkForLocalNoties(){
  let noties;
  try{
    noties = await getLocalData('NotiesScheduled');
    if(noties != null){
      setUserNotifications(true);
    }
  }
  catch (error){
  }
}
const navigation = useNavigation();
function logout(){
  deleteLocalData('email');
  props.cancel();
  navigation.navigate('LoginPage');
}

    return (
        <Modal visible={props.visible} animationType="slide" >
          <View style={[styles.settingPage, {backgroundColor:newTheme.background}]}>
            <View style={styles.header}>
            <Pressable onPress={saveAndExit}><FontAwesome5 style={styles.headerText} name={'times-circle'} /></Pressable>
            <FontAwesome5 style={[styles.userIcon, {color:newTheme.primary}]} name={'user-circle'} />
            </View>
            <View style={styles.userData}>
              <View style={styles.settingSection}>
                <Text style={[styles.title, {color:newTheme.secondary}]}>Choose your color</Text>
                <Pressable style={[styles.red, styles.color]} onPress={() =>changeColor('red')}></Pressable>
                <Pressable style={[styles.yellow, styles.color]} onPress={() =>changeColor('#FFBA08')}></Pressable>
                <Pressable style={[styles.blue, styles.color]} onPress={() =>changeColor('#00bcd4')}></Pressable>
                <Pressable style={[styles.lavender, styles.color]} onPress={() =>changeColor('#C8B6FF')}></Pressable>
                <Pressable style={[styles.dark, styles.color]} onPress={() =>changeColor('#000')}></Pressable>
              </View>
              <View style={styles.settingSection}>
                <Text style={[styles.title, {color:newTheme.secondary}]}>Notifications</Text>
                <Text style={[{color:newTheme.secondary}]}>Daily Reminders?</Text>
                <Switch
                // trackColor={{false: '#767577', true: props.userObj.theme.primary}}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleNotifications}
                value={userNotifications}
                />
              </View>
              <View style={styles.settingSection}></View>
              <View style={styles.settingSection}></View>
              <View style={styles.settingSection}></View>
              <View style={styles.logout}>
                <Button color="red" title="Log Out" onPress={logout}></Button>
              </View>
            </View>
          </View>
      </Modal>
      );
};

export default Settings;

const styles = StyleSheet.create({
  settingPage: {
    paddingTop: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    width: '100%',
    justifySelf: 'flex-start',
  },
  headerText: {
    paddingTop: 10,
    fontSize: 25,
    color: 'gray',
  },
  userIcon: {
    fontSize: 100,
    alignSelf: 'center'
  },
  userData: {
    width: '100%',
    height: '80%',
    paddingTop: 40,
    justifyContent: 'space-between'
  },
  title: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
  settingSection: {
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  color: {
    height: 55,
    width: 55,
    borderRadius: 15,
    borderWidth: 3,
  },
  red: {
    backgroundColor: red.primary,
  },
  yellow: {
    backgroundColor: yellow.primary,
  },
  blue: {
    backgroundColor: blue.primary,
  },
  lavender: {
    backgroundColor: lavender.primary,
  },
  dark: {
    backgroundColor: dark.background,
  },
  logout: {
    marginBottom: '15%',
  }
})