import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight, Pressable, Modal, Button, Alert} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import SettingsButton from '../components/SettingsButton';


const HelpModal = () => {
  const [modalVisible, setModalVisible] = useState(true);
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
            <Text style={styles.modalText}>Select any of the timestable to begin your journey.</Text>
            <Text style={styles.modalText}>To get some practice click on the red shuffle button at the bottom before taking any tests</Text>
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
  settingButton: {
    marginTop: 100
  },
  modalView: {
    margin: 40,
    marginTop: 80,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    padding: 80,
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
    marginBottom: 5,
    textAlign: "center",
    fontSize:13
  }
});

export default HelpModal;