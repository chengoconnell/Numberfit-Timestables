import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-paper';
import SparklyThing from '../components/Sparkle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import avatarDict from '../components/AvatarDict'
const user = require('./LoginScreen').user
import AsyncStorage from '@react-native-async-storage/async-storage';

const bee = "../imgs/bee.jpeg"
const butterfly = "../imgs/butterfly.jpeg"
const butterfly2 = "../imgs/butterfly2.jpeg"
const centipede = "../imgs/centipede.jpeg"
const grasshopper = "../imgs/grasshopper.jpeg"
const ladybird = "../imgs/ladybird.jpeg"
const worm = "../imgs/worm.jpeg"
const worm2 = "../imgs/worm2.jpeg"
const scorpion = "../imgs/scorpion.jpeg"
const snail = "../imgs/snail.jpeg"
const spider = "../imgs/spider.jpeg"


export default class Challenger extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      data: [
      ],
      user: {}
      

    };
  }
  getClassMates = async()=> {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        let result = JSON.parse(value)
        
    let classMates = await axios.get('http://34.247.47.193/api/v1/users/'+ result.GSI1)
    console.log(classMates)
    let classStudents = classMates.data.Items
    console.log("here")
    console.log(classStudents)
    this.setState((prevState) => {
      return { ...prevState,
        data: classStudents,
        user: result
              };
            })
          
  }
}catch{
  console.log('error getting class')
}}
  makeChallenge = async(player1, player2) =>{
    
    let res = await axios.post('http://34.247.47.193/api/v1/challenges', {"PK": player1, 
    "GSI1": player2
})

let chalID = res.data.challengeID
this.setModalVisible(false)
this.props.navigation.navigate('Game',{challenge: 1, challengeID: chalID})

  }
  clickEventListener = (item) => {
    this.setState({userSelected: item}, () =>{
      this.setModalVisible(true);
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  componentDidMount() {
    this.getClassMates()
  }
  
  render() {
    return (
      <View style={styles.container}>          
        <FlatList 
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            if(this.state.user.PK != item.PK){
          return (
            <TouchableOpacity style={styles.card}>
              <Image style={styles.image} source={avatarDict[item.data.avatar]}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.data.firstName + " " + item.data.lastName}</Text>
                <TouchableOpacity style={styles.followButton} onPress={() => {this.makeChallenge(this.state.user.PK, item.PK)}}>
                  <Text style={styles.followButtonText}>Challenge</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}}}/>

        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>

          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <ScrollView contentContainerStyle={styles.modalInfo}>
                    <Image style={styles.image} source={this.state.userSelected.image}/>
                    <Text style={styles.name}>{this.state.userSelected.name}</Text>
                    <Text style={styles.position}>{this.state.userSelected.position}</Text>
                    <Text style={styles.about}>{this.state.userSelected.about}</Text>
                </ScrollView>
              </View>
              <View style={styles.popupButtons}>
              <TouchableOpacity onPress = {() => this.makeChallenge('user', this.state.userSelected.name) } style={styles.btnClose}>
                  <Text>Challenge</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.setModalVisible(false) }} style={styles.btnClose}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#eeeeee"
  },
  header:{
    backgroundColor: "#00CED1",
    height:200
  },
  btntext:{
    fontSize: 30,
    marginTop: 20,
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    flex:1,
  },
  detailContent:{
    top:80,
    height:500,
    width:Dimensions.get('screen').width - 90,
    marginHorizontal:30,
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  userList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
  },
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row'
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  about:{
    marginHorizontal:10
  },

  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
 /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: 'space-between',
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#20b2aa',
    padding:20
    
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  }
});