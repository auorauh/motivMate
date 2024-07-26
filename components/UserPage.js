import { StyleSheet, View, Text} from 'react-native';

function UserPage(props) {

    return (
          <View style={[styles.userPage]}>
          <Text style={[styles.title, {color:props.theme.secondary}]}>{props.userObj.name}</Text>
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
    fontWeight: 500
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
    height: 100,
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