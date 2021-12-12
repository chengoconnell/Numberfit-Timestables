import React, { useState, useEffect } from "react";
import {Text,Alert, TouchableOpacity,
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

import { Dimensions } from "react-native";
import ChooseUser from '../components/UserSelectIcon'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';



const screenWidth = Dimensions.get("window").width;

global.userType = ' ';

const UserSelectLogin = ({route,navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [testing, setTesting] = useState();
    global.userType = testing;
    useEffect(()=>{
        async function fetchData (){
    
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        let result = JSON.parse(value)
        console.log(result)
        setTesting(result.role)
        if(result.role === 'student'){
            navigation.navigate('numberFit');
            }
        if(result.role === 'parent'){
              navigation.navigate('numberFitParent');
              }
        if(result.role === 'teacher'){
              navigation.navigate('numberFitTeacher');
              }
        
        
      }
    } catch (error) {
      console.log("error")
    }
    }fetchData()},[])
    return(
        <View style = {styles.container}>
            <View style={styles.randomContainer}>
            <ChooseUser
                level = 'Student'
                colour = 'red'
                iconName = 'school-outline'
                iconColor = 'red'
                isDisabled = {false}
                // pic = {require('../imgs/penguin.png')}
                onPress={() => {setTesting('student')
                                navigation.navigate('Login')}} />
            <ChooseUser
                level = 'Teacher'
                colour = 'lightblue'
                iconName = 'book-outline'
                iconColor = 'green'
                isDisabled = {false}
                // pic = {require('../imgs/penguin.png')}
                onPress={() => {setTesting('teacher')
                                navigation.navigate('Login')}} />
            <ChooseUser
                level = 'Parent'
                colour = 'green'
                iconName = 'people-outline'
                iconColor = 'blue'
                // pic = {require('../imgs/penguin.png')}
                onPress={() => {setTesting('parent')
                                navigation.navigate('Login')}} />
                                </View>
                                <TouchableOpacity onPress={() => {setTesting('teacher')
                                navigation.navigate('Registration')}}>
                                <Text style={styles.text}>Newbie? Click here to Register</Text>
                                </TouchableOpacity>
                         
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
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center'
    },
    text: {
        fontSize: 24,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        textAlign: 'center',
        marginBottom: 75,
        color: '#99ccff'
    },
})

export default UserSelectLogin;