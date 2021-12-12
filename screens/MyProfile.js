import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight, Button, Alert} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AvatarMenu from '../components/AvatarMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { result } from "lodash";
import avatarDict from "../components/AvatarDict";
import SettingsModal from "../components/SettingsModal";
import AchievementModal from '../components/AchievementModal';
import {useIsFocused} from '@react-navigation/native';



  

//console.log(user.Item.data.avatar)

export default function MyProfile({navigation}) {
    
    const [profilePic, changePP] = useState({photo: require("../imgs/bee.jpeg")});
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
    const updateAvatar = (avatarNo) =>{
        changePP({photo: avatarDict[avatarNo]})
        Alert.alert('Avatar updated!', 'Scroll to the bottom and hit close to see your new look!')
    }
    const isFocused = useIsFocused()
    useEffect(()=>{
        async function fetchData (){

    try {
      
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        let result = JSON.parse(value)
        userLoad(result)
        let pic = result.data.avatar
        let pp = avatarDict[pic]
        changePP({photo: pp})
        
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
                        <Image source={profilePic.photo} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <AvatarMenu func = {updateAvatar} person = {user}></AvatarMenu>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{user.data.firstName} {user.data.lastName}</Text>
                    {/* <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Teacher: Mr Langley</Text>  */}
                    {/* <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Class: {user.GSI1}</Text> */}
                    {/* <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Date of Birth: 27/01/2012</Text> */}
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{Math.round((user.data.score*100)/33)} %</Text>
                        <Text style={[styles.text, styles.subText, {fontSize: 12}]}>App Completion</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{Math.floor(user.overall.timeTaken/60)} mins</Text>
                        <Text style={[styles.text, styles.subText, {fontSize: 12}]}>Time Spent</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{user.data.experience}</Text>
                        <Text style={[styles.text, styles.subText, {fontSize: 12}]}>Total XP</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{user.overall.timestableMastered}</Text>
                        <Text style={[styles.text, styles.subText, {fontSize: 12}]}>Timestables Mastered</Text>
                    </View>
                </View>
                
                <View style={{ marginTop: 32 }}>
                </View>
                <Text style={[styles.subText2]}>Achievements</Text>
                <View style={styles.awardContainer}>
                </View>  
                <AchievementModal />
                <View style={styles.awardContainer}>
                </View>  
                {/* <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Michael Jackson </Text>and <Text style={{ fontWeight: "400" }}>Phil Mitchell</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Gordon Brown</Text>
                            </Text>
                        </View>
                    </View>
                </View> */}
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
        height:20,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        backgroundColor: '#006400'
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
        textAlign: 'center',
    },
    subText2: {
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500",
        textAlign: 'left',
        marginLeft: 15
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        borderColor: '#B22222',
        borderWidth: 3,
        backgroundColor: 'red'
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
    }
});