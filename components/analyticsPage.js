import { StyleSheet, View, Button, Image, Text, Pressable, Modal, Dimensions} from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProgressRing from './ProgressRing';

function AnalyticsPage(props) {
    const [userData, setUserData] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [percent, setPercenet] = useState(0);
  const [color, setColor] = useState(props.userObj.theme.primary);
  const [fill, setFill] = useState('rgb(0, 188, 212)');
  const maxDataValue = Math.max(...props.userObj.thirtyDays);

  useEffect(() => {
    if(props.userObj.theme.background == '#0e1111') {
      setColor('rgb(0, 188, 212)');
    } else {
      setFill(hexToRgb(color));
    }
    setUserData(props.userObj.thirtyDays);
    calcualteMaxGoal();
  }, []);
  function calcualteMaxGoal(){
    let maxGoal = 0;
    for(let i=0;i<props.goals.length;i++){
      if(props.goals[i].type == 'daily'){
        if(props.goals[i].difficulty == 'Hard'){
          maxGoal += 100;
        } else if (props.goals[i].difficulty =='Medium'){
          maxGoal += 25;
        } else {
          maxGoal += 10;
        }
      }
    }
  setMaxScore(maxGoal);
  let calcProgress = ((props.userObj.dailyScore) / maxGoal);
  if (calcProgress == 1){
    setColor('#0CCA4A');
  }
  setProgress(calcProgress);
  let percent = Math.floor(calcProgress * 100);
  if (percent != NaN) {
    setPercenet(percent);
  }
  }
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  const chartConfig = {
    decimalPlaces: 0, // optional, defaults to 2dp
    backgroundColor: "transparent",
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  
  };

    return (
    <Modal visible={props.visible} animationType="slide" >
      <View style={[styles.analyticsPage, {backgroundColor:props.theme.background}]}>
        <View style={styles.header}>
        <Pressable onPress={props.cancel}><FontAwesome5 style={styles.headerText} name={'times-circle'} /></Pressable>
        <FontAwesome5 style={[styles.userIcon, {color:props.theme.primary}]} name={'user-circle'} />
        
        </View>
        <View style={styles.userData}>
          <View>
            <View style={styles.progressStyle}>
              <Text style={[styles.dailyHeader, {color:props.theme.secondary}]} >You completed {percent}% of your daily goals.</Text>
            <View style={styles.progressRing}>
            {progress == 1 && <FontAwesome5 style={styles.nice} name={'check-circle'}/>}
              <ProgressRing progress={percent} theme={props.userObj.theme}/>
              </View>
            </View>
            <Text style={[styles.graphHeader, {color:props.theme.secondary}]}>Daily Score last 30 days</Text>
            <View style={[{borderColor: props.userObj.theme.primary},{borderWidth:1},{marginTop: 40}]}>
            <View style={styles.container}>
      {props.userObj.thirtyDays.map((value, index) => (
        <View key={index} style={styles.barContainer}>
          <View style={[styles.bar, { height: (value / maxDataValue) * 100 }, {backgroundColor: props.userObj.theme.primary}]} />
        </View>
      ))}
    </View>
            </View>
            <View style={styles.barLabels}>
            <Text style={{color:props.theme.secondary}}>30 Days Ago</Text>
            <Text style={{color:props.theme.secondary}}>Today</Text>
            </View>
          </View>
        </View>
      </View>
  </Modal>
      );
};

export default AnalyticsPage;

const styles = StyleSheet.create({
  analyticsPage: {
    height: '100%',
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
    color: '#00bcd4',
    alignSelf: 'center'
  },
  userData: {
    width: '100%',
    height: '80%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  bar: {
    width: 20,
    backgroundColor: 'blue',
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  dailyHeader: { 
    fontSize: 20,
    marginTop: 50,
  },
  progressStyle: { 
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
  },
  progressRing: {
    marginTop: 40,
    transform: [{ rotate: '-90deg' }]
  },
  nice: {
    position: 'absolute',
    top: 0,
    left: '-40%',
    right: 0,
    bottom: 0,
    textAlign: 'center',
    zIndex: 100,
    color: '#0CCA4A',
    fontSize: 40,
    transform: [{ rotate: '90deg' }]
  },
  graphHeader: {
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 20,
  },
  barLabels : {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  barContainer: {
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  bar: {
    width: 15,
    backgroundColor: '#0080ff',
  },
})