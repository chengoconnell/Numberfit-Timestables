import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Animated, Text, View, StyleSheet, Button } from "react-native";
import React from 'react';

const Timer = () => {
    return (
      <View style={styles.centeredView}>
  <CountdownCircleTimer
    size={80}
    isPlaying
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
  </View>
    );
    };

    const styles = StyleSheet.create({
      centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
      }
    })

export default Timer;