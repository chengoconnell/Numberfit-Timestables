  
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Image, View } from 'react-native';

const GameHeader = () => (
    
 <Appbar style={styles.top}>
    <Appbar.Action size={37} icon={require('../imgs/noun_User_3764936.png')} onPress={() => alert('Start')} />
    <View style={styles.spread}>
    <View style={styles.square}></View>
    <View style={styles.square}></View>
    <View style={styles.square}></View>
    </View>
    <Appbar.Action size={37} icon={require('../imgs/noun_Location_3764952.png')} onPress={() => alert('Status')} />
    <View style={styles.spread}>
    <View style={styles.square}></View>
    <View style={styles.square}></View>
    <View style={styles.square}></View>
    </View>
    <Appbar.Action size={37} icon={require('../imgs/noun_Flag_758383.png')} onPress={() => alert('Flag')} />
  </Appbar>
 );

const styles = StyleSheet.create({
  top: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: '#87CEEB'
  },
  square: {
      width: 12,
      height: 12,
      backgroundColor: 'white',
      borderRadius: 5,
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 23
  },
  spread: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
  }
});

export default GameHeader;