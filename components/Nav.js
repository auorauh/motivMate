import { useState } from 'react';
import { StyleSheet, View, Pressable, Button, Image, Text, useColorScheme} from 'react-native';
import GoalInput from './GoalInput';
import AddGoalButton from './AddGoalButton';
import UserPage from './UserPage';
import Settings from './settings';
import AnalyticsPage from './analyticsPage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Nav(props) {
  const [userModal, setuserModal] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [settings, setSettings] = useState(false);

  function userButton(){
    setuserModal(prev => !prev);
  }
  function analyticsButton(){
    setAnalytics(prev => !prev);
  }
  function settingsButton(){
    setSettings(prev => !prev);
  }

    return (
        <View style={styles.nav}>
                {props.goalInput && <GoalInput API_URL={props.API_URL} userObj={props.userObj} onAddGoal={props.onAddGoal} cancel={props.cancel} test={props.test}/>}
                {analytics && <AnalyticsPage goals={props.goals} userObj={props.userObj} theme={props.theme} cancel={analyticsButton}/>}
                
        <Pressable style={[styles.navItem, styles.selected]} onPress={props.refresh}>
            <FontAwesome5 style={styles.navIcon} name={'plus-square'} />
        </Pressable>

        <Pressable style={styles.navItem} onPress={analyticsButton}> 
            <FontAwesome5 style={[styles.navIcon, styles.rotate]} name={'align-right'} />
        </Pressable>

        <Pressable style={styles.goalBtn}>
          <AddGoalButton theme={props.theme} passed={props.addGoal}/>
        </Pressable>

        <Pressable style={styles.navItem} onPress={userButton}>
          <FontAwesome5 style={styles.navIcon} name={'user'} />
          {userModal && <UserPage userObj={props.userObj} theme={props.theme} cancel={userButton}/>}
        </Pressable>

        <Pressable style={styles.navItem} onPress={settingsButton}>
          <FontAwesome5 style={styles.navIcon} name={'cog'} />
          {settings && <Settings api={props.api} setTheme={props.setTheme} theme={props.theme} userObj={props.userObj} cancel={settingsButton}/>}
        </Pressable>
      </View>
    );
}
const styles = StyleSheet.create({
    nav: {
        height: '10%',
        width: '100%',
        backgroundColor: '#8C877E',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 0,
      },
      navItem: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        //transform: [{translateY: -7}],
      },
      navIcon: {
        fontSize: 25,
        fontWeight: 100,
      },
      rotate: {
        transform: [{rotate: '90deg'}],
      },
      goalBtn: {
        transform: [{translateY: -50}],
      },
      selected: {
        backgroundColor: '#706860',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        transform: [{translateY: 0}],
      },
})