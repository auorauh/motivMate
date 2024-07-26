import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProgressRing from './ProgressRing';
import DottedBackground from '../assets/DottedBackground';
import DarkCircles from '../assets/DarkCircles';
import LightCircles from '../assets/LightCircles';

function AnalyticsPage(props) {
  const [progress, setProgress] = useState(0);
  const [percent, setPercent] = useState(0);
  const [maxDataValue, setMaxDataValue] = useState(Math.max(...props.userObj.lastTwoWeeks));
  const [goals, setGoals] = useState('');
  const [goalTitles, setTitles] = useState([]);

  useEffect(() => {
    createReport();
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
  function createReport(){
    let dailyGoals = [];
    for(let i =0; i< props.goals.length;i++){
      if(props.goals[i].type == 'daily'){
        dailyGoals.push({title: props.goals[i].title, timesCompleted: props.goals[i].timesCompleted});
      }
    }
    setTitles(dailyGoals);
  }


      return (
        <ScrollView>
      <View style={[styles.analyticsPage]}>
        
        <View style={[styles.ringContainer , {borderColor:props.userObj.theme.secondary}]}>
            <Text style={[styles.dailyHeader, {color:props.theme.secondary}]} >You completed {percent}% of your daily goals.</Text>
            <View style={styles.progressRing}>
                <ProgressRing progress={percent} theme={props.userObj.theme}/>
            </View>
            {props.theme.secondary == 'black' ? <LightCircles/> : <DarkCircles/>}
          </View>
          <View style={styles.userData}>

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
    <Text style={{color:props.theme.secondary}}>Yesterday^</Text>
  </View>
  <DottedBackground/>
</View>       
</View>
  <View style={[styles.monthReview, {borderColor: props.userObj.theme.secondary}]}>
    <Text style={[styles.headerText, {color: props.theme.secondary}]}>Month in Review</Text>
    <Text style={[{color: props.theme.secondary}]}> (Daily Goals)</Text>
    {goalTitles.length > 0 ? (
      <>
        <View style={styles.lineItemBox}>
          <View style={[styles.lineItemTitle, {color: props.theme.secondary}, {borderColor: props.userObj.theme.secondary}]}><Text style={styles.reportText}> Title</Text></View> 
          <View style={[styles.lineItemTitle, {color: props.theme.secondary}, {borderColor: props.userObj.theme.secondary}]}><Text style={styles.reportText}> Completed</Text></View>
        </View>
        {goalTitles.map((item, index) => (
          <View style={styles.lineItem} key={`goal_${index}`}>
            <View style={[styles.reportLine, {color: props.theme.secondary}, {borderColor: props.userObj.theme.secondary}]}><Text style={styles.reportText}>{item.title}</Text></View>
            <View style={[styles.reportLine, {color: props.theme.secondary}, {borderColor: props.userObj.theme.secondary}]}><Text style={styles.reportText}>{item.timesCompleted}</Text></View>
          </View>
        ))}
      </>
    ) : (
      <Text style={[{color: props.theme.secondary}]}>You have no Daily Goals</Text>
    )}
  </View>
      </View>
      </ScrollView>
      );
};

export default AnalyticsPage;

const styles = StyleSheet.create({
  analyticsPage: {
    alignItems: 'center',
    //justifyContent: 'space-evenly',
    gap: '15%',
    padding: 10,
  },
  monthReview: {
    borderWidth: 1,
    width: '100%',
    padding: '3%',
    borderRadius: 15,
    minHeight: '33%',
    overflow: 'hidden',
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
    
  },
  lineItemBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    
  },
  lineItemTitle: {
    fontSize: 20,
    borderBottomWidth: 1,
    width: '50%'
  },
  reportLine: {
    borderBottomWidth: 1,
    width: '50%',
    padding: 5
  },
  reportText: {
    fontSize: 16,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 20
  },
  userData: {
    width: '100%',
    justifyContent:  'space-between',
  },
  ringContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxHeight: '10%',
    borderRadius: 15,
    overflow: 'hidden'
  },
  dailyHeader: { 
    textAlign: 'center',
    width: '60%',
    fontSize: 20,
    paddingLeft: '10%',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 12
  },
  progressRing: {
    transform: [{ rotate: '-90deg' }],
    alignItems: 'center',
  },
  container: {
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: '#D3D3D3',
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