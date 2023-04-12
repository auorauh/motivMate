import { StyleSheet, View, FlatList} from 'react-native';
import { useEffect } from 'react';
import GoalItem from './GoalItem';

function GoalList(props) {

useEffect(() => {
},[])

return (
    <View>
    <FlatList onRefresh={props.refresh} refreshing={props.refreshing} numColumns={1} data={props.actualGoals} renderItem={(itemData) => {
        return <GoalItem theme={props.userObj.theme} value={itemData.item} onDeleteItem={props.deleteGoal} _id={itemData.item._id} complete={props.completeGoal}/>;
        }}
        keyExtractor={(item) => {
            return item._id;
    }}/>
    </View>
    );
};

export default GoalList;

const styles = StyleSheet.create({

})