import { useEffect } from 'react';
import { StyleSheet, View, Pressable} from 'react-native';
import GoalList from './GoalList';
import GoalInput from './GoalInput';
import AddGoalButton from './AddGoalButton';
import UserPage from './UserPage';
import Settings from './settings';
import AnalyticsPage from './analyticsPage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Nav(props) {

  useEffect(() => {
    props.setMainComponent(props.goalList);
},[])

  function goalList(){
    props.setMainComponent(props.goalList);
  }
  function userButton(){
    props.setMainComponent(<UserPage userObj={props.userObj} theme={props.theme} cancel={userButton}/>);
  }
  function analyticsButton(){
    props.setMainComponent(<AnalyticsPage goals={props.goals} userObj={props.userObj} theme={props.theme} cancel={analyticsButton}/>);
  }
  function settingsButton(){
    props.setMainComponent(<Settings API_URL={props.API_URL} setTheme={props.setTheme} theme={props.theme} userObj={props.userObj} cancel={settingsButton}/>);
  }

    return (
        <View style={[styles.nav, {backgroundColor: props.theme.background}]}>
        {props.goalInput && <GoalInput API_URL={props.API_URL} userObj={props.userObj} onAddGoal={props.onAddGoal} cancel={props.cancel}/>}
                
        <Pressable style={[styles.navItem]} onPress={goalList}>
          <FontAwesome5 style={[styles.navIcon, props.theme.background == '#0e1111' ? {color: 'white'}:null]} name={'plus-square'} />
        </Pressable>

        <Pressable style={styles.navItem} onPress={analyticsButton}> 
          <FontAwesome5 style={[styles.navIcon, styles.rotate, props.theme.background == '#0e1111' ? {color: 'white'}:null]} name={'align-right'} />
        </Pressable>

        <Pressable style={styles.goalBtn}>
          <AddGoalButton theme={props.theme} passed={props.addGoal}/>
        </Pressable>

        <Pressable style={styles.navItem} onPress={userButton}>
          <FontAwesome5 style={[styles.navIcon, props.theme.background == '#0e1111' ? {color: 'white'}:null]} name={'user'} />
        </Pressable>

        <Pressable style={styles.navItem} onPress={settingsButton}>
          <FontAwesome5 style={[styles.navIcon, props.theme.background == '#0e1111' ? {color: 'white'}:null]} name={'cog'} />
        </Pressable>
      </View>
    );
}
const styles = StyleSheet.create({
    nav: {
        height: '10%',
        width: '100%',
        //backgroundColor: '#8C877E',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 0,
        borderTopWidth: 1,
        borderColor: 'lightgray'
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