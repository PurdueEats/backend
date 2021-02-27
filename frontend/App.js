import * as React from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import LoginManager from "./components/login/LoginManager"
//import TemplateComponent from "./components/template/TemplateComponent";



const styles = StyleSheet.create({
    container: {
        color: "green"
    },

    container2: {
        textAlign: "left",
        color: "black",
        marginBottom: 35
    },

    textNormal: {
        color: "black",
        marginBottom: 15
    },

    textNormalRed: {
        color: "red",
        marginBottom: 15
    },

    navBar: {
        width: 40,
        height: 40,
        marginLeft: 15,
        marginRight: 15,

    },

    profileImage: {
            width: 200,
            height: 200,
            marginBottom: 35,
            alignItems: "center",

        },

});

export default function App() {



  const Stack = createStackNavigator();



   /* return (
        // Do not remove Root! Root is necessary for toasts integrated in successive components.
        <Root>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                  }} initialRouteName="Login">
                    <Stack.Screen name="Login" component={ProfileManager}/>
                    <Stack.Screen name="Test" component={TemplateComponent} />
                </Stack.Navigator>
            </NavigationContainer>
        </Root>
    ); */
  return (





         <View
              style={{
              flex: 1,

                            }}

                        >

        <View
                    style={{
                    marginTop: 40,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",

                    }}
                >
        <View
            style={{ width: 40, height: 40, position: 'absolute', left: 10 }}

        >


        <TouchableOpacity active = { .5 } onPress={() => alert("Image Clicked") }>
        <Image
                    style={{ width: 40, height: 40, position: 'absolute', left: 10 }}
                    source={require('./arrow.png')}
                />
        </TouchableOpacity>
        </View>

        <Text style={{ marginBottom: 8, color: "black", fontSize: 22, }}>Profile</Text>
        </View>


         <View
            style={{
            alignItems: "center",
            justifyContent: "center",

            }}
        >

        <Image
            style={ styles.profileImage }
            source={require('./profilepng.png')}
        />


        <Text style={ styles.textNormal }>Firstname Lastname<Text style={{ color: "red" }}>                edit</Text> </Text>

        <Text style={ styles.textNormal }>email111@purdue.edu<Text style={{ color: "red" }}>                edit</Text> </Text>


        <View
          style={{

            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignSelf: 'stretch',
            marginBottom: 15
          }}
        />


        <Text style={ styles.textNormal}>Boiler Flex Unlimited Plan 350<Text style={{ color: "red",  }}>                edit</Text> </Text>
        <Text style={ styles.textNormal}>Dining Dollars Left: $340.56<Text style={{ color: "red" }}>                edit</Text> </Text>

            <View
                  style={{

                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    alignSelf: 'stretch',
                    marginBottom: 15
                  }}
                />

        <Text style={ styles.textNormal}>Track Meals</Text>
        <Text style={ styles.textNormal}>Change Password</Text>
        <Text style={ styles.textNormalRed}>Delete Account</Text>




</View>
<View style={{flexDirection:'row', position: 'absolute', bottom: 10, left: 0, right: 0, justifyContent: 'center'}}>
                                <TouchableOpacity active = { .5 } onPress={() => alert("Image Clicked") }>
                                    <Image
                                        style={ styles.navBar }
                                        source={require('./home.png')}
                                    />
                                </TouchableOpacity>
                                <Image
                                    style={ styles.navBar }
                                    source={require('./map.png')}
                                />
                                <Image
                                    style={ styles.navBar }
                                    source={require('./buddy.png')}
                                />
                                <Image
                                    style={ styles.navBar }
                                    source={require('./profile.png')}
                                />
                                <Image
                                    style={ styles.navBar }
                                   source={require('./settings.png')}
                                />

                            </View>
            </View>
  );

}
