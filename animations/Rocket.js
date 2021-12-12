import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get("window").height;


export default class Rocket extends React.Component {
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    this.animation.play(0, 5000);
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
            width: 300,
            height: 125,
            backgroundColor: 'lightgray',
          }}
          source={require('../../assets/50486-rocket.json')}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
    marginBottom: 10
  },
});