import { useEffect, useState, useRef} from 'react';
import { StyleSheet, View, Image, Text,} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Nav from './Nav';
import GoalList from './GoalList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import storage from "@react-native-async-storage/async-storage";
import {API_URL} from '@env';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

const blue = {
  primary: '#00bcd4',
  secondary: '#gray',
  background: '#fff9ef'
};

export default function App( {route} ) {
  const [component, setComponent] = useState(goalList)
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notiesScheduled, setNoties] = useState(false);

  const [loggedIn, setLoginStatus] = useState(false);
  const [userObj, setuserObj] = useState(route.params);
  const [theme, setTheme] = useState(blue);
  const [goalModal, setGoalModal] = useState(false);
  const [actualGoals, addActualGoal] = useState([]);
  const [score, setScore] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [childKey, setChildKey] = useState(1);
  const goalList = <GoalList API_URL={API_URL} userObj={route.params} refresh={refresh} refreshing={refreshing} actualGoals={actualGoals} completeGoal={completeGoal} deleteGoal={deleteGoal}/>;

  const updateKey = () => {
    // Generate a new unique key for the child component to re-render on change
    const newKey = Date.now();
    setChildKey(newKey);
  };
  useEffect(() => {
    if(userObj._id != undefined && userObj._id != null){
      setTheme(userObj.theme);
      getGoals(userObj._id);
      setScore(userObj.dailyScore);
    }
    const getPermission = async () => {
      if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Enable push notifications to use the app!');
            await storage.setItem('expopushtoken', "");
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          await storage.setItem('expopushtoken', token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
    }
    getPermission();
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
function check(){
  let tempScore =0;
  for(let i=0;i<actualGoals.length;i++){
    if(actualGoals[i].complete == true){
      switch(actualGoals[i].difficulty){
        case 'Easy':
          tempScore + 10;
          break;
        case 'Medium':
          tempScore + 25;
          break;
        case 'Hard':
          tempScore + 100;
          break;
      }
    }
  }
  setScore(tempScore);
}

function refresh(){
  setRefreshing(true);
  getUser(userObj.email);
  getGoals(userObj._id);
  check();
  setRefreshing(false);
}
async function getUser(email){
    fetch(`${API_URL}/users/${email}`)
    .then(response => response.json())
    .then(user => {getUserHelper(user)})
    .catch(err => console.log(err));
}
  function getUserHelper(user) {
    setScore(user.dailyScore);
    setuserObj(user);
}
async function getGoals(_id) {
    axios.get(`${API_URL}/users/goals/${_id}`, {
      params: {
        _id: userObj._id
      }
    })
      .then(function (response) {
        if(response.data){
          addActualGoal(response.data);
          updateKey();
        }
      })
      .catch(function (error) {
        console.log('.get /goals/_id ERROR',error);
      });
      setTimeout(() => {
      }, 0);
}

const handleUserObjChange = (user) => {
  getGoals(user._id);
  setScore(user.dailyScore);
  setuserObj(user);
};
const updateTheme = (theme) => {
  setTheme(theme);
  setTimeout(() => {
  }, 0);
}
function startAddGoal(){
  setGoalModal(true);
}
function cancelGoal(){
  setGoalModal(false);
}
function addGoalHandler(goalObject) {
  let newGoal = goalObject
  if(newGoal.complete){
    switch(newGoal.difficulty){
      case 'Easy':
        setScore(score + 10);
        break;
      case 'Medium':
        setScore(score + 25);
        break;
      case 'Hard':
        setScore(score + 100);
        break;
    }
  }
  addActualGoal((currentGoals) => [...currentGoals,newGoal]);
  updateKey();
  cancelGoal();
}
function setMainComponent(component){
setComponent(component);
}
  function completeGoal(_id){
    let goal = null
    for(let i=0;i<actualGoals.length;i++){
      if(actualGoals[i]._id == _id){
        goal = actualGoals[i];
        if(actualGoals[i].complete == false){
          switch(actualGoals[i].difficulty){
            case 'Easy':
              userObj.dailyScore = score + 10;
              setScore(score + 10);
              break;
            case 'Medium':
              userObj.dailyScore = score + 25;
              setScore(score + 25);
              break;
            case 'Hard':
              userObj.dailyScore = score + 100;
              setScore(score + 100);
              break;
          }
          actualGoals[i].complete = true;
        } else {
          if(score - 10 >= 0 || score - 25 >= 0 || score - 100 >= 0){
            switch(actualGoals[i].difficulty){
              case 'Easy':
                userObj.dailyScore = score - 10;
                setScore(score - 10);
                break;
              case 'Medium':
                userObj.dailyScore = score - 25;
                setScore(score - 25);
                break;
              case 'Hard':
                userObj.dailyScore = score - 100;
                setScore(score - 100);
                break;
            }
          } else {
            setScore(0);
          }
          actualGoals[i].complete = false;
        }
      }
    }
    if(goal != null && goal != undefined){
      try{
        const response = axios.put(`${API_URL}/goals/${_id}`, goal);
        try{
          const response = axios.put(`${API_URL}/users/${userObj._id}`, userObj);
        } catch(err){
          console.log('.put /users/_id ERROR',err)
        }
      } catch(err){
        console.log('.put /goals/_id ERROR',err)
      }
    }
    updateKey();
  }

    async function deleteGoal(_id){
    let goal = actualGoals.filter((goal) => goal._id == _id)[0];
    //if complete adjust points
    userObj.score = adjustPoints(goal);
    //update user
    try {
      const response = await axios.delete(`${API_URL}/deletegoals/${_id}`);
        try{
            const response = axios.put(`${API_URL}/users/${userObj._id}`, userObj);
          } catch(err){
            console.log('.put /users/_id ERROR',err)
          }
    } catch (error) {
      console.error('.delete /deletegoals/_id ERROR',error);
    }
    addActualGoal(goals  => {return goals.filter((goal) => goal._id !== _id);});
    updateKey();
  }
  function adjustPoints(goal){
    let userScore = score;
    if(goal.complete == true){
      switch(goal.difficulty){
        case 'Easy':
          userObj.dailyScore = userScore - 10;
          setScore(userScore - 10);
          break;
        case 'Medium':
          userObj.dailyScore = userScore - 25;
          setScore(userScore - 25);
          break;
        case 'Hard':
          userObj.dailyScore = userScore - 100;
          setScore(userScore - 100);
          break;
      }
    }
    return userScore;
  }
  return (
    <>
    {theme.background != '#0e1111' ? <StatusBar style='dark'/> : <StatusBar style='light'/>}
    <View style={[styles.container, allDone == true ? styles.allComplete : {backgroundColor:theme.background}]}>
      <View style={styles.logoContainer}>
      <FontAwesome5 style={[styles.userIcon, userObj == {} ? {color:'#00bcd4'} : {color:theme.primary}]} name={'user-circle'} />
      <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <View style={styles.goalSection}>
        {component}
      </View>
    </View>
    <Nav  style={styles.nav}
        API_URL={API_URL} 
        setMainComponent={setMainComponent} 
        goalList={goalList}
        refresh={refresh} 
        key={childKey}
        goals={actualGoals} 
        userObj={userObj} 
        setTheme={updateTheme} 
        theme={theme} 
        goalInput={goalModal} 
        addGoal={startAddGoal}  
        onAddGoal={addGoalHandler} 
        cancel={cancelGoal}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 40,
    height: '90%',
    width: '100%',
  },
  nav: {
    zIndex: 100,
  },
  allComplete: {
    backgroundColor: '#90EE90',
  },
  notComplete: {
    backgroundColor: '#fff9ef',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    
  },
  userIcon: {
    marginTop: '10%',
    fontSize: 50,
    color: '#00bcd4',
  },
  scoreText: {
    color: 'grey',
    marginBottom: 20,
    fontSize: 20,
  },
  goalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  goalSection: {
    height: '83.5%',
  },
  GoalSq: {
    height: 115,
    width: 115,
    borderRadius: 15,
    backgroundColor: '#d4af37',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  nav: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  navIcon: {
    fontSize: 15
  },
});
