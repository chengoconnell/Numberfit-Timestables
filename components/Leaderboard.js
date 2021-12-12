//...

import Leaderboard from 'react-native-leaderboard';
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

//...

const Leader = () => {
this.state = {
    data: [
        {userName: 'Joe', highScore: 52},
        {userName: 'Jenny', highScore: 120},
        //...
    ] //can also be an object of objects!: data: {a:{}, b:{}}
}
  return (
      <Leaderboard 
        data={this.state.data} 
        sortBy='highScore' 
        labelBy='userName'/>)
}


export default Leader;