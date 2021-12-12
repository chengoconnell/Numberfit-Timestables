import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Animated, View, StyleSheet} from "react-native";
import React from 'react';
import PropTypes from 'prop-types';


const TargetSumTimer = ({isPlaying, length}) => {
    return (
      <View style={styles.centeredView}>
  <CountdownCircleTimer
    size={70}
    isPlaying={isPlaying}
    duration={length}
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
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 30,
        justifyContent: 'center',
        marginTop: 150
      }
    })

export default TargetSumTimer;