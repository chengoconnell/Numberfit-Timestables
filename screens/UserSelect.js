import React, { useState, useEffect } from "react";
import {Text,Alert,
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'
import { Dimensions } from "react-native";
import ChooseUser from '../components/UserSelectIcon'

const screenWidth = Dimensions.get("window").width;

const UserSelect = ({route,navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);
    
    return(
        <View style = {styles.container}>
            <ChooseUser
                level = 'Student'
                colour = '#cd7f32'
                isDisabled = {false}
                onPress={() => navigation.navigate('SignUp')}>
            </ChooseUser>
            <ChooseUser
                level = 'Teacher'
                colour = '#c0c0c0'
                isDisabled = {false}
                onPress={() => navigation.navigate('TeacherSignUp')}>
            </ChooseUser>
            <ChooseUser
                level = 'Parent'
                colour = '#ffd700'
                isDisabled = {false}
                onPress={() => navigation.navigate('ParentSignUp')}>
            </ChooseUser>
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
    },
})

export default UserSelect;