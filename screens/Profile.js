import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

class Profile extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {{top: 20}}>
                    <Text style = {styles.titleText}>Joe Bloggs</Text>

                </View>
                <View style = {styles.nameContainer}>
                    <View style = {styles.infoContainer}>
                        <Text style = {styles.text}>Class: 5F</Text>
                        <Text style = {styles.text}>Teacher: Mr Johnson</Text>
                    </View>
                    <View style = {styles.circle}>
                        <Text style={{top: 45, left: 38}}>Avatar</Text>
                    </View>
                </View>
                <View style = {styles.statsContainer}>
                    <TouchableHighlight 
                        underlayColor = '#ccc'
                        onPress = {() => alert('Choose Your Avatar!')}
                        >
                        <Text style = {styles.text}>Current Assignments: 2</Text> 
                    </TouchableHighlight>
                    <TouchableHighlight 
                        underlayColor = '#ccc'
                        onPress = {() => alert('Way to Go!')}
                        >
                        <Text style = {styles.text}>Time this Week : 2h 30</Text> 
                    </TouchableHighlight>
                    <TouchableHighlight 
                        underlayColor = '#ccc'
                        onPress = {() => alert('Way to Go!')}
                        >
                        <Text style = {styles.text}>Trophies: 5</Text> 
                    </TouchableHighlight>
                    <TouchableHighlight 
                        underlayColor = '#ccc'
                        onPress = {() => alert('Upgrade Your Avatar!')}
                        >
                        <Text style = {styles.text}>XP: 100</Text> 
                    </TouchableHighlight>
                    
                    
                </View>
                <View style = {{right: 135, bottom: 70}}>
                    <Text style = {styles.text}>Achievements:</Text>
                    <View>
                        <AntDesign name='trophy' size={50} color="#FFD700"/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
    infoContainer: {
        position: 'relative',
        alignItems: 'flex-start',
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        left: 70
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 3
      },
      square: {
        width: 1000,
        height: 1000,
        borderRadius: 60,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 3
      },
    nameContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flex: 1,
        right: 60,
    },
    statsContainer: {
        position: 'relative',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        flex: 1,
        bottom: 100,
        right: 65
    },
    horizontalContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flex: 1,
        
    },
    text: {
        fontSize: 20,
        fontFamily: "Cochin",
    },
    titleText: {
        fontSize: 30,
        fontFamily: "Cochin",

    },
}
)

export default Profile