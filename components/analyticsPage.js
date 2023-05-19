import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProgressRing from './ProgressRing';

function AnalyticsPage(props) {
  const [progress, setProgress] = useState(0);
  const [percent, setPercent] = useState(0);
  const [maxDataValue, setMaxDataValue] = useState(Math.max(...props.userObj.lastTwoWeeks));

  useEffect(() => {
    calcualteMaxGoal();
  }, []);
  function calcualteMaxGoal(){
    let maxGoal = 0;
    let complete = 0;
    for(let i=0;i<props.goals.length;i++){
      if(props.goals[i].type == 'daily'){
        maxGoal = maxGoal+1;
        if(props.goals[i].complete == true){
          complete = complete +1;
        }
      }
    }
  if(complete !=0 && maxGoal != 0){
    let calcProgress = (complete / maxGoal);
    setProgress(calcProgress);
    let percent = Math.floor(calcProgress * 100);
      setPercent(percent);
  }
  }

    return (
      <View style={[styles.analyticsPage, {backgroundColor:props.theme.background}]}>
        <View style={styles.userData}>
          <View>
            <View style={styles.progressStyle}>
              <Text style={[styles.dailyHeader, {color:props.theme.secondary}]} >You completed {percent}% of your daily goals.</Text>
            <View style={styles.progressRing}>
            {progress == 1 && <FontAwesome5 style={styles.nice} name={'check-circle'}/>}
              <ProgressRing progress={percent} theme={props.userObj.theme}/>
              </View>
            </View>
            <Text style={[styles.graphHeader, {color:props.theme.secondary}]}>Daily Score last 14 days</Text>
            <View style={styles.container}>
                {props.userObj.lastTwoWeeks.map((value, index) => (
                  <View key={index} style={styles.barContainer}>
                    <View style={[styles.bar, maxDataValue===0? null :{ height: (value / maxDataValue) * 100 }, {backgroundColor: props.userObj.theme.primary}, value===0 ? null: {borderWidth: 1}]} />
                    <Text style={[{color: props.userObj.theme.secondary}]}>{value}</Text>
                  </View>
                ))}
            </View>
            <View style={styles.barLabels}>
            <Text style={{color:props.theme.secondary}}>14 Days Ago</Text>
            <Text style={{color:props.theme.secondary}}>Today</Text>
            </View>
          </View>
        </View>
      </View>
      );
};

export default AnalyticsPage;

const styles = StyleSheet.create({
  analyticsPage: {
    flex: 1,
    alignItems: 'center',
  },
  userData: {
    width: '100%',
    height: '90%',
  },
  bar: {
    width: 20,
    backgroundColor: 'blue',
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  dailyHeader: { 
    fontSize: 20,
  },
  progressStyle: { 
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '55%',
  },
  progressRing: {
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
    height: '30%',
  },
  barContainer: {
    flex: 1,
    alignItems: 'center'
  },
  bar: {
    width: 25,
    backgroundColor: '#0080ff',
    justifyContent: 'flex-end',
  },
})