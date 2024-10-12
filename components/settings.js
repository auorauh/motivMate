import { StyleSheet, View, Text, Pressable, Modal, Switch, Button, Animated, Vibration} from 'react-native';
import { useEffect, useState, useRef } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Notifications from 'expo-notifications';
import { getAllScheduledNotificationsAsync, cancelAllScheduledNotificationsAsync } from 'expo-notifications';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { getLocalData, saveLocalData, deleteLocalData } from '../functions/localDataUtility';
import { red, yellow, blue, lavender, dark, mint, peach, coral, sky, sage} from '../functions/colors';
import SwipeToDeleteComponent from './Swipe';
import TextFont from './TextFont';

function Settings(props) {
  const poppyPattern = [0, 50];
  const startVibrate = () => {
    Vibration.vibrate(poppyPattern, true);
  };
  const endVibrate = () => {
    Vibration.cancel();
  };
  const fillAnim = useRef(new Animated.Value(0)).current;
  const boxWidth = 250;

  const startReset = () => {
    Animated.timing(fillAnim, {
      toValue: boxWidth,
      duration: 2000, 
      useNativeDriver: false, 
    }).start(() => {
      if(fillAnim => 149 ){
        startVibrate();
        resetScore();
        endVibrate();
      }
    });
  };
  const cancelReset = () => {
    endVibrate();
    Animated.timing(fillAnim, {
      toValue: 0,
      duration: 500, 
      useNativeDriver: false,
    }).start();
    
  };

  const [userColor, setUserColor] = useState('#00bcd4');
  const [newTheme, setNewTheme] = useState(blue);
  const [userNotifications, setUserNotifications] = useState(false);

  useEffect(() => {
    setNewTheme(props.userObj.theme);
    setUserColor(props.userObj.theme.primary);
    checkForLocalNoties();
  },[])


  async function changeColor(color){
    let theme = props.userObj.theme;
    switch (color) {
      case red:
        setNewTheme(red);
        theme = red;
        break;
      case yellow:
        setNewTheme(yellow);
        theme = yellow;
        break;
      case blue:
        setNewTheme(blue);
        theme = blue;
        break;
      case lavender:
        setNewTheme(lavender);
        theme = lavender;
        break;
      case dark:
        setNewTheme(dark);
        theme = dark;
        break;
      case coral:
        setNewTheme(coral);
        theme = coral;
        break;
      case peach:
        setNewTheme(peach);
        theme = peach;
        break;
      case sage:
        setNewTheme(sage);
        theme = sage;
        break;
      case sky:
        setNewTheme(sky);
        theme = sky;
        break;
      case mint:
        setNewTheme(mint);
        theme = mint;
        break
      default:
        break;
    }
    setUserColor(color);
    saveTheme(theme);
  }
  const setTheme = (newValue) => {
    props.setTheme(newValue);
  };
  async function saveTheme(theme){
    props.userObj.theme = theme;
    setTheme(theme);
    try {
      const response = await axios.put(`${props.API_URL}/api/users/${props.userObj.email}`, props.userObj);
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
        title: "Be your best today!",
        body: "Plan your day!",
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
        title: "Update your MotivMate!",
        body: "Mark your goals complete, see your score!",
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
        title: "Dont forget your goals!",
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
  async function resetScore(){
    let user = props.userObj;
    user.dailyScore= 0;
    try {
      const response = await axios.put(`${props.API_URL}/api/users/${props.userObj.email}`, user);
      return response.data;
    } catch (error) {
    }
  }

    return (
          <View style={[styles.settingPage]}>
            <View style={styles.header}>
            </View>
            <View style={styles.userData}>
            <TextFont style={[styles.title, {color:newTheme.secondary}]}>Choose your color</TextFont>
              <View style={styles.colorTray}>
                <Pressable style={[styles.red, styles.color]} onPress={() =>changeColor( red )}></Pressable>
                <Pressable style={[styles.yellow, styles.color]} onPress={() =>changeColor( yellow )}></Pressable>
                <Pressable style={[styles.blue, styles.color]} onPress={() =>changeColor( blue )}></Pressable>
                <Pressable style={[styles.lavender, styles.color]} onPress={() =>changeColor( lavender )}></Pressable>
                <Pressable style={[styles.dark, styles.color]} onPress={() =>changeColor( dark )}></Pressable>
                <Pressable style={[styles.coral, styles.color]} onPress={() =>changeColor( coral )}></Pressable>
                <Pressable style={[styles.peach, styles.color]} onPress={() =>changeColor( peach )}></Pressable>
                <Pressable style={[styles.sage, styles.color]} onPress={() =>changeColor( sage )}></Pressable>
                <Pressable style={[styles.sky, styles.color]} onPress={() =>changeColor( sky )}></Pressable>
                <Pressable style={[styles.mint, styles.color]} onPress={() =>changeColor( mint )}></Pressable>
              </View>
              <View style={styles.settingSection}>
                <View style={styles.toggleSection}>
                  <View style={styles.notifications}>
                  <TextFont style={[{fontSize: 16}, {color:newTheme.secondary}]}>Notifications</TextFont>
                  <Switch
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleNotifications}
                  value={userNotifications}
                  />
                  </View>
                  </View>
              </View>
              <View style={styles.settingSection}>
                <Pressable style={styles.reset}
                onPressIn={startReset}
                onPressOut={cancelReset}>
                  <TextFont style={styles.resetText}>Reset Score (Hold)</TextFont>
                      <Animated.View
                      style={[
                        styles.box,
                        {width: fillAnim},
                            ]}
                        />
                  </Pressable>
              </View>
              <View style={styles.settingSection}></View>
              <View style={styles.logout}>
              <Button color="red" title="Log Out" onPress={logout}></Button>
              </View>
            </View>
          </View>
      );
};

export default Settings;

const styles = StyleSheet.create({
  settingPage: {
    height: '100%',
    alignItems: 'center',
    padding: 16,
  },
  userIcon: {
    fontSize: 100,
    alignSelf: 'center'
  },
  userData: {
    width: '100%',
    flex: 1,
  },
  title: {
    // position: 'absolute',
    // top: 5,
    // left: 10,
    fontSize: 20,
  },
  colorTray: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    width: '100%',
    paddingTop: '3%'
  },
  settingSection: {
    marginBottom: '4%',
    alignItems: 'center'
  },
  color: {
    height: 55,
    width: 55,
    borderRadius: 15,
    borderWidth: 3,
    aspectRatio: 1,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%'
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
  mint: {
    backgroundColor: mint.primary,
  },
  peach: {
    backgroundColor: peach.primary,
  },
  sky: {
    backgroundColor: sky.primary
  },
  coral :{
    backgroundColor: coral.primary
  },
  sage: {
    backgroundColor: sage.primary
  },
  // toggleSection: {
  //   flexDirection: 'row',
  //   height: 50,
  //   //justifyContent: 'center'
  // },
  notifications: {
    borderRadius: 15,
    borderWidth: 2,
    height: 55,
    width: 250,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '5%'
  },
  reset: {
    borderRadius: 15,
    borderWidth: 2,
    width: 250,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  resetText: {
    fontSize: 16
  },
  logout: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'red',
    height: 55,
    width: 250,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  boxContainer: {
    width: 150,
    height: 100, 
    overflow: 'hidden',
    marginBottom: 20,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    position: 'absolute'
  },
  box: {
    borderRadius: 15,
    height: '100%',
    backgroundColor: 'lightblue',
    overflow: 'hidden',
    position: 'absolute'
  },
})