import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { Image, Animated, ScrollView, ImageBackground} from 'react-native';
import RandomNumber from '../factory/RandomNumber';
import { Dimensions, TouchableHighlight } from 'react-native';
import LandingHeader from '../components/LandingHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';


class DifficultyButton extends Component{
    
   
    render(){
        let buttonStyle = styles(this.props)
        
        return( 
        <View style = {buttonStyle.container}>
                  <Text 
                style = {buttonStyle.text}>
                {this.props.level + '\n'}
            </Text>
            {function(){
                if(this.props.isDisabled){return(
                <AntDesign name="lock1" size={70} color="#000000"/>
                
                )}else{
                return(<TouchableOpacity
                    activeOpacity= {.7}
                    style= {buttonStyle.button}
                    onPress= {this.props.onPress}
                    disabled= {this.props.isDisabled}
                    >
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


export default DifficultyButton