import { View, TextInput, Button, StyleSheet, Modal, Text, Pressable, Keyboard} from 'react-native';
import { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

function GoalInput(props) {
    const [goalTitle, setGoalText] = useState('');
    const [goalType, setType] = useState('daily');
    const [level, setLevel] = useState('Easy');
    const [_id, setId] = useState(null);

    function goalInputHandler(enteredText) {
        setGoalText(enteredText);
      }
    function addGoalHandler() {
        postGoal();
        setGoalText('');
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

    return (
        <Modal visible={props.visible} animationType="slide" >
            <View style={styles.inputContainer}>
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
                    <View style={[styles.button, {backgroundColor: '#00bcd4'}]}>
                        <Pressable onPress={addGoalHandler} style={styles.addBtn}>
                        <FontAwesome5 style={[styles.newGoalText, {fontSize: 20}]} name={'paper-plane'} />
                        </Pressable>
                    </View>
                </View>
            </View>
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
        backgroundColor: '#fff9ef',
        gap: 10,
        //backgroundColor: '#0e1111',
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
      }
})