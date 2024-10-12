import { View, TextInput, Button, StyleSheet, Modal, Pressable,TouchableWithoutFeedback, Keyboard, Animated, ActivityIndicator} from 'react-native';
import { useState, useRef, useEffect } from 'react'
import GoalWizard from './GoalWizard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import BackgroundSVG from '../assets/BackgroundSVG';
import DarkBackground from '../assets/DarkBackground';
import TextFont from './TextFont';


function GoalInput(props) {
    const [goalTitle, setGoalText] = useState('');
    const [goalType, setType] = useState('daily');
    const [level, setLevel] = useState('Easy');
    const [isExpanded, setIsExpanded] = useState(false);
    const [goalWizard, setGoalWizard] = useState();


    const slideAnim = useRef(new Animated.Value(80)).current;
    const wideAnim = useRef(new Animated.Value(185)).current;
    const topAnim = useRef(new Animated.Value(645)).current;
    const leftAnim = useRef(new Animated.Value(215)).current;
    const bottomAnim = useRef(new Animated.Value(0)).current;
    const rightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
    }, []); 
    //button is 645,215
    function goalInputHandler(enteredText) {
        setGoalText(enteredText);
      }
      const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        const topCenter = Animated.timing(topAnim, {
          toValue: 375, 
          duration: 600,
          useNativeDriver: false, 
        });
        const leftCenter= Animated.timing(leftAnim, {
          toValue: 115, 
          duration: 600,
          useNativeDriver: false, 
        });
        const firstAnimation = Animated.parallel([topCenter, leftCenter]);
        const height = Animated.timing(slideAnim, {
          toValue: 900, 
          duration: 600,
          useNativeDriver: false, 
        });
        const width= Animated.timing(wideAnim, {
          toValue: 450, 
          duration: 600,
          useNativeDriver: false, 
        });
        const top = Animated.timing(topAnim, {
          toValue: -50, 
          duration: 600,
          useNativeDriver: false, 
        });
        const left = Animated.timing(leftAnim, {
          toValue: -50, 
          duration: 600,
          useNativeDriver: false, 
        });
        const secondAnimation = Animated.parallel([height,width,top,left])
        const finalAnimation = Animated.sequence([firstAnimation,secondAnimation])
        finalAnimation.start();
      };
    function addGoalHandler() {
        toggleExpand();
        setTimeout(() => {
          postGoal();
          setGoalText('');
          setIsExpanded(!isExpanded);
         }, 1200);
    }
    function postGoal(){
      let goal = {owner: props.userObj._id, title: goalTitle, complete: false, type: goalType, difficulty: level, timesCompleted: 0};
      axios.post(`${props.API_URL}/api/goals`, goal, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => props.onAddGoal(res.data))
      .catch(err => console.log(err));
    }
    function toggleGoalWizard(toggleWizard){
      if(toggleWizard){
        setGoalWizard(true);
      }
      else {
        setGoalWizard(false);
        
      }
    }
    function createWizardGoal(goal){
      setGoalWizard(false);
      setGoalText(goal.title);
      setType(goal.type);
      setLevel(goal.diff);
      //wizardGoal();
    }
    async function wizardGoal(){
      await postGoal();
    }

    return (
      <Modal animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {goalWizard==undefined ?
          <View style={[styles.wizardContainer, {backgroundColor:props.userObj.theme.background}]}>
          {props.userObj.theme.background != '#0e1111' ?  <BackgroundSVG/> : <DarkBackground/>}
            <Pressable style={[styles.wizardButton,{backgroundColor:props.userObj.theme.primary}]} onPress={() => toggleGoalWizard(true)}><TextFont style={styles.wizardText}>Goal Wizard </TextFont><TextFont><FontAwesome5 style={styles.wizardIcon} name={'magic'} /> </TextFont></Pressable>
            <Pressable style={[styles.wizardButton,{backgroundColor:props.userObj.theme.primary}]} onPress={() => toggleGoalWizard(false)}><TextFont style={styles.wizardText}>Custom goal</TextFont><TextFont><FontAwesome5 style={styles.wizardIcon} name={'list-alt'} /> </TextFont></Pressable>
            <Pressable style={[styles.wizardButton,{backgroundColor:props.userObj.theme.primary}]} onPress={props.cancel}><TextFont style={styles.exitText}>Cancel</TextFont></Pressable>
          </View>
          : 
            <View style={[styles.inputContainer, {backgroundColor:props.userObj.theme.background}]}>
              {props.userObj.theme.background != '#0e1111' ?  <BackgroundSVG/> : <DarkBackground/>}
                        {goalWizard==true ? <GoalWizard userObj={props.userObj} close={createWizardGoal}/> :
  <View style={styles.goalContainer}>
            <View style={styles.goalSection}>
              <TextFont style={styles.subText}>Goal Title</TextFont>
                <TextInput style={styles.textInput} 
                  placeholder='Your goal title'
                  placeholderTextColor={'gray'}
                  onChangeText={goalInputHandler}
                  value={goalTitle} 
                  selectionColor={'#d4af37'}
                  required
                />
            </View>
            <View style={styles.goalSection}>
            <TextFont style={styles.subText}>Goal Type?</TextFont>
                <View style={styles.types}>
                  <Pressable style={[styles.typeChoice, goalType == 'daily' ? styles.typeHighlight : styles.typeChoice]} onPress={() => {setType('daily'), Keyboard.dismiss()}}>
                    <FontAwesome5 style={[styles.typeText, goalType == 'daily' ? styles.dailySelected : styles.typeText]} name={'history'} /> 
                    <TextFont style={[styles.typeText, goalType == 'daily' ? styles.dailySelected : styles.typeText]}>Daily</TextFont>
                  </Pressable>
                  <Pressable style={[styles.typeChoice, goalType == 'ToDo' ? styles.typeHighlight : styles.typeChoice]} onPress={() => {setType('ToDo'), Keyboard.dismiss()}}>
                    <FontAwesome5 style={[styles.typeText, goalType == 'ToDo' ? styles.dailySelected : styles.typeText]} name={'list-alt'} /> 
                    <TextFont style={[styles.typeText, goalType == 'ToDo' ? styles.dailySelected : styles.typeText]}>To Do</TextFont>
                  </Pressable>
                </View>
            </View>
            <View style={styles.goalSection}>
            <TextFont style={styles.subText}>Goal Difficulty?</TextFont>
                <View style={styles.types}>
                  <Pressable style={[styles.difficulty, level == 'Easy' ? styles.typeHighlight : styles.difficulty]} onPress={() => {setLevel('Easy'), Keyboard.dismiss()}}>
                    <TextFont style={[styles.typeText, level == 'Easy' ? styles.easy : styles.typeText]}>Easy</TextFont>
                  </Pressable>
                  <Pressable style={[styles.difficulty, level == 'Medium' ? styles.typeHighlight : styles.difficulty]} onPress={() => {setLevel('Medium'), Keyboard.dismiss()}}>
                    <TextFont style={[styles.typeText, level == 'Medium' ? styles.medium : styles.typeText]}>Medium</TextFont>
                  </Pressable>
                  <Pressable style={[styles.difficulty, level == 'Hard' ? styles.typeHighlight : styles.difficulty]} onPress={() => {setLevel('Hard'), Keyboard.dismiss()}}>
                    <TextFont style={[styles.typeText, level == 'Hard' ? styles.hard : styles.typeText]}>Hard</TextFont>
                  </Pressable>
                </View>
            </View>
            <View style={styles.goalSection}>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Cancel' onPress={props.cancel} color={'gray'}/>
                    </View>
                  <View style={[styles.button, {backgroundColor: '#00bcd4'}, isExpanded ? {opacity: 0} : null]}>
                        <Pressable onPress={addGoalHandler} style={styles.addBtn}>
                        <FontAwesome5 style={[styles.newGoalText, {fontSize: 20}]} name={'paper-plane'} />
                        </Pressable>
                    </View>
                </View>
            </View>
                {isExpanded ? 
                <Animated.View style={[styles.animatedBtn, {backgroundColor: '#00bcd4'},{  height: slideAnim, width: wideAnim}, {top: topAnim, left:leftAnim, right: rightAnim, bottom: bottomAnim}  ] } >
                    <Pressable onPress={addGoalHandler} style={styles.addBtn}>
                    <FontAwesome5 style={[styles.newGoalText, {fontSize: 20, paddingBottom: 15}]} name={'paper-plane'} />
                    <ActivityIndicator color="black" />
                    </Pressable>
                </Animated.View>
                : null}
                </View>
          }
            </View>
            
              }
            </TouchableWithoutFeedback>
      </Modal>
      );
};

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        padding: 16,
        flex: 1,
      },
      goalContainer: {
        height: '95%',
        marginTop: '10%',
        justifyContent: 'space-evenly'
      },
      goalSection: {
        marginTop: '15%',
        alignItems: 'center',
      },
      textInput: {
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        backgroundColor: '#DDD',
        borderRadius: 15,
        width: '94%',
        padding: 8,
        color: '#666',
        fontSize: 30,

      },
      types: {
        flexDirection: 'row',
        gap: 10,
        height: 100,
        justifyContent: 'space-evenly'
      },
      typeChoice: {
        borderWidth: 2,
        borderColor: 'gray',
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10
      },
      typeText: {
        color: 'gray',
        fontSize: 18,
      },
      subText: {
        fontSize: 27,
        fontWeight: 900,
        color: 'gray',
        marginBottom: 10
      },
      dailySelected: {
        //color: '#FFC107',
        color: '#00bcd4',
      },
      typeHighlight: {
        borderColor: '#00bcd4',
        boxShadow: '0 0 10px #00bcd4',
        borderWidth: 2,
      },
      difficulty: {
        borderWidth: 2,
        borderColor: 'gray',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginBottom: '25%'
      },
      button: {
        marginHorizontal: 8,
        borderWidth: 2,
        borderColor: 'gray',
        width: '46%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      addBtn: {
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      easy: {
        color: '#58cc02',
      },
      medium: {
        color: '#FFC107',
      },
      hard: {
        color: 'red',
      },
      animatedBtn: {
        position: 'absolute', 
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      },
      newGoalText: {
        //transform: [{translateX: -7}],
        fontSize: 20
      },
      creationScreen: {
        //...StyleSheet.absoluteFill,
      },
      wizardContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: '15%',
      },
      wizardButton: {
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 15,
        width: '50%',
        height: '15%',
        justifyContent: 'center',
        alignItems:'center',
        
      },
      wizardText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10
      },
      wizardIcon: {
        fontSize: 30
      },
      exit: {
        width: '100%',
        borderWidth: 1,
        height: '15%',
        padding: 27,
        backgroundColor: 'gray',
        opacity: .5
      },
      exitText: {
        color: 'gray',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
      }
})