import { StyleSheet, View, Text} from 'react-native';
import TextFont from './TextFont';

function UserPage(props) {

    return (
          <View style={[styles.userPage]}>
          <TextFont style={[styles.title, {color:props.theme.secondary}]}>{props.userObj.name}</TextFont>
            <View style={styles.userData}>
              <View style={styles.column}>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><TextFont style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.hiScore}</TextFont><TextFont style={[styles.medFontTitle, {color:props.theme.secondary}]}>Daily Hi-Score</TextFont></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><TextFont style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.goalsCompleted}</TextFont><TextFont style={[styles.medFontTitle, {color:props.theme.secondary}]}>Goals Completed</TextFont></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><TextFont style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.perfectDays}</TextFont><TextFont style={[styles.medFontTitle, {color:props.theme.secondary}]}>Perfect Days</TextFont></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><TextFont style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.perfectScore}</TextFont><TextFont style={[styles.medFontTitle, {color:props.theme.secondary}]}>Perfect Score</TextFont></View>
              </View>
              <View style={styles.column}>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><TextFont style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.motivRank}</TextFont><TextFont style={[styles.medFontTitle, {color:props.theme.secondary}]}>MotivRank</TextFont></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><TextFont style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.totalScore}</TextFont><TextFont style={[styles.medFontTitle, {color:props.theme.secondary}]}>Total Score</TextFont></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><TextFont style={[styles.medFontSize, {color:props.theme.secondary}]}>{props.userObj.name}</TextFont><TextFont style={[styles.medFontTitle, {color:props.theme.secondary}]}>Name</TextFont></View>
              <View style={[styles.userDataItem, {borderColor:props.theme.secondary}]}><TextFont style={[styles.smFontSize, {color:props.theme.secondary}]}>{props.userObj.email}</TextFont><TextFont style={[styles.medFontTitle, {color:props.theme.secondary}]}>Email</TextFont></View>
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
  title: {
    fontSize: 30,
    fontWeight: 500,
    paddingTop: '5%'
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
    height: 72,
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
    justifyContent: 'center',
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