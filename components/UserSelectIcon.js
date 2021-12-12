import React, { useState } from "react";
import {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { Image, Animated, ScrollView, ImageBackground} from 'react-native';
import RandomNumber from '../factory/RandomNumber';
import { Dimensions, TouchableHighlight } from 'react-native';
import LandingHeader from '../components/LandingHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Ionicons, MaterialIcons } from "@expo/vector-icons";


class UserSelectIcon extends Component{
    
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
                    // style= {buttonStyle.button}
                    onPress= {this.props.onPress}
                    disabled= {this.props.isDisabled}
                    >
                        {/* <Image style={buttonStyle.tinyLogo}
                               source={this.props.pic}></Image> */}
                                               <Ionicons name={this.props.iconName} size={80} color={this.props.iconColor}></Ionicons>

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
        marginTop: 100,
        marginHorizontal: 50
    },
    tinyLogo: {
        borderWidth: 3,
        borderRadius: (50),
        width: 100,
        height: 100,
        marginHorizontal: 10,
        borderColor: 'black'
      },
    text: {
        fontSize: 20,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        textAlign: 'center'
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
        marginHorizontal: 10
      },})


export default UserSelectIcon;