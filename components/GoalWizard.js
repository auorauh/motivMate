import { View, TextInput, Button, StyleSheet, Text, Pressable,TouchableWithoutFeedback, Keyboard, Animated, FlatList} from 'react-native';
import { useState, useRef, useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {intro, step1,step2,step3,step4,step5,Finance,Health,Education,Work,Social,Personal } from '../functions/wizardHelper';


function GoalWizard(props) {
    const [stage, setStage] = useState(0);
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [header, setHeader] = useState(intro.header);
    const [subHeader, setSubHeader] = useState(intro.subHeader);
    const [text, setText] = useState(intro.text);
    const [content, setContent] = useState([]);
    const [disableNext, setDisabled] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedButton, setSelectedButton] = useState(-1);
    const [goalHelperText, setGoalHelperText] = useState('');

    const [goalTitle, setGoalTitle] = useState('');
    const [goalDifficulty, setDifficulty] = useState('');
    const [goalType, setType] = useState('');

    useEffect(() => {
      //console.log(props);
    }, []); 

    function next(){
      let newStage = stage + 1;
      setStage(newStage);
      switch (newStage) {
        case 1:
          setHeader(step1.header);
          setSubHeader(step1.subHeader);
          setContent(step1.content);
          setSelectedButton(-1);
          break;
        case 2:
          setHeader(step2.header);
          setSubHeader(step2.subHeader);
          subCategoryContent(category);
          //setContent(Finance.content);
          setSelectedButton(-1);
          break;
        case 3:
          setHeader(step3.header);
          setSubHeader(step3.subHeader);
          setSelectedButton(-1);
          break;
        case 4:
          setSubHeader(step4.subHeader);
          setContent(['Easy','Medium','Hard']);
          break;
        case 5:
          setSelectedButton(-1);
          setSubHeader(step5.subHeader);
          setContent(['Daily', 'Weekly', 'Monthly', 'To Do']);
          break;
        case 6: 
          setText('Create Goal');
          setSubHeader('Create your Goal!');
          setDisabled(false);
          break;
        case 7:
          props.close({title: goalHelperText + ' ' + goalTitle, diff: goalDifficulty, type: goalType});
        default:
          break;
      }
      if(stage < 5){
        setDisabled(true);
      }
    }
    function subCategoryContent(subcategory){
      switch (subcategory) {
        case 'Health':
          setContent(Health.content);
          break;
        case 'Finance':
          setContent(Finance.content);
          break;
        case 'Education':
          setContent(Education.content);
          break;
        case 'Work':
          setContent(Work.content);
          break;
        case 'Personal':
          setContent(Personal.content);
          break;
        case 'Social':
          setContent(Social.content);
          break;
        default:
          break;
      }
    }

    function buttonSelect(text, index){
      setSelectedCategory(category);
      setSelectedButton(index);
      switch (stage) {
        case 1:
          setCategory(text);
          break;
        case 2:
          setGoalHelperText(text);
          setSelectedSubcategory(text);
          break;
        case 4:
          setDifficulty(text);
          break;
        case 5:
          if(text == 'Daily'){
            setType('daily');
          }
          else if (text == 'Weekly'){
            setType('weekly');
          }
          else if (text == 'Monthly'){
            setType('monthly')
          } else {
            setType('ToDo')
          }
          break;
        default:
          break;
      }
      setDisabled(false);
    }

    function goalTitleHandler(enteredText) {
      setGoalTitle(enteredText);
      setDisabled(false);
    }

    return (
      <View style={[styles.inputContainer]}>
        <Text style={styles.headerText}>{header}</Text>
        <Text style={styles.headerSubText}>{subHeader} {stage == 3 ? goalHelperText + ' Target?' : null}</Text>
        {stage > 2 ? <View style={[styles.goalItem, {backgroundColor: props.userObj.theme.primary}]}>
          <View style={styles.moveIcon}>
            <FontAwesome5 name={'grip-lines'} />
          </View>
          <Text style={[styles.goalTitle,styles.font]}>{selectedSubcategory} {goalTitle}</Text>
          <View style={[styles.diffColor, goalDifficulty == 'Easy' ? styles.easy: null, goalDifficulty == 'Medium' ? styles.medium: null, goalDifficulty == 'Hard' ? styles.hard: null]}></View>
          
        </View> : null}
        <View style={styles.categoryContainer}>
                  <View style={styles.categoryContainer}>
                    {((stage < 3) || stage == 4 || stage == 5) ? <>
                    
                  {content.map((text, index) => (
                            <Pressable
                            key={index}
                            style={({ pressed }) => [
                              styles.category,
                              selectedButton === index && { borderColor: props.userObj.theme.primary, borderWidth: 2 }, // Check if this button is selected
                              pressed && { borderColor: 'lightgray' }, // Change border color when pressed
                            ]}
                            onPress={() => buttonSelect(text, index)}
                          >
                    <Text style={styles.font}>
                      {text}
                    </Text>
                    </Pressable>
                    ))}
                    </> : null}
                    {stage == 3 ? 
                    <>
                    <Text style={styles.goalTarget}>Goal Target</Text>
                    <TextInput
                    style={styles.formInput}
                    value={goalTitle}
                    onChangeText={goalTitleHandler}
                    required/> 
                    </>
                    : null}
                  </View>
                  {/* {stage == 4 ? 
                  <>
                  <View style={styles.difficultyContainer}>
                  <Pressable style={({pressed}) => [styles.difficulty]} onPress={() => difficulty('Easy')}><Text>Easy</Text>
                  </Pressable>
                  <Pressable style={styles.difficulty} onPress={() => difficulty('Medium')}><Text>Medium</Text>
                  </Pressable>
                  <Pressable style={styles.difficulty} onPress={() => difficulty('Hard')}><Text>Hard</Text>
                  </Pressable>
                  </View>
                  </> 
                  : null } */}
        </View>
                {text != null ? 
                <Pressable style={({ pressed }) => 
                  [{opacity: disableNext ? 0.5 : 1},styles.buttonContainer]}
                  onPress={next} disabled={disableNext}>
                  <Text style={styles.button}>{text}</Text>
                </Pressable>: <></>}
      </View>
      );
};

export default GoalWizard;

const styles = StyleSheet.create({
    inputContainer: {
        //backgroundColor: 'red',
        height: '100%',
        width: '100%',
        justifyContent: 'space-evenly'
      },
      headerText: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
      },
      headerSubText: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20
      },
      categoryContainer:{
        //width: '95%',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
      },
      category:{
        marginBottom: '5%',
        padding: '3.5%',
        width: 300,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        fontSize: 20
      },
      subCategoryContainer:{

      },
      buttonContainer: {
        backgroundColor: 'lightgray',
        height: 50,
        width: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius:  15,
        borderWidth: 2,
      },
      button: { 
        textAlign: 'center',
        
      },
      font: {
        fontSize: 25
      },
      goalTitleText: {
        textAlign: 'center',
      },

      creationScreen: {
        //...StyleSheet.absoluteFill,
      }, 
      formInput: {
        borderWidth: 1,
        height: 50,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        width: '100%',
        textAlign: 'center',
        marginBottom: '50%'
      },
      goalItem : {
        fontSize: 25,
        height: 80,
        width: '100%',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1
      },
      goalTitle: {
        marginLeft: 10,
      },
      goalTarget:{
        marginTop: 20,
        fontSize: 20
      },
      moveIcon: {
        fontSize: 20,
        marginLeft: 10,
      },
      difficultyContainer: {
        width: '100%'
      },
      difficulty: {
        borderWidth: 1,
        height: 50,
        width: 100,
        borderRadius: 15,
      },
      diffColor: {
        height: '100%',
        width: '4%',
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