import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import GoalItem from './GoalItem';

function GoalList(props, ref) {
const [list, setList] = useState(listTypes);

function setSelection(type){
    props.setListType(type);
    listTypes.forEach(element => {
        element.selected = false;
    });
    list.map((obj) => {
        if(obj.id === type.id){
            return obj.selected = true;
        } else {
            return obj;
        }
    });
    setList(list);
}
const [count, setCount] = useState(0);

// Define reset to be called from main on new goal
function resetGoalList() {
    setSelection(listTypes[0]);
}
useImperativeHandle(ref, () => ({
    resetGoalList
}));

return (
    <View>
        <View style={styles.listType}>
            <FlatList showsVerticalScrollIndicator={false} horizontal={true} data={list} ItemSeparatorComponent={() => <View style={{}} />} renderItem={(item) => {
        return <Pressable style={[item.item.selected ? [styles.listTypeItem,styles.selected] : [styles.listTypeItem]]} onPress={setSelection.bind(this,item.item)}><Text style={styles.listTypeText}>{item.item.listType}</Text></Pressable>
        }}
        keyExtractor={(item) => {
            return item.id;
    }}/>
        </View>
    <FlatList style={styles.goalSection} onRefresh={props.refresh} refreshing={props.refreshing} numColumns={1} data={props.userGoals} ItemSeparatorComponent={() => <View style={{ height: 15 }} />} renderItem={(itemData) => {
        return <GoalItem theme={props.userObj.theme} value={itemData.item} onDeleteItem={props.deleteGoal} _id={itemData.item._id} complete={props.completeGoal}/>;
        }}
        keyExtractor={(item) => {
            return item._id;
    }}/>
    </View>
    );
};

export default forwardRef(GoalList);

const styles = StyleSheet.create({
    //list Type styles
    listType: { 
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    listTypeItem: {
        fontSize: 25,
        width: 80,
        height: 30,
        justifyContent: 'center',
    },
    listTypeText: {
        fontSize: 20, 
        textAlign: 'center', 
        color: 'gray'
    },
    selected: {
        borderTopWidth: 2,
        borderColor: 'gray'
    },

    //goal section styles
    goalSection: {
        padding: 10,
        paddingTop: 0,
        marginBottom: '7%',
    }
})
const listTypes = [
    {
        listType: 'All',
        id: 'All',
        style: styles.listTypeItem,
        selected: true,
    },
    {
        listType: 'Daily',
        id: 'daily',
        style: styles.listTypeItem,
        selected: false
    },
    {
        listType: 'Weekly',
        id: 'weekly',
        style: styles.listTypeItem,
        selected: false
    },
    {
        listType: 'Monthly',
        id: 'monthly',
        style: styles.listTypeItem,
        selected: false
    },
    {
        listType: 'To Do',
        id: 'ToDo',
        style: styles.listTypeItem,
        selected: false
    }
];