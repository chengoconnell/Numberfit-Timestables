import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState}  from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default class MathButton extends React.Component{
    render() {
       const answer = ' '
       const label = ' '
    return(
        <TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled} >
            <View style={styles.button}>
            <Ionicons name="send" size={48} color="black" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
            </View>
        </TouchableOpacity>
    )
}
}

const styles = StyleSheet.create({
button: {
   padding: 10,
   backgroundColor: "green",
   flexDirection: 'row',
   width: 70,
   height: 70,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 50,
    },
})