import React, { Component, useState, useEffect, useReducer } from "react";
import { Alert, StyleSheet, Text,Button, View, SafeAreaView, Image, ScrollView, TouchableHighlight, Pressable, TouchableOpacity } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell }  from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { noConflict } from "lodash";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

// call students by class
// make a array of basic student objects
// make link to my stats page

const MyStudents =({navigation}) => { 
    const [formData, changeForm] = useState([]);
    const [formIdsbyName, getFormIds] = useState({noClass:"noClass"});
    const [studentNames, updateStudentsNames] = useState([]);
    const [studentIdsByName, updateStudentsIds] = useState([]);
    const [pendingAssignments, updatePendingAssignments] = useState();
    const [studentScores, updateStudentsScores] = useState()
    const [forms, getForms] = useState([])
    const [classSize, getClassSize] = useState();
    const [classPA, getClassPA] = useState()
    const [classKey, getClassKey] = useState()
    const [classSecret, getClassSecret] = useState()
    const tableHead = ['Student', 'Pending Assignments', 'Score'];
    const widthArr = [133,133,133]
    useEffect(()=>{async function getClasses(){
        try{const value = await AsyncStorage.getItem('user');
            if (value !== null) {
            // We have data!!
            let teacherUser = JSON.parse(value)
            let result = await axios.get('http://34.247.47.193/api/v1/classes/getClasses/' + teacherUser.PK)
            
            let classArray = result.data.Items;
            let info = [];
            let sets = [];
            let classIdbyName = {};
            let noOfClasses = classArray.length;
            console.log(classArray)
            console.log(classArray[0].data.name)
            classArray[0].data.name
            classArray[0].PK
            for (var i = 0; i < noOfClasses; i++) {
                info.push(classArray[i].PK)
                sets.push(classArray[i].data.name)
                console.log(info)
                console.log(sets)
                classIdbyName[classArray[i].data.name] = classArray[i].PK;
                
            }
            
            getForms(sets)
            // getStudents(info[0])
            getFormIds(classIdbyName)
            
            if(classIdbyName[sets[0]]){
            changeClass(classIdbyName[sets[0]])
            }
        }}
        catch{
            console.log('no classes found for this teacher')
        }
        }
        getClasses()
        
    },[]
    )
        
    // const changeData = async ()=>{
    //     var data = [];

    // for (let i = 0; i < studentNames.length; i += 1) {
    //   var dataRow = [];
      
    //   dataRow.push(studentNames[i])
    //   dataRow.push(pendingAssignments[i])
    //   dataRow.push(studentScores[i]);
      
    //   data.push(dataRow);

    // }
    
    //  changeForm(data)
    //  changeForm(data)
    // }

    const changeClass = async (classID)=>{
        try{
        let address = 'http://34.247.47.193/api/v1/users/' + classID;
        
        // let address = 'http://34.247.47.193/api/v1/users/class_a04478e9-b9de-4bdd-8927-0691aa397720'
        let students = await axios.get(address);
        let result = students.data.Items;
        let sNames = [];
        let sScores = [];
        let sPending = [];
        let sIdsByNames = {};
        
        for (var i =0; i < result.length; i++){
            let fullName = result[i].data.firstName + ' ' + result[i].data.lastName
            sNames.push(fullName);
            sScores.push(result[i].data.score);
            sPending.push(result[i].data.pendingAssignments);
            sIdsByNames[fullName] = result[i].PK
        }
        await updateStudentsIds(sIdsByNames)
        await updateStudentsNames(sNames)
        await updatePendingAssignments(sScores)
        await updateStudentsScores(sPending)
        // console.log(updateStudentsIds(sIdsByNames),
        // updateStudentsNames(sNames),
        // updatePendingAssignments(sScores),
        // updateStudentsScores(sPending))
        // getClassSize(sNames.length)
        
        var sum = sPending.reduce((a, b)=>{
            return a + b;
        }, 0);
        
        
        getClassPA(sum)
        getClassSize(sNames.length)
        getClassKey(classID)
        var data = [];

    for (let i = 0; i < sNames.length; i += 1) {
      var dataRow = [];
      
      dataRow.push(sNames[i])
      dataRow.push(sPending[i])
      dataRow.push(sScores[i]);
      
      data.push(dataRow);

    }
    console.log(data)
     
     changeForm(data)
        
    
    }catch{
        console.log("Couldn't load students")
    }}
    const showStudentStats = (studentName)=>{
        console.log(studentIdsByName[studentName])
        if(studentName){
            let studentID = studentIdsByName[studentName]
            navigation.navigate("Student Data",{
                userID: studentID
            })
        }
    }
    const classButton = (set) => {
        let classID = formIdsbyName[set]
        return (
            <View style = {styles.classOptionsContainer}>
                <TouchableOpacity
                    style={styles.classOptionButton}
                    
                    onPress={() => changeClass(classID)}
                    >
                        <Text style = {styles.buttonText}>{set}</Text>

                    </TouchableOpacity>
                    </View>
        )}

    
    
        return(
            <View style = {styles.container}>
                
                    {forms.map(classButton)}
                
                <View style = {styles.stats}>
                    <Text style={[styles.statsText]}>Class Stats</Text>
                    <View>
                                                <Text>                                                                         </Text>

                        {/* <Text>Class Key: {classKey}</Text> */}
                        <Text style={styles.statisticText}>Class Size: {classSize}</Text>
                        <Text style={styles.statisticText}>Pending Assignments: {classPA}</Text>
                        
                    </View>
                </View>
                <View style={styles.tableView}>
                    <ScrollView horizontal={true}>
                        <View style = {styles.table}>
                            <Table borderStyle={{borderColor: '#C1C0B9'}}>
                            <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text}/>
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderColor: '#C1C0B9'}}>
                                {
                                formData.map((datarow, index) => (
                                    <Row
                                    key={index}
                                    onPress={() => console.log('being pressed')}
                                    data={datarow}
                                    widthArr={widthArr}
                                    style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                                    textStyle={styles.text}
                                    onPress={()=>{showStudentStats(datarow[0])}}
                                    />
                                ))
                                }
                            </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }



const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        height: 820
        
    },
    statsText:{
        fontSize: 30
    },
    statisticText:{
        fontSize: 25,
        fontFamily: "HelveticaNeue",

    },

    classOptionsContainer: {

        alignItems: 'center',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
       
        
        
        
    },
    classOptionButton: {
        
        borderColor: '#000000',
        borderWidth: 1,
        borderStyle: 'solid',
        height: 50,
        flex: 1
        
    },

    buttonText: {
        textAlign: 'center',
        fontSize: 20
    },
    HeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: '#FFFFFF'
      },
    table:{
        height: 400
    },
    tableView:{
        height: 550,
        flex: 1,
        bottom: 100
    },
    stats:{
        flex:1,
        justifyContent: 'center',
        left: 10,
        bottom: 45
    },
   
    
    TableText: { 
        margin: 10,
        fontSize: 15,
        fontFamily: "HelveticaNeue"
      },
    tableContainer: {
        flex: 3, 
        padding: 16, 
        paddingTop: 30, 
        backgroundColor: '#ffffff',
        height: 500

        
      },
      head: { 
        height: 50, 
        backgroundColor: '#6F7BD9' 
      },
      text: { 
        textAlign: 'center', 
        fontWeight: '200',
        fontSize: 15,
        fontFamily: "HelveticaNeue"
      },
      dataWrapper: { 
        marginTop: -1 
      },
      row: { 
        height: 40, 
        backgroundColor: '#F7F8FA' 
      }
      }
    
    )
export default MyStudents;