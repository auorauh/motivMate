import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
        <View style={props.value.complete? [styles.goalItem,styles.completeGoal] : [styles.goalItem, {backgroundColor:props.theme.primary}]}>
            <View style={styles.moveIcon}>
              <FontAwesome5 name={'grip-lines'} />
            </View>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalText}>
                  {props.value.title}
              </Text>
              <Text></Text> 
            </View>
            <Text  style={styles.difficulty}>
            {props.value.difficulty == "Easy" ? '+ 10' : ''}
            {props.value.difficulty == "Medium" ? '+ 25' : ''}
            {props.value.difficulty == "Hard" ? '+ 100' : ''}
            </Text>
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
        height: 80,
        width: '100%',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
      },
      goalTextContainer: {
        width: '70%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
      },
      goalText: {
        fontSize: 25,
      },
      moveIcon: {
        fontSize: 20,
        marginLeft: 10,
      },
      goalType: {
        paddingLeft: 10,
        transform: [{translateY: -4}],
      },
      goalTypeIcon: { 
        fontSize: 20,
      },
      difficulty: {
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