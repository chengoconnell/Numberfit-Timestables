import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { Image, Animated, ScrollView, ImageBackground} from 'react-native';
import RandomNumber from '../factory/RandomNumber';
import { Dimensions, TouchableHighlight } from 'react-native';
import LandingHeader from '../components/LandingHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';


class SettingsButton extends Component{
   
    render(){
        // const [testing, setTesting] = useState();
        let buttonStyle = styles(this.props)       
        return( 
        <View>
            {function(){
                if(this.props.isDisabled){return(
                <AntDesign name="lock1" size={35} color="#000000"/>
                )}else{
                return(<TouchableOpacity
                    activeOpacity= {.7}
                    style= {buttonStyle.circles}
                    onPress= {this.props.onPress}
                    >
                          <Text 
                style = {buttonStyle.text}>
                {this.props.option}
            </Text>
                </TouchableOpacity>)
            }}.bind(this)()}
        </View>
        )
    } 
}

const styles = (props) => StyleSheet.create({
    circles: {
        backgroundColor: 'lightblue',
        alignItems: 'center',
        width: 120,
        height: 40,
        borderRadius:35/2,
        marginVertical: 5,
        justifyContent: 'center'
      },
      text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        fontSize: 20,
    },
    })

export default SettingsButton;