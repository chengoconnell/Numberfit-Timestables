import React, { useEffect, useState }  from 'react';
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import Progress from '../components/ProgressBar';
import Table from '../components/Datatable';
import LineGraph from '../components/LineGraph';
import ProgressRing from '../components/ProgressRing';
// import Pie from '../src/components/PieChart';
import Rocket from '../animations/Rocket';
import PropTypes from 'prop-types';
import  {Component} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.disableYellowBox = true

const StatsScreen = ({navigation, route, child}) => {
    const [studentsData, getStudentData] = useState();
    const [studentsXP, getStudentsXP] = useState();
    const [user, userLoad] = useState();
    
    useEffect(()=>{
        async function getStats(){
        if(route!=undefined && route.params){
            const {userID} = route.params;
            try{
                let studentData = await axios.get('http://34.247.47.193/api/v1/testStatistics/inDepth/' + userID);
                let student = await axios.get('http://34.247.47.193/api/v1/users/individual/' + userID);
                
                getStudentData(studentData.data.testStats.Item.data);
                userLoad(student.data.Item);
                
                console.log('student id passed')
            } catch{
                console.log('Error Loading Students Stats')
            }
        }else if(child!=undefined){
            const childID = child;
            try{
                let studentData = await axios.get('http://34.247.47.193/api/v1/testStatistics/inDepth/' + childID);
                let student = await axios.get('http://34.247.47.193/api/v1/users/individual/' + childID);
                
                getStudentData(studentData.data.testStats.Item.data);
                userLoad(student.data.Item);
                
                console.log('student id passed')
            } catch{
                console.log('Error Loading Students Stats')
            }
        }
            else{
            try {
                const value = await AsyncStorage.getItem('user');
                if (value) {
                  // We have data!!
                  let result = JSON.parse(value)
                  
                  let statAddress  = 'http://34.247.47.193/api/v1/testStatistics/inDepth/' + result.PK;
                  
                  let studentAddress = 'http://34.247.47.193/api/v1/users/individual/' + result.PK;

                  let studentXP = 'http://34.247.47.193/api/v1/testStatistics/monthStatistics/' + result.PK
                  
                  let studentStats = await axios.get(statAddress);
                  let student = await axios.get(studentAddress);
                  let XP = await axios.get(studentXP);
                //   console.log(studentStats

                console.log(studentStats.data.item);

                  
                //   console.log(student)
                // console.log(student.data.Item)
                // console.log(studentStats.data.testStats.Item.data)
                  userLoad(student.data.Item)
                  getStudentData(studentStats.data.testStats.Item.data);
                  getStudentsXP(XP.data.testStats.Item.data);

                //   console.log(studentStats.data.testStats.Item.data)

                    
                
                }
              } catch (error) {
                console.log("this error")
              }
              }
            }
        getStats()},[])
    const progressionFraction = (difficultyLevel)=>{
        let result = difficultyLevel/3;
        return(result.toFixed(2))
    }
    const displayStats = () => {
        
        if(studentsData != undefined && user != undefined){
        return (
      <View style={styles.container}>
      <ScrollView>
      {/* <Rocket /> */}
      <Text style={styles.titularText}>{user.data.firstName + ' '+user.data.lastName}</Text>
      {global.userType === 'parent' && (
             <Button
    title={user.data.firstName+ "'s" + " Assignments"}
    onPress = { () => navigation.navigate("Child's Tasks", {parentView: 1}) } /> )}
     {global.userType === 'student' && (
             <Button
    title="Leaderboards"
    onPress = { () => navigation.navigate('Load') } /> )}
    <Text style={styles.statisticTitle}>2x timestable</Text>
    <Progress completion={progressionFraction(user['twox'])}/>
    {/* <LineGraph /> */}
    {/* <ProgressRing begMastery={0.2} intMastery={0.2} advMastery={0.8}/> */}
    <Table userDetails = {studentsData.twox} level = {user['twox']}/>
    <Text style={styles.statisticTitle}>3x timestable</Text>
    <Progress completion={progressionFraction(user['threex'])}/>
    {/* <LineGraph /> */}
    <Table userDetails = {studentsData.threex} level = {user['threex']}/>
    <Text style={styles.statisticTitle}>4x timestable</Text>
    <Progress completion={progressionFraction(user['fourx'])}/>
    {/* <LineGraph /> */}
    <Table userDetails = {studentsData.fourx} level = {user['fourx']}/>
    <Text style={styles.statisticTitle}>5x timestable</Text>
    <Progress completion={progressionFraction(user['fivex'])}/>
    {/* <LineGraph /> */}
    <Table userDetails = {studentsData.fivex} level = {user['fivex']}/>
    <Text style={styles.statisticTitle}>6x timestable</Text>
    <Progress completion={progressionFraction(user['sixx'])}/>
    <Table userDetails = {studentsData.sixx} level = {user['sixx']}/>
    {/* <Pie /> */}
    <Text style={styles.statisticTitle}>7x timestable</Text>
    <Progress completion={progressionFraction(user['sevenx'])}/>
    <Table userDetails = {studentsData.sevenx} level = {user['sevenx']}/>
    <Text style={styles.statisticTitle}>8x timestable</Text>
    <Progress completion={progressionFraction(user['eightx'])}/>
    <Table userDetails = {studentsData.eightx} level = {user['eightx']}/>
    <Text style={styles.statisticTitle}>9x timestable</Text>
    <Progress completion={progressionFraction(user['ninex'])}/>
    <Table userDetails = {studentsData.ninex} level = {user['ninex']}/>
    <Text style={styles.statisticTitle}>10x timestable</Text>
    <Progress completion={progressionFraction(user['tenx'])}/>
    <Table userDetails = {studentsData.tenx} level = {user['tenx']}/>
    <Text style={styles.statisticTitle}>11x timestable</Text>
    <Progress completion={progressionFraction(user['elevenx'])}/>
    <Table userDetails = {studentsData.elevenx} level = {user['elevenx']}/>
    <Text style={styles.statisticTitle}>12x timestable</Text>
    <Progress completion={progressionFraction(user['twelvex'])}/>
    <Table userDetails = {studentsData.twelvex} level = {user['twelvex']}/>

    </ScrollView>
      </View> 
      );
}else{
    return(<View><Text style={styles.text}>To begin your times table journey and view your progress take a test</Text>
    <Text style={styles.text2}>Let the games begin!</Text>
    </View>
        )
};
};       return(
    displayStats()
)
}


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        alignContent: 'center',
        fontSize: 40,
        textAlign: 'center',
        margin: 80
    },
    text2: {
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        alignContent: 'center',
        fontSize: 30,
        textAlign: 'center',
        margin: 10

    },
    statistic: {
        alignItems: 'center',
        textAlignVertical: 'center',
        height: 20,
        width: 90,
        marginHorizontal: 40,
        marginVertical: 20,
      },
    tasksWrapper: {
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    statisticTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 5,
        marginHorizontal: 15,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
    },
    titularText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginVertical: 5,
        marginHorizontal: 15,
        fontFamily: "HelveticaNeue",
        color: "navy",
        textAlign: 'center'
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginVertical: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'yellow'
    },
    addText: {}
});

export default StatsScreen;