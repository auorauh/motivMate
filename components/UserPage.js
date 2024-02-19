import { StyleSheet, View, Button, Image, Text, Pressable, Modal} from 'react-native';
import { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function UserPage(props) {

    return (
          <View style={[styles.userPage]}>
            <View style={styles.userData}>
              <View style={styles.column}>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.hiScore}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Daily Hi-Score</Text></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.goalsCompleted}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Goals Completed</Text></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.perfectDays}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Perfect Days</Text></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.perfectScore}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Perfect Score</Text></View>
              </View>
              <View style={styles.column}>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.motivRank}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>MotivRank</Text></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.totalScore}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Total Score</Text></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.name}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Name</Text></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.smFontSize, {color:props.theme.secondary}]}>{props.userObj.email}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Email</Text></View>
              </View>
            </View>
            <View style={styles.friendsSection}>
              <Text style={[styles.motivBracket,{color:props.theme.secondary}]}>Motiv Ranking High Scores</Text>
              <View style={[styles.friend, {borderColor:props.theme.secondary}]}>
                <Text style={[{color:props.theme.secondary}]}>User Name</Text>
                <Text style={[{color:props.theme.secondary}]}>Daily Score 100</Text>
                <Text style={[{color:props.theme.secondary}]}>MotivRank 1</Text>
              </View>
              <View style={[styles.friend, {borderColor:props.theme.secondary}]}>
                <Text style={[{color:props.theme.secondary}]}>User Name</Text>
                <Text style={[{color:props.theme.secondary}]}>Daily Score 100</Text>
                <Text style={[{color:props.theme.secondary}]}>MotivRank 2</Text>
              </View>
              <View style={[styles.friend, {borderColor:props.theme.secondary}]}>
                <Text style={[{color:props.theme.secondary}]}>User Name</Text>
                <Text style={[{color:props.theme.secondary}]}>Daily Score 100</Text>
                <Text style={[{color:props.theme.secondary}]}>MotivRank 3</Text>
              </View>
            </View>
            {/* <Button title='Edit' onPress={props.cancel} color={'red'}/> */}
          </View>
      );
};

export default UserPage;

const styles = StyleSheet.create({
  userPage: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
  },
  userIcon: {
    fontSize: 100,
    color: '#00bcd4',
    alignSelf: 'center'
  },
  userData: {
    width: '90%',
    paddingTop: 40,
    flexDirection: 'row',
  },
  column: {
    width: '45%',
    marginRight: '10%',
  },
  userDataItem: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
    justifyContent: 'center',
  },
  friendsSection: {
    flex: 1,
    width: '100%',
    padding: '5%',
    gap: '15%'
  },
  friend: {
    width: '100%',
    height: '20%',
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5%'
  },
  motivBracket: {
    fontSize: 20,
    paddingBottom: '3%',
    textAlign: 'center'
  },

  itemAlignCenter: {
    alignSelf: 'center',
  },
  itemAlignLeft: {
    alignSelf: 'flex-start',
  },
  medFontSize: {
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  smFontSize: {
    margin: 1,
    fontSize: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  medFontTitle: {
    fontSize: 13,
    paddingLeft: 10,
  },
})