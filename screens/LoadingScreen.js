import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, Animated, ImageBackground, Image, TouchableHighlight} from 'react-native';
import { Component } from 'react';

import Logo from '../imgs/logo.png'

class Loading extends Component {
    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,
    };

    componentDidMount() {
        const {LogoAnime, LogoText} = this.state;
        this.timeoutHandle = setTimeout(()=>{
            this.props.navigation.navigate('UserSelectLogin')
       }, 5000);
        Animated.parallel([
            Animated.spring(LogoAnime, {
                toValue: 1,
                tension: 40,
                friction: 0.5,
                duration: 2200,
            }).start(),
            Animated.timing (LogoText, {
                toValue: 1,
                duration: 1200,
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
            <ImageBackground style={styles.background} source={require('../imgs/question-mark-background-vector.jpg')} >
            <View style={styles.container}>
                <Animated.View
                 style={{
                    opacity: this.state.LogoAnime,
                    top: this.state.LogoAnime.interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, 0],
                        }),
                }}>
                    <Image source={Logo} style={styles.logo} />
                </Animated.View>

            </View>
            </ImageBackground>
        );
        }
    };




export default Loading;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

// import React, { useCallback, useEffect, useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Entypo } from '@expo/vector-icons';
// import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font';

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       try {
//         // Keep the splash screen visible while we fetch resources
//         await SplashScreen.preventAutoHideAsync();
//         // Pre-load fonts, make any API calls you need to do here
//         await Font.loadAsync(Entypo.font);
//         // Artificially delay for two seconds to simulate a slow loading
//         // experience. Please remove this if you copy and paste the code!
//         await new Promise(resolve => setTimeout(resolve, 2000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         // Tell the application to render
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       // This tells the splash screen to hide immediately! If we call this after
//       // `setAppIsReady`, then we may see a blank screen while the app is
//       // loading its initial state and rendering its first pixels. So instead,
//       // we hide the splash screen once we know the root view has already
//       // performed layout.
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null;
//   }

//   return (
//     <View
//       style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
//       onLayout={onLayoutRootView}>
//       <Text>SplashScreen Demo! 👋</Text>
//       <Entypo name="rocket" size={30} />
//     </View>
//   );
// }