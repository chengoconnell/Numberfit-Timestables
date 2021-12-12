
import {Text, View, TouchableOpacity, StyleSheet, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

console.disableYellowBox = true;

const ChallengeButton = () => {    
    const [tracker, setTracker] = useState();
    global.scoreTracker = tracker;
        return( 
<Button title="BEGIN NEW CHALLENGE"  onPress={() => {() => this.props.onPress
                                                    setTracker(0)}} 
                                                    />
                                                            )
                                                        } 


// const styles = StyleSheet.create({
//     container: {
//         position: 'relative',
//         alignItems: 'center',
//         justifyContent: 'space-evenly',
//         flexDirection: 'column',
//     },
//     text: {
//         fontSize: 25,
//         fontFamily: "HelveticaNeue",
//         color: "#52575D",
//         // fontFamily: "Cochin"
//     },

//     button: {
//         backgroundColor: props.colour,
//         justifyContent: 'center',
//         alignContent: 'center',
//         borderWidth: 3,
//         borderRadius: (50),
//         width: 100,
//         height: 100,
//       },})


export default ChallengeButton;