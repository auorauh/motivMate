import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProgressRing from './ProgressRing';
import DottedBackground from '../assets/DottedBackground';

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
      <View style={[styles.analyticsPage]}>
        
        <View style={styles.userData}>
          <View style={[styles.ringContainer, styles.progressStyle]}>
            <Text style={[styles.dailyHeader, {color:props.theme.secondary}]} >You completed {percent}% of your daily goals.</Text>
            <View style={styles.progressRing}>
                {progress == 1 && <FontAwesome5 style={styles.nice} name={'check-circle'}/>}
                <ProgressRing progress={percent} theme={props.userObj.theme}/>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={[styles.graphHeader, {color:props.theme.secondary}]}>Daily Score last 14 days</Text>
            <View style={styles.graph}>
              {props.userObj.lastTwoWeeks.map((value, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.bar, maxDataValue===0? {height: 100 , backgroundColor: 'none'} :{ height: (value / maxDataValue) * 100 ,backgroundColor: props.userObj.theme.primary}, value===0 ? {borderBottomWidth: 1}: {borderWidth: 1}]} />
                <Text style={[{color: props.userObj.theme.secondary}]}>{value}</Text>
              </View>
              ))}
            </View>
            <View style={styles.barLabels}>
              <Text style={{color:props.theme.secondary}}>^14 Days Ago</Text>
              <Text style={{color:props.theme.secondary}}>Today^</Text>
            </View>
            <DottedBackground/>
          </View>       
        </View>
      </View>
      );
};

export default AnalyticsPage;

const styles = StyleSheet.create({
  analyticsPage: {
    alignItems: 'center',
    padding: 10,
    height: '100%',
  },
  userData: {
    width: '100%',
    justifyContent:  'space-between',
  },
  ringContainer: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dailyHeader: { 
    fontSize: 20,
    marginTop: '3%',
  },
  progressStyle: { 
    textAlign: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  progressRing: {
    marginTop: '10%',
    marginBottom: '10%',
    transform: [{ rotate: '-90deg' }],
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
  container: {
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: '#D3D3D3',
    //height: '35%',
    justifyContent: 'space-evenly',
    overflow: 'hidden'

  },
  graphHeader: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: '10%',
    marginTop: '5%',
  },
  graph: {
    flexDirection: 'row',
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'flex-end',
  },
  bar: {
    width: 25,
    backgroundColor: '#0080ff',
    justifyContent: 'flex-end',
  },
  barLabels : {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: '5%',
  },
})