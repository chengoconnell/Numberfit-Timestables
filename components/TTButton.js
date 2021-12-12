import React, {useState} from 'react';
import {Component} from 'react';
// import {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { Image, Animated, ScrollView, ImageBackground} from 'react-native';
import RandomNumber from '../factory/RandomNumber';
import { Dimensions, TouchableHighlight } from 'react-native';
import LandingHeader from '../components/LandingHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from  '@react-native-async-storage/async-storage';


class TTButton extends Component{
    
    render(){
        // const [testing, setTesting] = useState();
        let buttonStyle = styles(this.props)       
        return( 
        <View>
            {function(){
                if(this.props.isDisabled){return(
                <AntDesign name="lock1" size={70} color="#000000"/>
                )}else{
                return(<TouchableOpacity
                    activeOpacity= {.7}
                    style= {buttonStyle.circles}
                    onPress= {this.props.onPress}
                    >
                           <Text 
                style = {buttonStyle.text}>
                {this.props.number + 'x'}
            </Text>
                </TouchableOpacity>)
            }}.bind(this)()}
        </View>
        )
    } 
}

const styles = (props) => StyleSheet.create({
    circles: {
        backgroundColor: props.colour,
        borderColor: 'black',
        borderWidth: 4,
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius:70/2,
        marginHorizontal: 40,
        marginVertical: 5,
        justifyContent: 'center'
      },
      text: {
        fontSize: 30,
    },
    })


export default TTButton;