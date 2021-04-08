import React, {useEffect, useState} from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Button, Item, Toast } from 'native-base';
import Logo from "../../resources/logo.png";
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

function Settings({route, navigation}) {
  const { colors } = useTheme();

      const [isEnabled, setIsEnabled] = useState(false);
      const toggleSwitch = () => setIsEnabled(previousState => !previousState);
      const [isEnabled2, setIsEnabled2] = useState(false);
      const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
      const [example, setExample] = useState('');

      return (
          <View>
              <View style={ [styles.screenView, {flexDirection:"row"}] } >
                  <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                      <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                  </TouchableOpacity>
              </View>
              <View style={ styles.iconPosition }>
                  <Image source = { Logo } style={ styles.logo } />
                  <Text style={ [styles.appName, {color: colors.text}] }>Settings</Text>

              </View>
              <View style={ styles.content }>
                  <Text style={ [styles.signInContent, {color: colors.text}] }>Settings Group 1</Text>
                  <View style={ styles.rowBetween }>
                      <Text style={ styles.sectionHeader }>Test Setting 1</Text>
                       <Switch
                              trackColor={{ false: "#767577", true: "red" }}
                              thumbColor={isEnabled ? "red" : "#f4f3f4"}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={toggleSwitch}
                              value={isEnabled}
                       />
                  </View>
                  <Text>         </Text>
                  <View style={ styles.rowBetween }>
                      <Text style={ styles.sectionHeader }>Test Setting 2</Text>
                      <Switch
                            trackColor={{ false: "#767577", true: "red" }}
                            thumbColor={isEnabled2 ? "red" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch2}
                            value={isEnabled2}
                      />
                  </View>
                  <Text>         </Text>
                  <Text>         </Text>
                  <Text style={ [styles.signInContent, {color: colors.text}] }>Settings Group 2</Text>
                  <DropDownPicker
                        items={[
                            {label: 'example1', value: 'example1'},
                            {label: 'example2', value: 'example2'},
                        ]}
                        containerStyle={{height: 40, width: 150}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => setExample(item.value)}
                  />
                  <Text>         </Text>
                  <Text>         </Text>
                  <Text style={ [styles.signInContent, {color: colors.text}] }>Settings Group 3</Text>
                  <Text style={  [styles.sectionHeader, {color: colors.text}] }>Submit Feedback</Text>
                  </View>
              </View>

      );
  }

  const styles = StyleSheet.create({
      iconPosition: {
          marginBottom: "5%",
          alignItems: "center"
      },
      appName: {
          fontSize: 35,
          fontWeight: "bold"
      },
      content: {
          paddingTop: "5%",
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingBottom: "10%"
      },
      signInContent: {
          fontSize: 25,
          fontWeight: "bold",
          marginBottom: "10%"
      },
      sectionHeader: {
          color: "red",
          fontWeight: "bold",
      },
      screenView: {
          marginTop: "10%",
          marginLeft: "7%",
      },
      rowBetween: {
          flexDirection: "row",
          justifyContent: "space-between",
      },
      logo: {
          width: 100,
          height: 100
      },


  });

export default Settings;
