import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TextFont from './TextFont';

function GoalItem(props){
  const [score, setScore] = useState('+ -');
    
    useEffect(() => {
      setPoints();
    },[])

    function setPoints(){
      if(props.value.difficulty == 'Easy'){
        setScore('+ 10');
      } else if(props.value.difficulty == 'Medium'){
        setScore('+ 25');
      } if(props.value.difficulty == 'Hard'){
        setScore('+ 100');
      }
    }

    return (
    <Pressable onLongPress={props.onDeleteItem.bind(this, props._id)} style={({pressed}) => pressed && styles.pressedItem} onPress={props.complete.bind(this,props._id)}>
        <View style={[
              (props.value.complete? [styles.goalItem,styles.completeGoal] : [styles.goalItem, {backgroundColor:props.theme.primary}]),
              (props.totalCount - 1 == props.index ? [{marginBottom: '7%'}] : {})
              ]}>
            <View style={styles.moveIcon}>
              <FontAwesome5 name={'grip-lines'} />
            </View>
            <View style={styles.goalTextContainer}>
              <TextFont style={styles.goalText}>
                  {props.value.title}
              </TextFont>
              <TextFont>{props.item}</TextFont> 
            </View>
            <View style={styles.streak}>
              {props.value.streak > 0  ?<TextFont style={[{color: 'gray'}]}>Streak {props.value.streak} <FontAwesome5 name={'fire-alt'} /></TextFont>: <><TextFont> </TextFont></>}
            </View>
            <TextFont  style={styles.difficulty}>     
            {props.value.difficulty == "Easy" ? '+ 10' : ''}
            {props.value.difficulty == "Medium" ? '+ 25' : ''}
            {props.value.difficulty == "Hard" ? '+ 100' : ''}
            </TextFont>
            {props.value.difficulty == "Easy" ?
            <View style={[styles.diffColor,styles.easy]}>
            </View> 
            : <></>}
            {props.value.difficulty == "Medium" ?
            <View style={[styles.diffColor,styles.medium]}>
            </View> 
            : <></>}
            {props.value.difficulty == "Hard" ?
            <View style={[styles.diffColor,styles.hard]}>
            </View> 
            : <></>}

        </View>
    </Pressable>
    )

}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem:{
        height: 72,
        width: '100%',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'space-between'
      },
      goalTextContainer: {
        //width: '50%',
        flex: 1,
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start'
      },
      goalText: {
        fontSize: 22,
      },
      moveIcon: {
        fontSize: 20,
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        flexDirection: 'row'
      },
      streak: {
        height: '100%',
        justifyContent: 'center',
        width: '20%'
      },
      difficulty: {
        width: '10%',
        textAlign: 'center'
      },
      diffColor:{
        height: '100%',
        width: '4%',
      },
      pressedItem: {
        opacity: .3,
      },
      completeGoal: {
        backgroundColor: '#0CCA4A'
      },
      easy: {
        backgroundColor: '#58cc02',
      },
      medium: {
        backgroundColor: '#FFC107',
      },
      hard: {
        backgroundColor: 'red',
      }
})