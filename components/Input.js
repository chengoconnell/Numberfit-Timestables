import React, {useState}  from 'react';
import {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { TextInput } from 'react-native-gesture-handler';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Input({label, placeholder, onChangeText}) {
        return (
            <View style={styles.inputContainer}>
                <Text>{label}</Text>
                    <TextInput 
                    placeholder={placeholder}
                    style={styles.input} 
                    onChangeText= {(text) => onChangeText(text)}
                    selectTextOnFocus={true}
                    maxLength={3}
                    keyboardType='numeric' />
                </View>
                
        );
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: 40,
        marginBottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: screenWidth/2.5,
        padding: 30,
        borderRadius: 20,
        fontSize: 50,
        textAlign: 'center',
        backgroundColor: 'lightblue'
    }
})