import React, {useEffect, useState} from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
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

    // Setup re-render on focus change
    const isFocused = useIsFocused();

      const { colors } = useTheme();
      const [isEnabled, setIsEnabled] = useState(false);
      const toggleSwitch = () => setIsEnabled(previousState => !previousState);
      const [isEnabled2, setIsEnabled2] = useState(false);
      const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
      const [example, setExample] = useState('');
      const [legendModalVisible, setLegendModalVisible] = useState(false);
      const [selectedTab, setSelectedTab] = React.useState(0);
      const [sett, setSett] = useState("notcorrect");
      const [schedule, setSchedule] = useState('');


      useEffect(() => {
            if (isFocused) {
                getSettings();
            }
        }, [isFocused]);

      function changeFact(val) {
          if (val) {
            setSett("1" + sett.substring(1, 2));
            setIsEnabled(true);
          } else {
            setSett("0" + sett.substring(1, 2));
            setIsEnabled(false);
          }
      }

      function changeSort(val) {
          if (val) {
            setSett(sett.substring(0, 1) + "1");
            setIsEnabled2(true);
          } else {
            setSett(sett.substring(0, 1) + "0");
            setIsEnabled2(false);
          }
      }

      function handleConfirm() {
          if (schedule != '') {
            setSettings();
          }

      }


      function getSettings() {
          //retrieves settings
          fetch('https://app-5fyldqenma-uc.a.run.app/Users/'+ route.params.UserID +'/Schedule', {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + route.params.token
                },
            })
                .then(
                    function(response) {
                        if (response.status === 200 || response.status === 201) {
                            // Successful GET
                            response.json().then(function(data) {
                                setSchedule(data["schedule"]);
                                if (data["schedule"].substring(42, 43) == "1") {
                                    setIsEnabled(true);
                                } else {
                                    setIsEnabled(false);
                                }
                                if (data["schedule"].substring(43, 44) == "1") {
                                    setIsEnabled2(true);
                                } else {
                                    setIsEnabled2(false);
                                }


                            });
                        } else {
                            // Examine the text in the response
                            console.log('Looks like there was a problem retrieving schedule. Status Code: ' +
                                response.status);
                        }
                    }
                )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });
      }
      function setSettings() {
          let newSchedule = (schedule.substring(0, 42) + sett)
          // Submit current schedule data
          fetch('https://app-5fyldqenma-uc.a.run.app/Users/'+ route.params.UserID +'/Schedule', {
              method: 'POST',
              headers : {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + route.params.token
              },
              body: JSON.stringify({
                  "user_id": route.params.UserID,
                  "schedule": newSchedule
              })
          })
              .then(
                  function(response) {
                      if (response.status === 200 || response.status === 201) {
                          // Successful POST
                          Toast.show({
                              style: { backgroundColor: "green", justifyContent: "center" },
                              position: "top",
                              text: "Settings successfully updated",
                              textStyle: {
                                  textAlign: 'center',
                              },
                              duration: 3000

                          });

                      } else {
                          // Examine the text in the response
                          console.log('Looks like there was a problem updating schedule. Status Code: ' +
                              response.status);
                              Toast.show({
                                    style: { backgroundColor: "red", justifyContent: "center" },
                                    position: "top",
                                    text: "Settings not updated",
                                    textStyle: {
                                        textAlign: 'center',
                                    },
                                    duration: 3000

                                });
                          displayError();
                      }
                  }
              )
              .catch(function(err) {
                  console.log('Fetch Error :-S', err);
              });
      }
      const [selectedTab, setSelectedTab] = React.useState(0);

      function handleDarkModeNavigate() {
        navigation.navigate("DarkMode");
      }

      return (
          <View>
              <View style={ { backgroundColor: colors.background, flexDirection:"row" } } >
                  <Text>         </Text>
              </View>
              <View style={ styles.iconPosition }>
                  <Image source = { Logo } style={ styles.logo } />
                  <Text style={ [styles.appName, {color: colors.text}] }>Settings</Text>

              </View>
              <View style={ styles.content }>
                <View style={{ flexDirection:"row" }}>
                  <Text style={ [styles.signInContent, {color: colors.text}] }>General Settings</Text>

               </View>
               <View style={ styles.rowBetween }>
                   <Text style={ styles.modeHeader }>Light Mode/Dark Mode</Text>
                       <View style={{ position: "absolute", right: 10 }}>
                         <TouchableOpacity active = { .5 } onPress= { handleDarkModeNavigate }>
{/*                          DarkMode */}
                             <MaterialCommunityIcons name="help-circle-outline" color="red" size={23}/>
                         </TouchableOpacity>
{/*                          <Modal */}
{/*                              animationType="slide" */}
{/*                              transparent={false} */}
{/*                              visible={legendModalVisible} */}
{/*                              onRequestClose={() => { */}
{/*                                  setLegendModalVisible(!legendModalVisible); */}
{/*                              }} */}
{/*                              style={{ backgroundColor: colors.background }} */}
{/*                          > */}
{/*                              <View> */}
{/*                                  <View> */}
{/*                                      <TouchableOpacity onPress={() => setLegendModalVisible(!legendModalVisible)}> */}
{/*                                          <View style={styles.modalCloseButton}> */}
{/*                                              <MaterialCommunityIcons name="close" color="red" size={20}/> */}
{/*                                          </View> */}
{/*                                      </TouchableOpacity > */}
{/*                                      <View style={ [styles.tabBar, {backgroundColor: colors.background}]}> */}
{/*                                          <MaterialTabs */}
{/*                                              items={['iOS Users', 'Android Users']} */}
{/*                                              selectedIndex={selectedTab} */}
{/*                                              onChange={setSelectedTab} */}
{/*                                              barColor={colors.background} */}
{/*                                              indicatorColor={colors.text} */}
{/*                                              activeTextColor={"red"} */}
{/*                                              inactiveTextColor={colors.text} */}
{/*                                          /> */}
{/*                                      </View> */}
{/*                                      {selectedTab === 0 ? ( */}
{/*                                          <View> */}
{/*                                                <View style={{flexDirection: "row", justifyContent: "center"}}> */}
{/*                                                    <Text style={ [styles.modalText, {color: colors.text}]}>Dark/Light Mode on iOS</Text> */}
{/*                                                </View> */}
{/*                                                <View style={{flexDirection: "row", justifyContent: "center"}}> */}
{/*                                                    <Text style={{ color: colors.text }}>To access dark mode or light mode on your iOS device, it is totally dependent on what you system's settings are on!</Text> */}
{/*                                                </View> */}
{/*                                                <View style={{flexDirection: "row", justifyContent: "center"}}> */}
{/*                                                      <Image source = { iosPic1 } style={ styles.pic } /> */}
{/*                                                      <Image source = { iosPic2 } style={ styles.pic } /> */}
{/*                                                </View> */}
{/*                                                <View style={{flexDirection: "row", justifyContent: "center"}}> */}
{/*                                                    <Text style={{ color: colors.text }}>To change modes, force touch the brightness icon and then, on the bottom left, you can toggle dark mode on or off to get dark mode or light mode respectively.</Text> */}
{/*                                                </View> */}
{/*                                          </View> */}
{/*                                      ) : ( */}
{/*                                          <View> */}
{/*                                              <View style={{flexDirection: "row", justifyContent: "center"}}> */}
{/*                                                  <Text style={ [styles.modalText, { color: colors.text }]}>Dark/Light Mode on Android</Text> */}
{/*                                              </View> */}
{/*                                              <View style={{flexDirection: "row", justifyContent: "center"}}> */}
{/*                                                    <Text style={{ color: colors.text }}>To access dark mode or light mode on your Android device, it is totally dependent on what you system's settings are on!</Text> */}
{/*                                              </View> */}
{/*                                              <View style={{flexDirection: "row", justifyContent: "center"}}> */}
{/*                                                    <Image source = { AndroidPic1 } style={ styles.pic } /> */}
{/*                                                    <Image source = { AndroidPic2 } style={ styles.pic } /> */}
{/*                                              </View> */}
{/*                                              <View style={{flexDirection: "row", justifyContent: "center"}}> */}
{/*                                                  <Text style={{ color: colors.text }}>To change modes, swipe up to view your settings and swipe all the way to the right. Here you can toggle dark mode on or off to get dark mode or light mode respectively.</Text> */}
{/*                                              </View> */}
{/*                                          </View> */}
{/*                                      )} */}
{/*                                  </View> */}
{/*                              </View> */}
{/*                          </Modal> */}
                       </View>
               </View>
               <Text>         </Text>
                  <View style={ styles.rowBetween }>
                      <Text style={ styles.sectionHeader }>Receive Daily Purdue Fun Fact?</Text>
                       <Switch
                              trackColor={{ false: "#767577", true: "red" }}
                              thumbColor={isEnabled ? "red" : "#f4f3f4"}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={(val) => changeFact(val)}
                              value={isEnabled}
                       />
                  </View>
                  <Text>         </Text>
                  <View style={ styles.rowBetween }>
                      <Text style={ styles.sectionHeader }>Sort meals from old to new?</Text>
                      <Switch
                            trackColor={{ false: "#767577", true: "red" }}
                            thumbColor={isEnabled2 ? "red" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(val) => changeSort(val)}
                            value={isEnabled2}
                      />
                  </View>
                  <Text>         </Text>
                  <TouchableOpacity active={0.5} style={ styles.backImage } onPress={() =>  handleConfirm() }>
                      <Text style={ [styles.sectionHeader, {color: colors.text}] }>Confirm Settings</Text>
                  </TouchableOpacity>
                  <Text>         </Text>
                  <Text style={ [styles.signInContent, {color: colors.text}] }>Feedback</Text>
                  <TouchableOpacity active={0.5} style={ styles.backImage } onPress={() =>  navigation.navigate("Feedback", { UserID: route.params.UserID, token: route.params.token }) }>
                    <Text style={  [styles.sectionHeader, {color: colors.text}] }>Submit Feedback</Text>
                  </TouchableOpacity>
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
      modeHeader: {
          color: "red",
          fontWeight: "bold",
          paddingBottom: "2%"
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
      }
  });

export default Settings;
