import React, {useEffect, useState} from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Button, Item, Toast } from 'native-base';
import Logo from "../../resources/logo.png";
import iosPic1 from "../../resources/iosPic1.jpeg";
import iosPic2 from "../../resources/iosPic2.jpeg";
import AndroidPic1 from "../../resources/AndroidPic1.jpeg";
import AndroidPic2 from "../../resources/AndroidPic2.jpeg";
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import MaterialTabs from 'react-native-material-tabs';

function Settings({route, navigation}) {
      const { colors } = useTheme();
      const [isEnabled, setIsEnabled] = useState(false);
      const toggleSwitch = () => setIsEnabled(previousState => !previousState);
      const [isEnabled2, setIsEnabled2] = useState(false);
      const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
      const [example, setExample] = useState('');
      const [legendModalVisible, setLegendModalVisible] = useState(false);
          const [selectedTab, setSelectedTab] = React.useState(0);

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
                <View style={{ flexDirection:"row" }}>
                  <Text style={ [styles.signInContent, {color: colors.text}] }>Settings Group 1</Text>
                  <View style={{ position: "absolute", right: 10 }}>
                    <TouchableOpacity active = { .5 } onPress={() => setLegendModalVisible(true) }>
                        <MaterialCommunityIcons name="help-circle-outline" color="red" size={30}/>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={legendModalVisible}
                        onRequestClose={() => {
                            setLegendModalVisible(!legendModalVisible);
                        }}
                    >
                        <View>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={() => setLegendModalVisible(!legendModalVisible)}>
                                    <View style={styles.modalCloseButton}>
                                        <MaterialCommunityIcons name="close" color="red" size={20}/>
                                    </View>
                                </TouchableOpacity >
                                <View style={styles.tabBar}>
                                    <MaterialTabs
                                        items={['iOS Users', 'Android Users']}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor="#ffffff"
                                        indicatorColor="#000000"
                                        activeTextColor="#000000"
                                        inactiveTextColor="#908c8c"
                                    />
                                </View>
                                {selectedTab === 0 ? (
                                    <View>
                                          <View style={{flexDirection: "row", justifyContent: "center"}}>
                                              <Text style={styles.modalText}>Dark/Light Mode on iOS</Text>
                                          </View>
                                          <View style={{flexDirection: "row", justifyContent: "center"}}>
                                              <Text>To access dark mode or light mode on your iOS device, it is totally dependent on what you system's settings are on!</Text>
                                          </View>
                                          <View style={{flexDirection: "row", justifyContent: "center"}}>
                                                <Image source = { iosPic1 } style={ styles.pic } />
                                                <Image source = { iosPic2 } style={ styles.pic } />
                                          </View>
                                          <View style={{flexDirection: "row", justifyContent: "center"}}>
                                              <Text>To change modes, force touch the brightness icon and then, on the bottom left, you can toggle dark mode on or off to get dark mode or light mode respectively.</Text>
                                          </View>
                                    </View>
                                ): (
                                    <View>
                                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                                            <Text style={styles.modalText}>Dark/Light Mode on Android</Text>
                                        </View>
                                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                                              <Text>To access dark mode or light mode on your Android device, it is totally dependent on what you system's settings are on!</Text>
                                        </View>
                                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                                              <Image source = { AndroidPic1 } style={ styles.pic } />
                                              <Image source = { AndroidPic2 } style={ styles.pic } />
                                        </View>
                                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                                            <Text>To change modes, swipe up to view your settings and swipe all the way to the right. Here you can toggle dark mode on or off to get dark mode or light mode respectively.</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    </Modal>
                  </View>
               </View>
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
      modalCloseButton: {
        marginLeft: "5%",
      },
      modalText: {
        fontSize: 25,
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
      tabBar: {
          marginLeft: "5%",
          marginRight: "5%",
      },
      rowBetween: {
          flexDirection: "row",
          justifyContent: "space-between",
      },
      logo: {
          width: 100,
          height: 100
      },
      pic: {
        width: 180,
        height: 350,
      },

  });

export default Settings;
