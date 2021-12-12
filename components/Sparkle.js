import React from 'react';
import Sparkle from 'react-sparkle';
import { View, Text, Button, StyleSheet, Animated, ImageBackground, Image, TouchableHighlight} from 'react-native';

 
const SparklyThing = () => (
    <Text>I am so sparkly. Look at me go!
      <Sparkle color="teal" overflowPx={8} />
      </Text>
  )
  
export default SparklyThing;