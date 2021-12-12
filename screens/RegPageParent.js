import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native'
import { Dimensions } from "react-native";
import axios from 'axios';


const screenWidth = Dimensions.get("window").width;

export default class ParentSignUp extends React.Component {
  state = {
    username: '', password: '', email: '',  Child_Id: '', Child_Key: '', firstName:'', lastName:''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email, Child_Id, Child_Key, firstName, lastName } = this.state
    try {
      // here place your signup logic
      let registrationRes = await axios.post('http://34.247.47.193/api/v1/users/register/parent',{
          "PK": username,
          "GSI1": Child_Id,
          "childKey": Child_Key,
          "data":{
            "firstName": firstName,
             "email": email,
            "lastName": lastName, 
            "password": password
          }
      })
      
      Alert.alert("User successfully signed up")
      this.props.navigation.navigate('LoginStackScreen')
    } catch (err) {
      console.log('error signing up: ', err)
      Alert.alert("Error: please check registration details are valid")
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
          <TextInput
          style={styles.input}
          placeholder='First Name'
          secureTextEntry={false}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('firstName', val)}
        />
          <TextInput
          style={styles.input}
          placeholder='Last Name'
          secureTextEntry={false}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('lastName', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <View style={styles.line}></View>
        <TextInput
          style={styles.input}
          placeholder='Child Id'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('Child_Id', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Child Key'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('Child_Key', val)}
        />
        <Button
          title="Sign up"
          onPress={() => this.signUp()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: screenWidth,
    borderWidth: 3,
    backgroundColor: 'black'
  }
})