import React, { Component, useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatarDict from './AvatarDict';
import AntDesign from 'react-native-vector-icons/AntDesign';



export default function AvatarMenu ({func, person}) {
  const [user, userLoad] = useState(person)
  const [modalVisible, modalChange] = useState(false)
  useEffect(()=>{
    async function fetchData (){

try {
  
  const value = await AsyncStorage.getItem('user');
  if (value !== null) {
    // We have data!!
    let result = JSON.parse(value)
    userLoad(result)
  }
} catch (error) {
  
  console.log("errorasf")
}
}

fetchData()

},[]);

    
  
  

 const setModalVisible = (visible) => {
    modalChange(visible);
  }
  
  
 const setAvatar = async (avatarNo) =>{
  func(avatarNo)

  const res = await axios.put('http://34.247.47.193/api/v1/users/avatar',{
      "PK": user.PK,
      "avatar": avatarNo

});
console.log(res)
  
  
  const newAvatar = () => {
      AsyncStorage.mergeItem(
        'user',
        JSON.stringify(user),
      );
      
    }
  newAvatar()
  
    
  }
  const renderAvatar = (cost, avatar) =>{
    
    if(user.data.score >= cost){
      return ( <TouchableOpacity style={styles.profileImage} onPress={()=>{setAvatar(avatar)}}>
      {/* <Image source={require("../imgs/bee.jpeg")} style={styles.image} resizeMode="center"></Image> */}
                <Image source={avatarDict[avatar]} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>)
    }else{
      return ( <View style={styles.profileImage}>
              <View style={styles.profileImage}>
                <AntDesign name="lock1" size={70} color="#000000" style={styles.lock} resizeMode="center"/>
                </View>
                </View>)}
  }
    
  return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          onBackdropPress={() => setModalVisible(!modalVisible )}
          visible={modalVisible}
          style={{height: 300, width: 300}}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
          
            <View style={styles.modalView}>
            <ScrollView style = {styles.buttonView}>
              <Text style={styles.modalText} >Select your avatar</Text>
              
              {renderAvatar(0, 1)}
              
              
                {renderAvatar(3, 2)}
             
              
                {renderAvatar(6, 3)}
              
              
                {renderAvatar(9, 4)}
             
                {renderAvatar(12, 5)}
              
              
               {renderAvatar(15, 6)}
             
              
                {renderAvatar(18, 7)}
              
              
               {renderAvatar(21, 8)}
              
              
                {renderAvatar(25, 9)}
              
              
                {renderAvatar(29, 10)}
              
              
                {renderAvatar(33, 11)}
              
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
              </ScrollView>
            </View>
          
          </View>
        </Modal>
        <Ionicons name="ios-add" size={48} onPress={() => setModalVisible(true)} color="#DFD8C8" ></Ionicons>
      </View>
    );
  }


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  buttonView: {
    
    backgroundColor: "white",
    
    position: 'relative',
    flexDirection: 'column',
    flex: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: 100,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonChoice: {
    backgroundColor: "#2196F3",
    
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
},
lock:{
  flex: 1,
  left: 10,
  top:10,
  padding: 10
},
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    margin: 20
},
  buttonClose: {
    backgroundColor: "#FF0000",
    left: 50
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

