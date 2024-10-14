import { View, TextInput, Button, StyleSheet, Pressable,Image, Keyboard, Animated, FlatList} from 'react-native';
import { useState, useRef, useEffect } from 'react'
import TextFont from './TextFont';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {intro, step1,step2,step3,step4,step5,Finance,Health,Education,Work,Social,Personal } from '../functions/wizardHelper';


function GoalWizard(props) {
    const [stage, setStage] = useState(0);
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState('');
    const [header, setHeader] = useState(intro.header);
    const [subHeader, setSubHeader] = useState(intro.subHeader);
    const [text, setText] = useState(intro.text);
    const [content, setContent] = useState([]);
    const [disableNext, setDisabled] = useState(false);
    const [selectedButton, setSelectedButton] = useState(-1);
    const [goalHelperText, setGoalHelperText] = useState('');

    const [goalTitle, setGoalTitle] = useState('');
    const [goalDifficulty, setDifficulty] = useState('');
    const [goalType, setType] = useState('');

    useEffect(() => {
    }, []); 

    function next(value){
      let newStage = stage + (value);
      setStage(newStage);
      switch (newStage) {
        case 0 : 
          setHeader(intro.header);
          setSubHeader(intro.subHeader);
          setContent([]);
          setDisabled(false)
          break;
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
          setContent(['Daily', 'To Do']);
          break;
        case 6: 
          setText('Create Goal');
          setSubHeader('If your title isn\'t right you can edit it in the next step');
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
      if(newStage == 0){
        setDisabled(false);
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
        case 'Personal':[styles.wizardButton,{backgroundColor:props.userObj.theme.primary}]
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
      setSelectedButton(index);
      switch (stage) {
        case 1:
          setCategory(text);
          break;
        case 2:
          setGoalHelperText(text);
          setSubCategory(text);
          break;
        case 4:
          setDifficulty(text);
          break;
        case 5:
          if(text == 'Daily'){
            setType('daily');
          }
          else {
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
        <TextFont style={[styles.headerText , {color:props.userObj.theme.secondary}]}>{header}</TextFont>
        {stage ==0 ? <Image style={styles.wizardLogo} source={require('../assets/WizardIcon.png')}></Image>: <></>}
        <TextFont style={[styles.headerSubText, {color:props.userObj.theme.secondary}]}>{subHeader} {stage == 3 ? goalHelperText + ' Target?' : null}</TextFont>
        {stage > 2 ? <View style={[styles.goalItem, {backgroundColor: props.userObj.theme.primary}]}>
          <View style={styles.moveIcon}>
            <FontAwesome5 name={'grip-lines'} />
          </View>
          <TextFont style={[styles.goalTitle,styles.font]}>{subCategory} {goalTitle}</TextFont>
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
                              {borderColor:props.userObj.theme.secondary},
                              selectedButton === index && { borderColor: props.userObj.theme.primary, borderWidth: 2 }, // Check if this button is selected
                              pressed && { borderColor: 'lightgray' }, // Change border color when pressed
                            ]}
                            onPress={() => buttonSelect(text, index)}
                          >
                    <TextFont style={[styles.font, {color:props.userObj.theme.secondary}]}>
                      {text}
                    </TextFont>
                    </Pressable>
                    ))}
                    </> : null}
                    {stage == 3 ? 
                    <>
                    <TextFont style={[styles.goalTarget, {color:props.userObj.theme.secondary}]}>Goal Target</TextFont>
                    <TextInput
                    style={[styles.formInput, {borderColor:props.userObj.theme.secondary}, {color:props.userObj.theme.secondary}]}
                    value={goalTitle}
                    onChangeText={goalTitleHandler}
                    required/> 
                    </>
                    : null}
                  </View>
        </View>
                {text != null ? 
                <>
                {(stage == 1 || stage == 2 || stage == 3) ?
                <Pressable value={1} style={({ pressed }) => 
                [styles.buttonContainer]}
                onPress={() => next(-1)}>
                <TextFont style={styles.button}>Back</TextFont>
              </Pressable>
                : <></>}
                <Pressable value={1} style={({ pressed }) => 
                  [{opacity: disableNext ? 0.5 : 1},styles.buttonContainer]}
                  onPress={() => next(1)} disabled={disableNext}>
                  <TextFont style={styles.button}>{text}</TextFont>
                </Pressable>
                </>
                : <></>}
      </View>
      );
};

export default GoalWizard;

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: '10%',
        height: '90%',
        width: '100%',
        justifyContent: 'space-evenly',
      },
      wizardLogo: {
        resizeMode: 'contain',
        width: '100%',
        height: '25%'
      },
      headerText: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 10
      },
      headerSubText: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20,
        paddingLeft: '7%',
        paddingRight: '7%',
      },
      categoryContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
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