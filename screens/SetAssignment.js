import React, { useState, useEffect }  from 'react';
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from 'react-native-check-box';
import Cal from '../components/Calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SetHomework =({navigation})=>{ 
    const [forms, getForms] = useState([]);
    const [chosenClass, chooseClass] = useState();
    const [formIdsbyName, getFormIds] = useState();
    const [date, chooseDate] = useState();
    const [difficultyLevel, chooseDifficultyLevel] = useState();
    const [timestable, chooseTimestable] = useState();
    useEffect(()=>{async function getClasses(){
        
        try{
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
              // We have data!!
            let teacherUser = JSON.parse(value)
            console.log('before axios')
            console.log(teacherUser.PK)
            let classAddress = 'http://34.247.47.193/api/v1/classes/getClasses/' + teacherUser.PK
            let result = await axios.get(classAddress)
            let classArray = result.data.Items;
            let info = [];
            let sets = [];
            let classIdbyName = {};
            let noOfClasses = classArray.length;
    
            for (var i = 0; i < noOfClasses; i++) {
                info.push(classArray[i].PK)
                sets.push(classArray[i].data.name)
                classIdbyName[classArray[i].data.name] = classArray[i].PK;
            }
            getForms(sets)
            // getStudents(info[0])
            getFormIds(classIdbyName)
        }
        } catch{
            console.log('no classes found for this teacher')
        }
        }
        getClasses()
    },[]
    )
    const classOption = (className) => {
            return(
                
                    <Text>{className}</Text>)
                    
        }
    const makeAssignment = async(formChoice,timestable, difficulty, due, repetitions) => {
        console.log(formChoice)
        console.log(timestable)
        console.log(difficulty)
        console.log(due)
        if(formChoice!='Select class...' && timestable !='Select timestable...' && difficulty!= 'Select difficulty...' && due!= undefined){
        let res = await axios.post('http://34.247.47.193/api/v1/assignments/postClass/',{
            "GSI1": formChoice,
            "data": {
                "timestable": timestable,
                "difficulty": difficulty,
                "due": due,
                "repetitions": 1
            }
        })
        Alert.alert('Assignment set!')
    }else{
        Alert.alert("Please Fill Out All Options")
    }
}
        return (
            <View style={styles.container}>
                <View style={styles.formLayout}>
                <ModalDropdown dropdownTextStyle={{fontWeight:'bold', textAlign: 'center', fontSize: 15}}
                    textStyle={{fontWeight:'bold', textAlign: 'right',  fontSize: 20}} 
                    animated={true} 
                    showsVerticalScrollIndicator={true} 
                    isFullWidth = {true} 
                    style = {{width: 340}}
                    defaultValue = {'Select timestable...'} 
                    options={['2','3','4','5','6','7','8','9','10','11','12']}
                    onSelect={(index, value) => chooseTimestable(value)}
                    />
                <Image style={styles.square}
          source={require('../imgs/noun_Dropdown_1270432.png')} />
             </View>
             <View style={styles.formLayout2}>
                <ModalDropdown dropdownTextStyle={{fontWeight:'bold', textAlign: 'center', fontSize: 15}}
                    textStyle={{fontWeight:'bold', textAlign: 'right',  fontSize: 20}} 
                    animated={true} 
                    showsVerticalScrollIndicator={true} 
                    isFullWidth = {true} 
                    style = {{width: 340}}
                    defaultValue = {'Select difficulty...'} 
                    options={['Beginner','Intermediate','Advanced']}
                    onSelect={(index,value) =>chooseDifficultyLevel(value)}
                    />
                <Image style={styles.square}
          source={require('../imgs/noun_Dropdown_1270432.png')} />
             </View>
             <View style={styles.formLayout3}>
                <ModalDropdown dropdownTextStyle={{fontWeight:'bold', textAlign: 'center', fontSize: 15}}
                    textStyle={{fontWeight:'bold', textAlign: 'right',  fontSize: 20}} 
                    animated={true} 
                    showsVerticalScrollIndicator={true} 
                    isFullWidth = {true} 
                    style = {{width: 340}}
                    defaultValue = {'Select class...'} 
                    options={forms}
                    onSelect={(index, value) => chooseClass(formIdsbyName[value])}
                    />
                <Image style={styles.square}
          source={require('../imgs/noun_Dropdown_1270432.png')} />
             </View>
             <View style={styles.formLayout4}>
                 <View style={styles.container2}>
                     <Text>Select Class</Text>
                        {forms.map(classOption)}
                    </View>
                    <View style={styles.container3}></View> 
                            <Cal updateDate = {chooseDate} />
             </View>
             
            <View style={styles.buttonContainer}>
            <Button   title="Publish Assignment"
          onPress = { () => {makeAssignment(chosenClass, timestable, difficultyLevel, date, 1)
                           
 }} 
          />
          </View>
          </View>
        )
    }


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    container3: {
        flex: 6,
        justifyContent: 'center',
        marginBottom: -2000

    },
    formLayout: {
        backgroundColor: '#E8EAED',
        marginTop: 30,
        marginBottom: 510,
        borderColor: 'black',
        borderWidth: 1,
        width: 340,
        height: 35,
        alignSelf: 'center',
    },
    formLayout2: {
        backgroundColor: '#E8EAED',
        borderColor: 'black',
        borderWidth: 1,
        width: 340,
        height: 35,
        alignSelf: 'center',
        marginTop: -480
    },
    formLayout3: {
        borderColor: 'black',
        borderWidth: 1,
        width: 340,
        height: 35,
        alignSelf: 'center',
        margin: 30
    },
    formLayout4: {
        borderColor: 'black',
        borderWidth: 1,
        width: 340,
        height: 300,
        alignSelf: 'center',
        margin: 30
    },
    buttonContainer: {
        flex: 1,
        marginBottom: 80,
        justifyContent: 'flex-end',
    },
    square: {
        height: 30,
        width: 30,
        alignSelf: 'flex-end',
        marginVertical: -25
        },
    line: {
        borderWidth:1,
        borderColor: 'black',
        height: 17,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 10
        },
});

export default SetHomework;