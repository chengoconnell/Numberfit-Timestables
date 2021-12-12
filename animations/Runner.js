import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get("window").height;


export default class Runner extends React.Component {
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: screenWidth,
            height: 370,
            backgroundColor: '#E8EAED',
          }}
          source={require('../../assets/53949-runner.json')}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        {/* <View style={styles.buttonContainer}> */}
          {/* <Button title="Restart Animation" onPress={this.resetAnimation} /> */}
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#E8EAED',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});