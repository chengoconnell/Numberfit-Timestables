import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Alert, ScrollView, TouchableOpacity, Button } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AvatarMenu from '../components/AvatarMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { result } from "lodash";
import avatarDict from "../components/AvatarDict";
import SettingsModal from "../components/SettingsModal";
import AchievementModal from '../components/AchievementModal';


  

//console.log(user.Item.data.avatar)

export default function MyAdultProfile({navigation}) {

    const Contact = () => {
        return (
            <TouchableOpacity onPress={() => Alert.alert('Email to contact me')}>
            <View style={styles.row}>
              <Image source={{ uri: "https://bootdey.com/img/Content/avatar/avatar7.png" }} style={styles.pic} />
              <View>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Mr. Jones</Text>
                  <Text style={styles.mblTxt}>Email
                  </Text>
                  <Text style={{marginTop:15, marginHorizontal: -90, flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>testteacher@gmail.com</Text>
                </View>
                <View style={styles.msgContainer}>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          )}

    
    
    const [user, userLoad] = useState({
        GSI1: "class_2ec278cf-1a35-4746-911b-1a360c83dbb5",
        PK: "user_mathsqueen",
        data:  {
          "avatar": 7,
          "firstName": "Gary",
          "hashPassword": "$2a$10$E71aiun83wdz5/FY374JU.e1abBYyA0VwV/C.unxGKZ2CXaZSXB6i",
          "lastName": "O'Connell",
          "pendingAssignments": 16,
          "role": "student",
          "secret": "studentSecret",
        },
        "eightx":  {
          "accuracy": 0,
          "state": "beginner",
          "testsTaken": 0,
          "timeTaken": 0,
        },
        "elevenx":  {
          "accuracy": 0,
          "state": "beginner",
          "testsTaken": 0,
          "timeTaken": 0,
        },
        "expiresIn": 168,
        "fivex":  {
          "accuracy": 0,
          "state": "beginner",
          "testsTaken": 0,
          "timeTaken": 0,
        },
        "fourx": {
          "accuracy": 0,
          "state": "beginner",
          "testsTaken": 0,
          "timeTaken": 0,
        },
        "message": "You have successfully logged in.",
        "ninex":  {
          "accuracy": 0,
          "state": "beginner",
          "testsTaken": 0,
          "timeTaken": 0,
        },
        "onex":  {
          "accuracy": 0,
          "state": "beginner",
          "testsTaken": 0,
          "timeTaken": 0,
        },
        "overall":  {
          "score": 0,
          "accuracy": 0,
          "testsTaken": 0,
          "timeTaken": 0,
        },
        "role": "student",
        "sevenx":  {
          "accuracy": 0,
          "state": "beginner",
          "testsTaken": 0,
          "timeTaken": 0,
        },
        "sixx":  {
          "accuracy": 0,
          "state": "beginner",
          "testsTaken": 0,
          "timeTaken": 0,
        },
        "success": true,
        "tenx":  {
          "accuracy": 0,
          "state": "beginner",
          "testsTaken": 0,
          "timeTaken": 0,
        },
        "threex":  {
          "accuracy": 0,
          "state": "beginner",
          "testsTaken": 0,
          "timeTaken": 0,
        },
    })
    
    useEffect(()=>{
        async function fetchData (){

    try {
      
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        let result = JSON.parse(value)
        userLoad(result)
        console.log('being called')
        
        
        

        
      }
    } catch (error) {
      
      console.log("error")
    }
  }
  
  fetchData()
  
    },[]);

    const logOut= () => {
        navigation.navigate('UserSelectLogin')
        AsyncStorage.clear()
          
      }

      
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    {/* <SettingsModal /> */}
                    <Button onPress={() => logOut()}  title={'Log out'}/>
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                                    <Ionicons style={styles.image} name="person-circle-outline" size={200} color="gray"></Ionicons>
                    </View>
                    <View style={styles.active}></View>
                </View>

                <View style={styles.infoContainer}>
                    {/* <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Teacher: Mr Langley</Text> 
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Date of Birth: 27/01/2012</Text> */}
                </View>
                <View style={{ marginTop: 32 }}>
                </View>
                {/* <Text style={styles.nameTxt}>Contact Teacher</Text> */}
                {/* <Contact /> */}
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    awardContainer: {
        height:60,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        backgroundColor: 'black'
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        alignContent: 'center'
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500",
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        flex:1,
        flexDirection: 'column'
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32,
        flexWrap: 'wrap',
    },
    statsBox: {
        alignItems: "center",
        flex: 1,
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 50,
        marginTop: 25,
        marginBottom: 6,
        fontSize: 16
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: 'lightblue',
        borderBottomWidth: 1,
        padding: 30,
        marginTop:20,
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
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width:170,
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
});