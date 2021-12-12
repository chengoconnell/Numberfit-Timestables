import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableHighlight } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Task = (props) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
            <View>
            <TouchableHighlight 
                underlayColor = '#ccc'
                >
             <Ionicons style={{marginHorizontal: 15}} name="person-circle-outline" size={50} color="black"></Ionicons>
            </TouchableHighlight>
            </View>
            <Text style={styles.itemText}>{props.text}</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    icon: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxHeight: '100%',

    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5
    },

});

export default Task;