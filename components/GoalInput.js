import { View, TextInput, Button, StyleSheet, Modal, Text, Pressable,TouchableWithoutFeedback, Keyboard, Animated, ActivityIndicator} from 'react-native';
import { useState, useRef, useEffect } from 'react'
import GoalWizard from './GoalWizard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import BackgroundSVG from '../assets/BackgroundSVG';
import DarkBackground from '../assets/DarkBackground';


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
          toValue: 0, 
          duration: 600,
          useNativeDriver: false, 
        });
        const left = Animated.timing(leftAnim, {
          toValue: 0, 
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
      let goal = {owner: props.userObj._id, title: goalTitle, complete: false, type: goalType, difficulty: level};
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
            <Pressable style={[styles.wizardButton,{backgroundColor:props.userObj.theme.primary}]} onPress={() => toggleGoalWizard(true)}><Text style={styles.wizardText}>Goal Wizard </Text><Text><FontAwesome5 style={styles.wizardIcon} name={'magic'} /> </Text></Pressable>
            <Pressable style={[styles.wizardButton,{backgroundColor:props.userObj.theme.primary}]} onPress={() => toggleGoalWizard(false)}><Text style={styles.wizardText}>Custom goal</Text><Text><FontAwesome5 style={styles.wizardIcon} name={'list-alt'} /> </Text></Pressable>
            <Pressable style={styles.exit} onPress={props.cancel}><Text style={styles.exitText}>Cancel</Text></Pressable>
          </View>
          : 
            <View style={[styles.inputContainer, {backgroundColor:props.userObj.theme.background}]}>
              {props.userObj.theme.background != '#0e1111' ?  <BackgroundSVG/> : <DarkBackground/>}
                        {goalWizard==true ? <GoalWizard userObj={props.userObj} close={createWizardGoal}/> :
  <>
              <Text style={styles.subText}>Give your goal a title</Text>
                <TextInput style={styles.textInput} 
                  placeholder='Title your goal here'
                  placeholderTextColor={'gray'}
                  onChangeText={goalInputHandler}
                  value={goalTitle} 
                  selectionColor={'#d4af37'}
                  required
                />
                <Text style={styles.subText}>What Type of Goal?</Text>
                <View style={styles.types}>
                  <Pressable style={[styles.typeChoice, goalType == 'daily' ? styles.typeHighlight : styles.typeChoice]} onPress={() => {setType('daily'), Keyboard.dismiss()}}>
                    <FontAwesome5 style={[styles.typeText, goalType == 'daily' ? styles.dailySelected : styles.typeText]} name={'history'} /> 
                    <Text style={[styles.typeText, goalType == 'daily' ? styles.dailySelected : styles.typeText]}>Daily</Text>
                  </Pressable>
                  <Pressable style={[styles.typeChoice, goalType == 'weekly' ? styles.typeHighlight : styles.typeChoice]} onPress={() => {setType('weekly'), Keyboard.dismiss()}}>
                    <FontAwesome5 style={[styles.typeText, goalType == 'weekly' ? styles.dailySelected : styles.typeText]} name={'bullseye'} /> 
                    <Text style={[styles.typeText, goalType == 'weekly' ? styles.dailySelected : styles.typeText]}>Weekly</Text>
                  </Pressable>
                </View>
                <View style={styles.types}>
                  <Pressable style={[styles.typeChoice, goalType == 'monthly' ? styles.typeHighlight : styles.typeChoice]} onPress={() => {setType('monthly'), Keyboard.dismiss()}}>
                    <FontAwesome5 style={[styles.typeText, goalType == 'monthly' ? styles.dailySelected : styles.typeText]} name={'calendar-alt'} /> 
                    <Text style={[styles.typeText, goalType == 'monthly' ? styles.dailySelected : styles.typeText]}>Monthly</Text>
                  </Pressable>
                  <Pressable style={[styles.typeChoice, goalType == 'ToDo' ? styles.typeHighlight : styles.typeChoice]} onPress={() => {setType('ToDo'), Keyboard.dismiss()}}>
                    <FontAwesome5 style={[styles.typeText, goalType == 'ToDo' ? styles.dailySelected : styles.typeText]} name={'list-alt'} /> 
                    <Text style={[styles.typeText, goalType == 'ToDo' ? styles.dailySelected : styles.typeText]}>To Do</Text>
                  </Pressable>
                </View>
                <Text style={styles.subText}>Goal Difficulty?</Text>
                <View style={styles.types}>
                  <Pressable style={[styles.difficulty, level == 'Easy' ? styles.typeHighlight : styles.difficulty]} onPress={() => {setLevel('Easy'), Keyboard.dismiss()}}>
                    <Text style={[styles.typeText, level == 'Easy' ? styles.easy : styles.typeText]}>Easy</Text>
                  </Pressable>
                  <Pressable style={[styles.difficulty, level == 'Medium' ? styles.typeHighlight : styles.difficulty]} onPress={() => {setLevel('Medium'), Keyboard.dismiss()}}>
                    <Text style={[styles.typeText, level == 'Medium' ? styles.medium : styles.typeText]}>Medium</Text>
                  </Pressable>
                  <Pressable style={[styles.difficulty, level == 'Hard' ? styles.typeHighlight : styles.difficulty]} onPress={() => {setLevel('Hard'), Keyboard.dismiss()}}>
                    <Text style={[styles.typeText, level == 'Hard' ? styles.hard : styles.typeText]}>Hard</Text>
                  </Pressable>
                </View>

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
                {isExpanded ? 
                <Animated.View style={[styles.animatedBtn, {backgroundColor: '#00bcd4'},{  height: slideAnim, width: wideAnim}, {top: topAnim, left:leftAnim, right: rightAnim, bottom: bottomAnim}  ] } >
                    <Pressable onPress={addGoalHandler} style={styles.addBtn}>
                    <FontAwesome5 style={[styles.newGoalText, {fontSize: 20, paddingBottom: 15}]} name={'paper-plane'} />
                    <ActivityIndicator color="black" />
                    </Pressable>
                </Animated.View>
                : null}
                </>
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
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 16,
        paddingTop: '40%',
        gap: 10,
      },
      textInput: {
        borderBottomWidth: 1,
        width: '100%',
        padding: 8,
        color: 'gray',
        //marginBottom: 40,
        fontSize: 30
      },
      types: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        height: '10%',
        gap: 10,
      },
      typeChoice: {
        borderWidth: 1,
        borderColor: 'gray',
        height: '100%',
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      },
      typeText: {
        color: 'gray',
        fontSize: 18,
        fontWeight: 500,
      },
      subText: {
        fontSize: 18,
        fontWeight: 500,
        color: 'gray',
        alignSelf: 'flex-start',
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
        borderWidth: 1,
        borderColor: 'gray',
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
      },
      button: {
        marginHorizontal: 8,
        borderWidth:1,
        borderColor: 'gray',
        width: '49%',
        height: '33%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      addBtn: {
        height: '100%',
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
        borderWidth:1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      },
      addBtn2:{
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '50%',
      },
      wizardButton: {
        borderWidth: 2,
        borderRadius: 15,
        width: '50%',
        height: '20%',
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
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
      }
})