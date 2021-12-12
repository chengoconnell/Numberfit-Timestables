import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, TouchableHighlight } from 'react-native';

global.targetSum = 5


const BonusDifficultyModal = ({onPress1,onPress2,onPress3}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.uncenteredView}>
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
          <View style={styles.textContainer}><Text style={styles.text}>Choose Difficulty</Text></View>

          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible), onPress1(),global.targetSum=4}}
            >
              <Text style={styles.textStyle}>Easy</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible), onPress2(),global.targetSum=5}}
            >
              <Text style={styles.textStyle}>Medium</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible), onPress3(),global.targetSum=6}}
            >
              <Text style={styles.textStyle}>Hard</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpenClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <View style={styles.other}></View> */}
      <Pressable
        style={[styles.tinyLogo, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>BONUS</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
    marginTop: 3,
    justifyContent: 'center',
    marginHorizontal: '4%',
  },
  uncenteredView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
    marginTop: 3,
    marginHorizontal: 55,
    justifyContent: 'flex-start'
  },
  other: {
    width:50,
    height:20,
    backgroundColor: 'blue'
  },
  button: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40
    
},
textContainer:
{
justifyContent: 'center',
flexDirection: 'row',
},
  modalView: {
      borderColor: 'gray',
      borderWidth: 5,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 60,
    marginVertical: 120,
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
  tinyLogo: {
    width: 25,
    height: 25,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
    backgroundColor:'lightblue',
    borderColor: 'black',
    borderWidth: 4,
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center'
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonOpenClose: {
    backgroundColor: "black",
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
    marginBottom: 15,
    flexDirection: 'row',
    textAlign: "center",
  }
});

export default BonusDifficultyModal;