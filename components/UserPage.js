import { StyleSheet, View, Button, Image, Text, Pressable, Modal} from 'react-native';
import { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function UserPage(props) {

    return (
        <Modal visible={props.visible} animationType="slide" >
          <View style={[styles.userPage, {backgroundColor:props.theme.background}]}>
            <View style={styles.header}>
            <Pressable onPress={props.cancel}><FontAwesome5 style={styles.headerText} name={'times-circle'} /></Pressable>
            <FontAwesome5 style={[styles.userIcon, {color:props.theme.primary}]} name={'user-circle'} />
            </View>
            <View style={styles.userData}>
              <View style={styles.column}>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.totalScore}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Total Score</Text></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.goalsCompleted}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Goals Completed</Text></View>
              </View>
              <View style={styles.column}>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.name}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Name</Text></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><Text style={[styles.smFontSize, {color:props.theme.secondary}]}>{props.userObj.email}</Text><Text style={[styles.medFontTitle, {color:props.theme.secondary}]}>Email</Text></View>
              </View>
            </View>
            {/* <Button title='Edit' onPress={props.cancel} color={'red'}/> */}
          </View>
      </Modal>
      );
};

export default UserPage;

const styles = StyleSheet.create({
  userPage: {
    height: '100%',
    paddingTop:25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    width: '100%',
    justifySelf: 'flex-start',
  },
  headerText: {
    paddingTop: 10,
    fontSize: 25,
    color: 'gray',
  },
  userIcon: {
    fontSize: 100,
    color: '#00bcd4',
    alignSelf: 'center'
  },
  userData: {
    width: '90%',
    height: '80%',
    paddingTop: 40,
    flexDirection: 'row',
  },
  column: {
    width: '45%',
    marginRight: '10%',
  },
  userDataItem: {
    height: 70,
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
    justifyContent: 'center',
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