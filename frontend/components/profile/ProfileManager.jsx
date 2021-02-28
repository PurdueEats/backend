import React, { Component } from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Button, Item } from 'native-base';




const styles = StyleSheet.create({
    container: {
        color: "green"
    },

    container2: {
        textAlign: "left",
        color: "black",
        marginBottom: "10%",
    },

    profileWord: {

        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        color: "black",
        fontSize: 22,

    },

    profileHeader: {
            marginTop: "8%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            color: "black",
            fontSize: 22,

        },

    textNormal: {
        color: "black",
        marginBottom: "5%",
        flexDirection: "row",




    },


    textNormalRed: {
        color: "red",
        marginBottom: "5%",
    },


    border: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        marginBottom: "5%"


    },

    navBar: {
        width: 40,
        height: 40,


    },

    editImage: {
            width: 20,
            height: 20,
            marginRight: "7%",



        },

    profileImage: {
            width: 200,
            height: 200,
            marginBottom: "5%",
            alignItems: "center",

        },

});
 class ProfileManager extends Component {

    render () {
    return (





         <View
              style={{
              flex: 1,

                            }}

                        >

        <View
                    style={styles.profileHeader

                    }
                >
        <View
            style={{ width: 40, height: 40}}

        >


        <TouchableOpacity active = { .5 } onPress={() => alert("Image Clicked") }>
        <Image
                    style={{ width: 40, height: 40,  }}
                    source={require('../../resources/arrow.png')}
                />
        </TouchableOpacity>
        </View>

        <Text style={ styles.profileWord }>Profile</Text>
        <Text style={ styles.profileWord }>       </Text>
        </View>


         <View
            style={{
            alignItems: "center",
            justifyContent: "center",

            }}
        >

        <Image
            style={ styles.profileImage }
            source={require('../../resources/profileicon.png')}
        />
        </View>


        <View
                    style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    }}
                >
        <Text style={ styles.textNormal }>   Firstname Lastname </Text>


        <Image
                            style={ styles.editImage }
                            source={require('../../resources/edit.png')}
                        />
        </View>


        <View
                            style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            }}
                        >
                <Text style={ styles.textNormal }>   email111@purdue.edu </Text>

                <Image
                    style={ styles.editImage }
                    source={require('../../resources/edit.png')}
                />

                </View>





        <View
                  style={ styles.border
                  }
                />
                    <View
                                    style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    }}
                                >
                        <Text style={ styles.textNormal }>   Boiler Flex Unlimited Plan 350 </Text>


                        <Image
                                            style={ styles.editImage }
                                            source={require('../../resources/edit.png')}
                                        />
                        </View>


        <View
                                            style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            }}
                                        >
                                <Text style={ styles.textNormal }>   Dining Dollars Left: $340.56 </Text>


                                <Image
                                                    style={ styles.editImage }
                                                    source={require('../../resources/edit.png')}
                                                />
                                </View>

            <View
                              style={
                              styles.border
                              }
                            />

                    <View
                        style={{
                        alignItems: "center",
                        justifyContent: "center",

                        }}
                    >
                    <Text style={ styles.textNormal}>Track Meals</Text>
                    <Text style={ styles.textNormal}>Change Password</Text>
                    <Text style={ styles.textNormalRed}>Delete Account</Text>

                    </View>



<View style={{flexDirection:'row',  justifyContent: 'space-around', alignItems: 'flex-end'}}>
                                <TouchableOpacity active = { .5 } onPress={() => alert("Image Clicked") }>
                                    <Image
                                        style={ styles.navBar }
                                        source={require('../../resources/home.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity active = { .5 } onPress={() => alert("Image Clicked") }>
                                <Image
                                    style={ styles.navBar }
                                    source={require('../../resources/map.png')}
                                />
                                </TouchableOpacity>
                                <TouchableOpacity active = { .5 } onPress={() => alert("Image Clicked") }>
                                <Image
                                    style={ styles.navBar }
                                    source={require('../../resources/buddy.png')}
                                />
                                </TouchableOpacity>
                                <TouchableOpacity active = { .5 } onPress={() => alert("Image Clicked") }>
                                <Image
                                    style={ styles.navBar }
                                    source={require('../../resources/profile.png')}
                                />
                                </TouchableOpacity>
                                <TouchableOpacity active = { .5 } onPress={() => alert("Image Clicked") }>
                                <Image
                                    style={ styles.navBar }
                                   source={require('../../resources/settings.png')}
                                />
                                </TouchableOpacity>

                            </View>
            </View>
  );
  }
}
export default ProfileManager;