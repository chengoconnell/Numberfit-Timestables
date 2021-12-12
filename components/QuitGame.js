import React from 'react';
import { View, Text, Button, StyleSheet, Animated, ImageBackground } from 'react-native';


const Quit = ({navigation}) => {
    return(
        <Button title="Quit?" onPress={() => navigation.navigate('Landing')} />
    )
}

export default Quit;