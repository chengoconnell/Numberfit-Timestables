import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Animated, ImageBackground, Image} from 'react-native';
import LoginChild from '../animations/LoginChild';  
import PropTypes from 'prop-types';
import LoginParent from '../animations/LoginParent';

  
export default class LoginLoaderParent extends Component {  
    state={  
        progressStatus: 0,  
    }  
    anim = new Animated.Value(0);  
    componentDidMount(){  
        this.onAnimate(),
        this.timeoutHandle = setTimeout(()=>{
            this.props.navigation.navigate('My Kids')
        }, 2200);
    }  
    onAnimate = () =>{  
        this.anim.addListener(({value})=> {  
            this.setState({progressStatus: parseInt(value,10)});  
        });  
        Animated.timing(this.anim,{  
             toValue: 100,  
             duration: 2000,  
        }).start();  
    }  

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
   }


  render() {  
    return (  
      <View style={styles.background}>
      <View style={styles.container}>  
            <Animated.View  
                style={[  
                    styles.inner,{width: this.state.progressStatus +"%"},  
                ]}  
            />  
            <Animated.Text style={styles.label}>  
                    {this.state.progressStatus }%  
            </Animated.Text>
      </View>  
      <View style={styles.animation}>
        <LoginParent />
        </View>
      </View>
    );  
  }  
}  
const styles = StyleSheet.create({  
    background: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#E8EAED'
    },
    container: {  
    width: "100%",  
    height: 40,  
    padding: 3,  
    borderColor: "#FAA",  
    borderWidth: 3,  
    borderRadius: 30,  
    marginTop: 200,  
    justifyContent: "center",  
  },  
  inner:{  
    width: "100%",  
    height: 30,  
    borderRadius: 15,  
    backgroundColor:"green",  
  },  
  label:{  
    fontSize:23,  
    color: "black",  
    position: "absolute",  
    zIndex: 1,  
    alignSelf: "center",  
  },
  animation: {
    flex: 1,
    justifyContent: 'center',
    // alignSelf: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  }


});  