import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import PropTypes from 'prop-types';
import { Image, Animated, ScrollView, ImageBackground} from 'react-native';
import RandomNumber from '../factory/RandomNumber';
import { Dimensions, TouchableHighlight } from 'react-native';
import LandingHeader from '../components/LandingHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";


class Award extends Component{
    
    render(){
        let buttonStyle = styles(this.props)
        
        return( 
        <View style = {buttonStyle.container}>
            {function(){
                if(this.props.isLocked){return(
                    <TouchableOpacity onPress = {() => Alert.alert(this.props.lockedMessage, this.props.awardSubMessage)}>
                    <Ionicons name={this.props.awardName} size={60} color={'#606060'}></Ionicons>
                    </TouchableOpacity>
                )}else{
                return(<TouchableOpacity
                    activeOpacity= {.7}
                    onPress= {() => Alert.alert(this.props.awardMessage)}
                    // disabled= {this.props.isDisabled}
                    >
                <Ionicons name={this.props.awardName} size={60} color={this.props.awardColor}></Ionicons>
                </TouchableOpacity>)
            }}.bind(this)()}
        </View>
        )
    } 
}

const styles = (props) => StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
    text: {
        fontSize: 25,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        // fontFamily: "Cochin"
    },

    button: {
        backgroundColor: props.colour,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 3,
        borderRadius: (50),
        width: 100,
        height: 100,
      },})


export default Award;