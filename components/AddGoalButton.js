import { useEffect,useState } from 'react';
import { StyleSheet, View, FlatList, Button, Image, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export default function AddGoalButton(props) {

    return (
        <Pressable style={styles.addContainer} onPress={props.passed}>
            <View style={[styles.newBtn, {backgroundColor:props.theme.primary}]}>
                <FontAwesome5 style={[styles.newGoalText, {backgroundColor:props.theme.primary}]}  name={'plus'} />
            </View>
      </Pressable>
    );
}
const styles = StyleSheet.create({
    newBtn: {
        backgroundColor: '#00bcd4',
        borderRadius: '50%',
        height: 90,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1, 
      },
      addContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
      },
      newGoalText: {
        fontSize: 30,
      },
})