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

function DarkMode({route, navigation}) {
      const { colors } = useTheme();
      const [isEnabled, setIsEnabled] = useState(false);
      const [selectedTab, setSelectedTab] = React.useState(0);

      return (
          <View>
             <View>
                 <View>
                    <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                        <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                    </TouchableOpacity>
                     <View style={ [styles.tabBar, {backgroundColor: colors.background}]}>
                         <MaterialTabs
                             items={['iOS Users', 'Android Users']}
                             selectedIndex={selectedTab}
                             onChange={setSelectedTab}
                             barColor={colors.background}
                             indicatorColor={colors.text}
                             activeTextColor={"red"}
                             inactiveTextColor={colors.text}
                         />
                     </View>
                     {selectedTab === 0 ? (
                         <View>
                               <View style={{flexDirection: "row", justifyContent: "center"}}>
                                   <Text style={ [styles.modalText, {color: colors.text}]}>Dark/Light Mode on iOS</Text>
                               </View>
                               <View style={{flexDirection: "row", justifyContent: "center"}}>
                                   <Text style={{ color: colors.text }}>To access dark mode or light mode on your iOS device, it is totally dependent on what you system's settings are on!</Text>
                               </View>
                               <View style={{flexDirection: "row", justifyContent: "center"}}>
                                     <Image source = { iosPic1 } style={ styles.pic } />
                                     <Image source = { iosPic2 } style={ styles.pic } />
                               </View>
                               <View style={{flexDirection: "row", justifyContent: "center"}}>
                                   <Text style={{ color: colors.text }}>To change modes, force touch the brightness icon and then, on the bottom left, you can toggle dark mode on or off to get dark mode or light mode respectively.</Text>
                               </View>
                         </View>
                     ) : (
                         <View>
                             <View style={{flexDirection: "row", justifyContent: "center"}}>
                                 <Text style={ [styles.modalText, { color: colors.text }]}>Dark/Light Mode on Android</Text>
                             </View>
                             <View style={{flexDirection: "row", justifyContent: "center"}}>
                                   <Text style={{ color: colors.text }}>To access dark mode or light mode on your Android device, it is totally dependent on what you system's settings are on!</Text>
                             </View>
                             <View style={{flexDirection: "row", justifyContent: "center"}}>
                                   <Image source = { AndroidPic1 } style={ styles.pic } />
                                   <Image source = { AndroidPic2 } style={ styles.pic } />
                             </View>
                             <View style={{flexDirection: "row", justifyContent: "center"}}>
                                 <Text style={{ color: colors.text }}>To change modes, swipe up to view your settings and swipe all the way to the right. Here you can toggle dark mode on or off to get dark mode or light mode respectively.</Text>
                             </View>
                         </View>
                     )}
                 </View>
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
      button: {
          marginTop: "10%",
          marginRight: "50%",
          padding: "8%",
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

export default DarkMode;
