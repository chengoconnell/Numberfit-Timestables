import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, Animated, ScrollView, ImageBackground} from 'react-native';
import RandomNumber from '../factory/RandomNumber';
import { Dimensions, TouchableHighlight } from 'react-native';
import LandingHeader from '../components/LandingHeader';
import TTButton from '../components/TTButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BonusDifficultyModal from '../components/BonusDifficultyModal';
import TestOverModal from '../components/TestOverModal';
import AchievementModal from '../components/AchievementModal';
import SettingsModal from '../components/SettingsModal';
import {useIsFocused} from '@react-navigation/native';



const beginner="#cd7f32"
const intermediate="#c0c0c0"
const advanced="#ffd700"

const two = 2 
const three = 3
const four = 4
const five = 5
const six = 6
const seven = 7
const eight = 8
const nine = 9
const ten = 10
const eleven = 11
const twelve = 12

global.gameScorer = 0

export function ChangeChoice(number) {
  var selection = number
  console.warn(selection)
      return selection;
}

const IconNav = ({navigation}) => {
  const [testing, setTesting] = useState();
  const [loggedIn, setLogin] = useState(0);
  const [gameScore, setgameScore] = useState();
  const [tracker, setTracker] = useState();
  const [noOfChallenges, getChallengesNo] = useState();
  global.scoreTracker = tracker;
  global.gameScorer = gameScore;
  global.TT = testing;
  const difficultyColours = 
{
  0:"#cd7f32",
  1:"#c0c0c0",
  2:"#ffd700",
  3:"#00FF00"
}
const difficultyDict = 
{
  0:"beg",
  1:"int",
  2:"adv",
  3:"adv"
}
  const [user, userLoad] = useState({
    GSI1: "class_2ec278cf-1a35-4746-911b-1a360c83dbb5",
    PK: "user_mathsqueen",
    //hardcoded
    data:  {
      "avatar": 7,
      "firstName": "Andrew",
      "hashPassword": "$2a$10$E71aiun83wdz5/FY374JU.e1abBYyA0VwV/C.unxGKZ2CXaZSXB6i",
      "lastName": "O'Connell",
      "pendingAssignments": 16,
      "role": "student",
      "secret": "studentSecret",
      "streak": 0,
      "lastLogin": "2021-04-10"
    },
    eightx:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    elevenx:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    "expiresIn": 168,
    fivex:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    fourx: {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    "message": "You have successfully logged in.",
    ninex:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    onex:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    "overall":  {
      "accuracy": 0,
      "testsTaken": 0,
      "timeTaken": 0,
    },
    "role": "student",
    sevenx:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    sixx:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    "success": true,
    tenx:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    threex:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    twox:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
    twelvex:  {
      "accuracy": 0,
      "state": "beginner",
      "testsTaken": 0,
      "timeTaken": 0,
    },
})
const isFocused = useIsFocused()
useEffect(()=>{
    async function fetchData (){

try {
  const value = await AsyncStorage.getItem('user');
  if (value !== null) {
    // We have data!!
    let result = JSON.parse(value)
    console.log("landing getting user")
    userLoad(result)
    setLogin(1)
  }
} catch (error) {
  console.log("error")
}
}

fetchData()

},[isFocused]);
  const renderLandingHeader = ()=>{
    if (loggedIn){
      return(<LandingHeader person = {user} />)
    }
  }
        return(
            <View style={styles.container}>
                {renderLandingHeader()}
              
                <View style={styles.iconContainer}>
                <SettingsModal />
    </View>
                
                 <View style={styles.randomContainer}>
                  <TTButton 
                  number={two}
                  colour={difficultyColours[user.twox]}
                  isDisabled = {false}
                  onPress={() => {setTesting(2)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.twox]})}}
                   />
       <TTButton number={three}
                  colour={difficultyColours[user.threex]}
                  isDisabled = {false}
                  onPress={() => {setTesting(3)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.threex]})}}
                   />
       <TTButton number={four}
                  colour={difficultyColours[user.fourx]}
                  isDisabled = {false}
                  onPress={() => {setTesting(4)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.fourx]})}}
                   />
       <TTButton number={five}
                  colour={difficultyColours[user.fivex]}
                  isDisabled = {false}
                  onPress={() => {setTesting(5)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.fivex]})}}                   />
       <TTButton number={six}
                  colour={difficultyColours[user.sixx]}
                  isDisabled = {false}
                  onPress={() => {setTesting(6)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.sixx]})}}                   />
       <TTButton number={seven}
                  colour={difficultyColours[user.sevenx]}
                  isDisabled = {false}
                  onPress={() => {setTesting(7)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.sevenx]})}}                   />
       <TTButton number={eight}
                  colour={difficultyColours[user.eightx]}
                  isDisabled = {false}
                  onPress={() => {setTesting(8)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.eightx]})}}                   />
       <TTButton number={nine}
                  colour={difficultyColours[user.ninex]}
                  isDisabled = {false}
                  onPress={() => {setTesting(9)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.ninex]})}}                   />
       <TTButton number={ten}
                  colour={difficultyColours[user.tenx]}
                  isDisabled = {false}
                  onPress={() => {setTesting(10)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.tenx]})}}                   />
       <TTButton number={eleven}
                  colour={difficultyColours[user.elevenx]}
                  isDisabled = {false}
                  onPress={() => {setTesting(11)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.elevenx]})}}                   />
       
                  <TTButton number={twelve}
                  colour={difficultyColours[user.twelvex]}
                  isDisabled = {false}
                  onPress={() => {setTesting(12)
                                  navigation.navigate('Difficulty', {difficulty: difficultyDict[user.twelvex]})}}                   />
    </View>
    <View style = {styles.extrabuttons}>
    <TouchableHighlight 
      onPress={() => navigation.navigate('Countdown3')}
                      
    >
      <Image style={styles.tinyLogo}
          source={require('../imgs/vector-shuffle-glyph-black-icon.jpg')}
          
      />
    </TouchableHighlight>
    <BonusDifficultyModal onPress1={() => navigation.navigate('TargetSumLoad')} 
    onPress2={() => navigation.navigate('TargetSumLoad')}
    onPress3={() => {navigation.navigate('TargetSumLoad')}}
    />
    <TouchableHighlight 
      underlayColor = '#ccc'
      onPress={() => {navigation.navigate('ChallengeDirectory')
                      setTracker(0)
                      global.scoreTracker = 0
                      global.gameScorer = 0
                      console.warn(global.gameScorer)
                      setgameScore(0)}}
    >
      <Image style={styles.tinyLogo}
          source={require('../imgs/multiplayer-icon-mode-isolated-contour-vector-28398206.jpg')}
      />
    </TouchableHighlight>
     </View>
     
          </View> 
        )
    }


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    extrabuttons: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
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
        marginHorizontal: 20,
        marginVertical: 10,
      },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    qmark: {
        flexDirection: 'row-reverse',
        width: 15,
        height: 15,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.10,
        height: Dimensions.get('window').width * 0.10,
        borderColor: 'black',
        borderWidth: 4,
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 10,
      },
      text: {
        backgroundColor:'white',
        borderColor: 'black',
        borderWidth: 4,
        alignItems: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        width: 70,
        height: 70,
        borderRadius:70/2,
        marginHorizontal: 40,
        marginVertical: 5,
        fontSize: 30,
      },
      bonus: {
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: 40,
        marginBottom: 15,
        fontSize: 20,
      },
  });
      
export default IconNav;