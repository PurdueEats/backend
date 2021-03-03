import React from 'react';
import {  View, Image } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, LoginStackNavigator } from "../stackNavigator/stackNavigator";
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator

    initialRouteName="HomeScreen"
    activeColor="white"
    inactiveColor="white"
    activeBackgroundColor="white"
    inactiveBackgroundColor="white"
    style={{ backgroundColor: 'white' }}
    tabBarOptions={{
      style:{
        backgroundColor: 'white'

      }
    }}
    >
      <Tab.Screen name=" " component={MainStackNavigator}
       options={{


            style: {
                    backgroundColor: 'white',
            },
            tabBarIcon: ({ size, focused, color}) => {
            return (
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../resources/profile.png')}

                />
              );

            }



       }}/>
      <Tab.Screen name="  " component={LoginStackNavigator}
       options={{
                        tabBarVisible: false,

                   style: {
                           backgroundColor: 'transparent',
                   },
                   tabBarIcon: ({ size, focused, color}) => {
                   return (
                       <Image
                         style={{ width: 40, height: 40 }}
                         source={require('../../resources/buddy.png')}

                       />
                     );
            }
       }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;