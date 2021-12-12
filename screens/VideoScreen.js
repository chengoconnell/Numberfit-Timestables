import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import StopWatch from '../components/StopWatch';


export default function PlayVideo() {

//   componentDidMount() {
//     this.intervalId = setInterval(() => {
//       this.setState(
//           (prevState) => {
//           return { remainingSeconds: prevState.remainingSeconds + 1};
//       },
//       );
//   }, 1000);
// }}};
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <View style={styles.watchContainer}>
      <StopWatch />
      </View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://ucl-tt-videos.s3-eu-west-1.amazonaws.com/No-Floor-Mat/' + String(global.TT) + 'x-' + global.difficultyLevel + '-no-floor-mat.m4v',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  watchContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});