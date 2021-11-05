import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

import HomeScreen from './screens/HomeScreen';
import MessageScreen from './screens/MessageScreen';
import NotificationScreen from './screens/NotificationScreen';
import ScanQRScreen from './screens/ScanQRScreen';
import ProfileScreen from './screens/Profile';

import * as firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAZtoHqwrClc5YDvC8MYxsUuhPeevCkfN4",
  authDomain: "parkerly-6c5f1.firebaseapp.com",
  projectId: "parkerly-6c5f1",
  storageBucket: "parkerly-6c5f1.appspot.com",
  messagingSenderId: "324044434292",
  appId: "1:324044434292:web:94a038863a192e749d1a21",
  measurementId: "G-L6FGHZ1314"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="home" size={30} color={tintColor} />
          }
        },
        // Message: {
        //   screen: MessageScreen,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => <Ionicons name="chatbubbles" size={30} color={tintColor} />
        //   }
        // },
        ScanQr: {
          screen: ScanQRScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons
                name="scan-circle"
                size={45}
                color={tintColor}
                // color="#827E72"
                // style={{
                //   shadowColor: "#DBC27E",
                //   shadowOffset: { width: 0, height: 0 },
                //   shadowRadius: 10,
                //   shadowOpacity: 0.3
                // }}
              />
            )
          }
        },
        // Notification: {
        //   screen: NotificationScreen,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => <Ionicons name="notifications" size={30} color={tintColor} />
        //   }
        // },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="person" size={30} color={tintColor} />
          }
        }
      },
    
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if (navigation.state.key === "ScanQR") {
              navigation.navigate("ScanQRCode")
            } else {
              defaultHandler()
            }
          }
        },
        tabBarOptions: {
          activeTintColor: "#161F3D",
          inactiveTintColor: "#B8BBC4",
          showLabel: false
        }
      }
    ),
    ScanQRCode: {
      screen: ScanQRScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
    // initialRouteName: "ScanQRCode"
  }
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
); 