import React, {Component} from 'react';
import {Text, Alert, View, StyleSheet, Pressable, Modal} from 'react-native';
import DifficultyButton from '../components/DifficultyButton';
import OptionModal from '../components/OptionModal';
import { useState } from "react";
import {ChangeChoice} from '../screens/LandingPage';
import {testing} from '../screens/LandingPage';

// global.Mastery = 1
// () => navigation.navigate('Load Video', {paramKey: route.params.paramKey})

// function calcMastery() {
//     if(global.Mastery !== 0) {
//         return 'EXPERIENCED';
//     }else{
//         return 'BEGINNER'
//     }
// }

function callAlert(navigateVideo, navigateTest) {
    if(calcMastery() === 'EXPERIENCED') {
        Alert.alert(
            "Please select an option: ",
            "Note: Once you start a test your marks will be visible to teachers and parents",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Watch Video", onPress: {navigateVideo} },
                { text: "Start Test!", onPress: {navigateTest} }
            ]
            )
    }
    else{
        Alert.alert(
            "Please select an option: ",
            "Note: Once you start a test your marks will be visible to teachers and parents",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Start Test!", onPress: {navigateTest} }
            ]
            )
    };
}

const DifficultyPage = ({route,navigation})=>{
    const [difficultyLevel, setDifficultyLevel] = useState();
    const { difficulty, otherParam } = route.params;
    console.log(difficulty)
    global.difficultyLevel = difficultyLevel;
    // global.gameMode = '';
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Choose Your Difficulty!</Text>
            <DifficultyButton
                level = 'Beginner'
                colour = '#cd7f32'
                isDisabled = {false}
                onPress={() => {
                    Alert.alert(
                    "Please select an option: ",
                    "Note: Once you start a test your marks will be visible to teachers and parents",
                    [
                        {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "Watch Video", onPress: () => navigation.navigate('Load Video', {paramKey: route.params.paramKey}) },
                        { text: "Start Test!", onPress: () => navigation.navigate('Load Test', {paramKey: route.params.paramKey}) }
                    ]
                    )
                    setDifficultyLevel('beg')
                    // global.gameMode = 'beginner'
                    ;}
                        }    >
            </DifficultyButton>
            <DifficultyButton
                level = 'Intermediate'
                colour = '#c0c0c0'
                isDisabled = {difficulty =="beg" ? true : false }
                onPress={() => {
                    Alert.alert(
                    "Please select an option: ",
                    "Note: Once you start a test your marks will be visible to teachers and parents",
                    [
                        {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "Watch Video", onPress: () => navigation.navigate('Load Video') },
                        { text: "Start Test!", onPress: () => navigation.navigate('Load Test') }
                    ]
                    )
                    setDifficultyLevel('int')
                    // global.gameMode = 'medium'
                }
                 } >
            </DifficultyButton>
            <DifficultyButton
                level = 'Advanced'
                colour = '#ffd700'
                isDisabled = {difficulty ==="adv" ? false : true }
                onPress={() => {
                    Alert.alert(
                    "Please select an option: ",
                    "Note: Once you start a test your marks will be visible to teachers and parents",
                    [
                        {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "Watch Video", onPress: () => navigation.navigate('Load Video') },
                        { text: "Start Test!", onPress: () => navigation.navigate('Load Test') }
                    ]
                    )
                    setDifficultyLevel('adv')
                    // global.gameMode = 'advanced'
}} >
            </DifficultyButton>
        </View>
    )}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    }
}
)


export default DifficultyPage;