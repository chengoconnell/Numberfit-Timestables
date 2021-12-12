import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginFailed, attemptUpdate] = useState(false);
  const _storeData = async (userStr) => {
    try {
      console.log(userStr)
      await AsyncStorage.setItem(
        'user',
        userStr
      )
      ;
    } catch (error) {
      
    }
  };
  const userLogin = async(userName, pword) => {
    
    
    try{
    const {data: user} = await axios.post('http://34.247.47.193/api/v1/users/login',{
      "PK": userName,
      "password": pword
  })
    
    if(user.PK != undefined){
    const userString = JSON.stringify(user)
    _storeData(userString)
    
    if(global.userType === 'student' && user.role ==='student'){
      console.log(user.role)
    navigation.navigate('numberFit');
    }
    else if(global.userType === 'parent' && user.role === 'parent'){
      console.log(user.role)
      navigation.navigate('numberFitParent');
      }
    else if(global.userType === 'teacher' && user.role === 'teacher'){
      console.log(user.role)
      navigation.navigate('numberFitTeacher');
      }
    }else{
      console.log('should be updating')
      attemptUpdate(true)
      
    }
  }
  catch{
    console.log('axios error')
    attemptUpdate(true)
    
  }
    
  }
    return (
        <View style={styles.container}>
            <Image 
              style = {styles.logo} 
              source={require('../imgs/logo.png')}
            />
            <FormInput
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholderText="username"
              iconType="user"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              loginFail = {loginFailed}
            />
            <FormInput
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholderText="Password"
              iconType="lock"
              secureTextEntry={true}
              loginFail = {loginFailed}
            />
            <FormButton
              buttonTitle="SIGN IN"
              onPress={() => userLogin(email, password)}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
              <Text style={styles.navButtonText}>FORGOT YOUR PASSWORD?</Text>
              <Text style={styles.navButtonText}>CLICK HERE TO RESET</Text>
            </TouchableOpacity>

            {/* <Text style={styles.textRegister}> ────── OR  ──────</Text> */}

            {/* <SocialButton 
              buttonTitle="SIGN IN USING GOOGLE"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => {}}
            /> */}
            {/* <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('UserSelect')}>
                <Text style={styles.navButtonText}>NEW TO NUMBERFIT? JOIN HERE.</Text>
            </TouchableOpacity> */}
        </View>
      );
};

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50
    },
    logo: {
      height: 100,
      width: 300,
      marginVertical: 20,
      resizeMode: 'cover',
    },
    text: {
      fontSize: 28,
      marginBottom: 10,
      fontWeight: '500',
      color: '#051d5f',
    },
    textRegister: {
      fontSize: 15,
      marginVertical: 10,
      fontWeight: '500',
      color: '#abb8c3',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 50,
    },
    newAccountButton: {
      marginBottom: 36,
    },
    navButtonText: {
      fontSize: 17,
      fontWeight: '500',
      color: '#2e64e5',
      textAlign: 'center'
    },
});