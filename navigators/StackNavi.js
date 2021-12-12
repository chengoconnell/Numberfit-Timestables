import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from '../screens/LoginScreen'
import IconNav from '../screens/LandingPage';
import MultiChoiceGame from '../factory/MultiChoiceGame'
import Stats from '../screens/StatsScreen';
// import SetHomework from './src/screens/SetAssignment';
import Loading from '../screens/LoadingScreen';
import Tasks from '../screens/MyTasks';
import Loader from '../screens/GameLoadingScreen';


function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Profile!</Text>
    </View>
  );
}

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => this.props.navigation.navigate('Details')}
//       />
//     </View>
//   );
// }



const StatsStack = createStackNavigator();

function StatsStackScreen() {
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen name="Progress" component={Stats} />
      {/* <StatsStack.Screen name="Details" component={DetailsScreen} /> */}
    </StatsStack.Navigator>
  );
}

const HomeworkStack = createStackNavigator();

function HomeworkStackScreen() {
  return (
    <HomeworkStack.Navigator>
      <HomeworkStack.Screen name="My Tasks" component={Tasks} />
      <HomeworkStack.Screen name="Landing" component={MultiChoiceGame} />
    </HomeworkStack.Navigator>
  );
}

const LoginStack = createStackNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator headerMode={false}>
      <LoginStack.Screen name="Loading" component={Loading} />
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Landing" component={IconNav}/>
    </LoginStack.Navigator>
  );
}

const PlayStack = createStackNavigator();

function PlayStackScreen() {
  return (
    <PlayStack.Navigator>
     <PlayStack.Screen name="Landing" component={IconNav} /> 
      <PlayStack.Screen name="Load" component={Loader} />
      <PlayStack.Screen name="Game" component={MultiChoiceGame} />
    </PlayStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
     <ProfileStack.Screen name="My Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function StackNavi() {
  return (
      <Tab.Navigator>
                   <Tab.Screen name="Play" component={PlayStackScreen} 
         options={{
          tabBarLabel: 'Play',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="play" color={'red'} size={size} />
            
          ),
        }}
         />
        <Tab.Screen name="Stats" component={StatsStackScreen} 
         options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list" color={'#8FBC8F'} size={size} />
          ),
        }}
         />
         <Tab.Screen name="My Tasks" component={HomeworkStackScreen} 
         options={{
          tabBarLabel: 'My Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school" color={'#483D8B'} size={size} />
          ),
        }}
         />
        <Tab.Screen name="Profile" component={ProfileStackScreen} 
         options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-box" color={'#800000'} size={size} />
          ),
        }}
         />
      </Tab.Navigator>
  );
}
