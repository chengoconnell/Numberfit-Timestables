import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Animated, View, StyleSheet} from "react-native";
import React from 'react';
import PropTypes from 'prop-types';


const TestTimer = ({isPlaying}) => {
    return (
  <CountdownCircleTimer
    size={70}
    isPlaying={isPlaying}
    duration={120}
    colors={[
      ['#004777', 0.4],
      ['#F7B801', 0.4],
      ['#A30000', 0.2],
    ]}
  >
    {({ remainingTime, animatedColor }) => (
      <Animated.Text style={{ color: animatedColor }}>
        {remainingTime}
      </Animated.Text>
    )}
  </CountdownCircleTimer>
    );
    };

    const styles = StyleSheet.create({
      centeredView: {
        marginHorizontal: 30
        // justifyContent: 'space-evenly',
        // alignItems: 'space-evenly',
        // marginEnd: -50
      }
    })

export default TestTimer;