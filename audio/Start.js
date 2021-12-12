import React from 'react';
import { Audio } from 'expo-av';

export default function StartSound() {
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

  return playSound;
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       backgroundColor: '#ecf0f1',
//       padding: 10,
//     },
//     background: {
//         flex: 1,
//         justifyContent: "flex-end",
//         alignItems: "center",
//         backgroundColor: 'green'
//     },
//     logoText: {
//         color: 'white',
//         backgroundColor: 'gray',
//         fontFamily: 'Roboto',
//         fontSize: 20,
//         marginTop: 29.1,
//         fontWeight: '300',
//         borderColor: 'blue',
//         borderWidth: 3,
//     },
//     logo: {
//         height: 100,
//         width: 300,
//         marginVertical: 20,
//         resizeMode: 'cover',
//         backgroundColor: 'white',
//         borderColor: 'blue',
//         borderWidth: 3,
//     },
//   });