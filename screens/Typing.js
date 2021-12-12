import React, {useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight, TextInput } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Typing() {
    const [answer, setAnswer] = useState(' ');
    // const [age,setAge] = useState('30')

    return (
        <View style={styles.container}>
        <Text>Enter your answer:</Text>
        <TextInput 
        style={styles.input}
        placeholder='e.g. JohnDoe'
        onChangeText={(val) => setAnswer(val)}
        keyboardType='numeric' />
        <Text>answer: {answer}</Text></View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200
    }
})

