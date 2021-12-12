import React, { useState, useEffect, useReducer } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Rocket from '../animations/Rocket';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChallengeOverModal = ({score, total, gameEnd, timestable, navigation, difficulty, challenge, challengeID}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [statisticsSent, sendStatistics] = useState(0);
  const [user, userLoad] = useState();
  
  global.engagement = sendStatistics

  useEffect(()=>{async function sendResults(){
    if(statisticsSent == 0){
      try{
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          // We have data!!
          let result = JSON.parse(value)
          console.log(result.PK, challenge, challengeID, score)
          userLoad(result)
      if(challenge === 1){
      let res = await axios.put('http://34.247.47.193/api/v1/challenges/challengerUpdate',
      {"PK": result.PK,
      "SK": challengeID,
      "score": score

    }
    
      )
      console.log(res)} else if (challenge == 2){
        console.log("enters else if")
        let res = await axios.put('http://34.247.47.193/api/v1/challenges/challengeReceiverUpdate',
      {"PK": result.PK,
      "SK": challengeID,
      "score": score,

    }
      )
      console.log(res)}
      }
      
    sendStatistics(1)
    console.log('stat sent')}
    
  catch {
    console.log('Statistics not sent')
  }
  }
  }sendResults()},[])

  return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titleText}>Challenge Over!</Text>
            <Rocket />
            <Text style={styles.modalText}>Well done you scored: {global.gameScorer}</Text>
            {/* <Text style={styles.modalText}>You had an accuracy of: {accuracy}%</Text> */}
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable> */}
    
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    // marginEnd: -50
  },
  modalView: {
    margin: 10,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    padding: 45,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    marginVertical:10
  },
  buttonOpen: {
    backgroundColor: "blue",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20
  },
  titleText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 40,
  },
});

export default ChallengeOverModal;