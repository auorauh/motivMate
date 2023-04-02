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
        {props.value.title==null ? (
        <View style={styles.emptyGoal}>
          {/* empty goal element */}
        </View>) 
        : (
        <View style={props.value.complete? [styles.goalItem,styles.completeGoal] : [styles.goalItem, {backgroundColor:props.theme.primary}]}>
            <View style={styles.editIcon}>
              <FontAwesome5 style={{fontSize:15}} name={'edit'} />
            </View>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalText}>
                  {props.value.title == '' ? ('___') : (props.value.title)}
                  <View style={styles.goalType}>
                      {props.value.type == 'daily' ? (
                      <FontAwesome5 style={styles.goalTypeIcon} name={'clock'} />
                    ) : (
                      <FontAwesome5 style={styles.goalTypeIcon} name={'bullseye'} />
                    ) 
                    }
                    </View>
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
        )}
    </Pressable>
    )

}


export default GoalItem;

const styles = StyleSheet.create({
    goalItem:{
        height: 100,
        width: '100%',
        borderRadius: 15,
        //backgroundColor: '#00bcd4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 23,
        marginTop: 25,
      },
      goalTextContainer: {
        width: '70%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      goalText: {
        padding: 0,
        fontSize: 25,
        width: '70%',
      },
      editIcon: {
        position: 'absolute',
        top: 5,
        left: 10,
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
        //borderWidth: 1,
        width: '3%',
        borderRadius: 1,
        transform: [{translateX: -.05}],
      },
      emptyGoal: {
        height: 115,
        width: '100%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 24,
        marginTop: 25,
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