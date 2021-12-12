import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, Animated, ImageBackground, Image, TouchableHighlight} from 'react-native';
import { Component } from 'react';
import { Audio } from 'expo-av';
import Logo from '../imgs/logo.png';
import SparklyThing from '../components/Sparkle';

function StartSound() {
    const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/Start.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
      <Button title="Play Sound" onPress={playSound} />
  );
}


class Countdown3 extends Component {

    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,
    };

    componentDidMount() {
        const {LogoAnime, LogoText} = this.state;
        this.timeoutHandle = setTimeout(()=>{
            this.props.navigation.navigate('Countdown2')
       }, 1000);
       <StartSound />
        Animated.parallel([
            Animated.spring(LogoAnime, {
                toValue: 1,
                tension: 10,
                friction: 0.3,
                duration: 800,
            }).start(),
            Animated.timing (LogoText, {
                toValue: 1,
                duration: 800,
            }),
        ]).start(() => {
            this.setState({
                loadingSpinner: true,
            });
        });
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
   }
   
        render() {
        return (
            <View style={styles.container}>
                <Animated.View
                 style={{
                    opacity: this.state.LogoAnime,
                    top: this.state.LogoAnime.interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, 0],
                        }),
                }}>
  
 <Text style={{fontSize: 200, color: 'white'}}>3</Text>
 {/* <SparklyThing /> */}
                    {/* <Image source={Logo} style={styles.logo}/> */}
                </Animated.View>
                {/* <Animated.View style={{opacity: this.state.LogoText}}> 
            <Text style={styles.logoText}>HEALTHY CHILDREN LOVE LEARNING</Text>
            </Animated.View> */}
            {/* <StartSound /> */}
            </View>
        );
        }
    };


    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'green'
    },
    logoText: {
        color: 'white',
        backgroundColor: 'gray',
        fontFamily: 'Roboto',
        fontSize: 20,
        marginTop: 29.1,
        fontWeight: '300',
        borderColor: 'blue',
        borderWidth: 3,
        // alignItems: 'center'
    },
    logo: {
        height: 100,
        width: 300,
        marginVertical: 20,
        resizeMode: 'cover',
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 3,
    },
  });


export default Countdown3;
