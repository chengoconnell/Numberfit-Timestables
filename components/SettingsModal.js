import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight, Pressable, Modal, Button, Alert} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import SettingsButton from '../components/SettingsButton';
// import HelpModal from '../components/HelpModal';
import TestOverModal from '../components/TestOverModal';


const SettingsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
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
        
            <View style={styles.central}>
            <Text style={styles.modalText}>Login every day to build a streak & master your times tables to level up!</Text>
            <Text style={styles.modalText}>Select any of the timestables to begin your journey.</Text>
            <Text style={styles.modalText}>Practice your skills in shuffle mode</Text>
            <Text style={styles.modalText}>Compete with friends to gain awards via the  challenge button</Text>
            <Text style={styles.modalText}>The bonus button will start a fun addition game where you can become an all-round maths champion!</Text>

            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableHighlight onPress={() => setModalVisible(true)}>
      <Ionicons name="help-circle" size={40} color="black"></Ionicons>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
  },
  central: {
    flex:1,
    justifyContent: 'space-evenly'
  },
  titleText: {
    textAlign: "center",
    fontSize: 10,
  },
  settingButton: {
    marginTop: 100
  },
  modalView: {
    margin: 50,
    marginTop: 50,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    padding: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center",
    fontSize:13,
    color: 'red',
    fontFamily: "HelveticaNeue",

  }
});

export default SettingsModal;