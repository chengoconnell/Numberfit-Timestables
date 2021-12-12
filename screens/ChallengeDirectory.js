import React, { Component, useReducer } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList, Button
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatarDict from "../components/AvatarDict";

export default class ChallengeDirectory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      completedChallenges: [
        
      ],
      user: {},
      pendingChallenges: [
        
      ],
      classDict: {}
    };
  }
  getClassMates = async()=> {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        let result = JSON.parse(value)
      
    let classMates = await axios.get('http://34.247.47.193/api/v1/users/'+ result.GSI1)
    let classStudents = classMates.data.Items
    console.log("here")
    let classObj = {}
    for(let i =0; i< classStudents.length;i++){
      classObj[classStudents[i].PK] = classStudents[i]
    }
    console.log(classObj)
    this.setState((prevState) => {
      return { ...prevState,
        classDict: classObj,
        user: result
              };
            })
          
  }
}catch{
  console.log('error getting class')
}}
  getChallenges = async()=>{
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        let result = JSON.parse(value)
        let pendingAddress = 'http://34.247.47.193/api/v1/challenges/pending/' + result.PK
        let res = await axios.get(pendingAddress)
        let res2 = await axios.get('http://34.247.47.193/api/v1/challenges/completed/' + result.PK)
    this.setState((prevState) => {
      return { ...prevState,
        pendingChallenges: res.data.allChallenges,
        completedChallenges: res2.data.allChallenges
              };
            })
  }
        
    } catch (error) {
      console.log("error")
    }
  }
    
  componentDidMount() {
    this.getChallenges()
    this.getClassMates()
  }
  

  renderItem1 = ({item}) => {
    const getInfo =()=>{
    if(this.state.user.PK == item.PK){
      return (this.state.classDict[item.GSI1])
    } else {
      return (this.state.classDict[item.PK])
    }}
        let info = getInfo()
    
    console.log(item)
    let winner = ()=>{
      if(item.data.winner == this.state.user.PK){
        return ("You Won!")
      } else{
        return ("You lost!")
      }
    }
    if(this.state.completedChallenges!=[]){
      
    return (
        <View>
      <TouchableOpacity onPress = {()=>{Alert.alert(winner())}}>
        <View style={styles.row}>
          <Image source={avatarDict[info.data.avatar]} style={styles.pic} />
          
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{info.data.firstName + " " + info.data.lastName}</Text>
              
              
            </View>
            <View style={styles.msgContainer}>
            </View>
          </View>
        </View>
      </TouchableOpacity>
              </View>
              
    );
  }}

  renderItem2 = ({item}) => {
    let info = this.state.classDict[item.PK]
    let challID = item.SK
    if(this.state.pendingChallenges!=[] && info.PK != this.state.user.PK){
    
    
    return (
        <View>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Game',{challenge: 2, challengeID: challID})}>
        <View style={styles.row}>
          <Image source={avatarDict[info.data.avatar]} style={styles.pic} />

          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{info.data.firstName + " " + info.data.lastName}</Text>

            </View>
            <View style={styles.msgContainer}>
            </View>
          </View>
        </View>
      </TouchableOpacity>
              </View>
              
    );
  }
  }
  render() {
    
    return(
      <View style={{ flex: 1 }} >
          <Button title="BEGIN NEW CHALLENGE"  onPress={() => this.props.navigation.navigate('Challenge')} />
                 <Text style={styles.challengeText}>Completed Challenges:</Text>
        <FlatList 
          extraData={this.state}
          data={this.state.completedChallenges}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem1}/>
          <Text style={styles.challengeText}>Challenge Requests:</Text>
              <FlatList 
          extraData={this.state}
          data={this.state.pendingChallenges}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem2}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'center'
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 45,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
    marginVertical:30
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
  challengeText: {
    fontWeight: '400',
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10
  },
});