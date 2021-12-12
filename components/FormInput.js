import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FormInput = ({labelValue, placeholderText, iconType, loginFail, ...rest}) => {
    // [userNotFound, loginUpdate] = useState(loginFail)
    const wrongDetails = () =>{
      
      if (loginFail){
        console.log('loginfailed')
        return (
        <View >
        <View style={styles.circle}>
          <Text style={styles.cross}>x</Text>
        </View>
      </View>)
    }}
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name={iconType} size={25} color="#666" />
            </View>
            <TextInput
                value={labelValue}
                style={styles.input}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor="#666"
                {...rest}
            />
           {wrongDetails()}
        </View>
    );
};

export default FormInput;

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 5,
      marginBottom: 10,
      width: '100%',
      height: 70,
      borderColor: '#ccc',
      borderRadius: 3,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    iconStyle: {
      padding: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRightColor: '#ccc',
      borderRightWidth: 1,
      width: 50,
    },
    input: {
      padding: 10,
      flex: 1,
      fontSize: 16,
      color: '#333',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputField: {
      padding: 10,
      marginTop: 5,
      marginBottom: 10,
      width: 700,
      height: 70,
      fontSize: 16,
      borderRadius: 8,
      borderWidth: 1,
    },
    circle: {
      backgroundColor: '#FF0000',
      justifyContent: 'center',
      alignContent: 'center',
      borderWidth: 0,
      borderRadius: (40),
      width: 20,
      height: 20,
      right: 20,
     
    },
    cross: {
      justifyContent: 'center',
      alignContent: 'center',
      flex:1,
      color: '#FFFFFF',
      left: 5.5
    }
  });
