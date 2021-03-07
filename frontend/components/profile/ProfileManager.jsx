import React, { Component, useState } from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Button, Item } from 'native-base';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import ReactRoundedImage from "react-rounded-image";

function ProfileManager({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);

    const [name, setName] = useState('Eric Thompson');
    const [email, setEmail] = useState('email@email.email');
    const [plan, setPlan] = useState('   Meal Plan: Boiler Flex Unlimited 350');
    const [dollars, setDollars] = useState('200');
    const [password, setPassword] = useState('password1');

    const [response, setResponse] = useState( { userID: "", name: "", email: "" });
    const [mealResponse, setMealResponse] = useState( { userID: "", mealPlan: "", diningDollars: "", });


    function resetEverything() {
        setName('');
        setEmail('');
        setDollars('');


    }

    const plans = ['   Meal Plan: Boiler Flex Unlimited Plan 350', '   Meal Plan: Boiler Plan 2', '   Meal Plan: I will add the actual names in later'];



    // TODO add check for token expiration
    function tokenManager() {

    }
    function getLogin() {


            //MealPlan Route
            setResponse({ UserId: "", name: "", email: "" });
                   // Login Route
                   fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/`+UserId+`/Login`, {
                   	method: 'GET',
                   	headers : {
                   		'Content-Type': 'application/json',
                   		'Accept': 'application/json',
                   		'Authorization': 'Bearer ' + token
                       },

                   })
                       .then(
                           function(apiResponse) {
                               if (apiResponse.status !== 200) {
                                   console.log('Looks like there was a problem. Status Code: ' +
                                       response.status);
                                   displayError();
                                   return;
                               } else {
                                   // Examine the text in the response
                                   apiResponse.json().then(function(data) {
                                       setResponse(data);
                                       // Login successful, redirect to MealPreferences
                                       navigation.navigate("MealPreferences", { UserID: data.UserID, token: data.token });
                                   });
                               }
                           }
                       )
                       .catch(function(err) {
                           console.log('Fetch Error :-S', err);
                       });



    }

    function getMealInfo() {


                //MealPlan Route
                setResponse({ UserId: "", mealPlan: "", diningDollars: "" });
                                  // Login Route
                                  fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/`+UserId+`/MealPlan`, {
                                  	method: 'GET',
                                  	headers : {
                                  		'Content-Type': 'application/json',
                                  		'Accept': 'application/json'
                                      },

                                  })
                                      .then(
                                          function(apiResponse) {
                                              if (apiResponse.status !== 200) {
                                                  console.log('Looks like there was a problem. Status Code: ' +
                                                      response.status);
                                                  displayError();
                                                  return;
                                              } else {
                                                  // Examine the text in the response
                                                  apiResponse.json().then(function(data) {
                                                      setResponse(data);
                                                      // Login successful, redirect to MealPreferences
                                                      navigation.navigate("MealPreferences", { UserID: data.UserID, token: data.token });
                                                  });
                                              }
                                          }
                                      )
                                      .catch(function(err) {
                                          console.log('Fetch Error :-S', err);
                                      });



            }

     function deleteAccount() {


          setResponse({ UserId: "", name: "", email: "" });
                            // Login Route
                            fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/`+UserId, {
                            	method: 'GET',
                            	headers : {
                            		'Content-Type': 'application/json',
                            		'Accept': 'application/json'
                                },

                            })
                                .then(
                                    function(apiResponse) {
                                        if (apiResponse.status !== 200) {
                                            console.log('Looks like there was a problem. Status Code: ' +
                                                response.status);
                                            displayError();
                                            return;
                                        } else {
                                            // Examine the text in the response
                                            apiResponse.json().then(function(data) {
                                                setResponse(data);
                                                // Login successful, redirect to MealPreferences
                                                navigation.navigate("MealPreferences", { UserID: data.UserID, token: data.token });
                                            });
                                        }
                                    }
                                )
                                .catch(function(err) {
                                    console.log('Fetch Error :-S', err);
                                });
    }

    return (
         <View
             style={{
                flex: 1,
             }}

         >

            <View
                style={ styles.profileHeader

                }
            >
                <View
                    style={ styles.backImage }

                >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <TouchableOpacity active = { .5 } onPress={() => setModalVisible(!modalVisible) }>
                                    <Image
                                        style={ styles.backImage }
                                             source={require('../../resources/back.png')}
                                    />
                                </TouchableOpacity >
                                <Text style={styles.modalText}>Set new name</Text>


                                <TextInput style={ styles.textEnter } onChangeText={(name) => setName(name)} />
                                <View
                                    style={
                                        styles.modalLine
                                    }
                                />
                                </View>
                            </View>
                    </Modal>


                    <TouchableOpacity active = { .5 } onPress={() => alert("Image Clicked") }>
                        <Image
                             style={ styles.backImage }
                             source={require('../../resources/back.png')}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={ styles.profileWord }>Profile</Text>
                <Text style={ styles.profileWord }>           </Text>
            </View>


                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",

                     }}
                >

                    <Image
                        style={ styles.profileImage }
                        source={require('../../resources/train.jpg')}
                    />
                </View>




                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={ styles.textNormal }>   {name} </Text>


                    <TouchableOpacity active = { .5 } onPress={() =>  setModalVisible(true) }>
                        <Image
                            style={ styles.editImage }
                            source={require('../../resources/edit.png')}
                        />
                    </TouchableOpacity>
                </View>


                <View
                    style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    }}
                >
                    <Text style={ styles.textNormal }>   {email} </Text>



                </View>


                <View
                    style={ styles.borderLine }
                />


                <View/>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >

                    <ModalDropdown style={ styles.textDrop } defaultValue={plan} textStyle={ styles.textDrop }  dropdownTextStyle={ styles.textNormal }
                    options={ plans } onSelect={ (plan) => setPlan((String(this.renderButtonText)))}/>




                </View>


                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={ styles.textNormal }>   Dining Dollars Left: ${ dollars } </Text>



                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible3}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible3);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                 <TouchableOpacity active = { .5 } onPress={() => setModalVisible3(!modalVisible3) }>

                                     <Image
                                        style={ styles.back }
                                        source={require('../../resources/back.png')}
                                     />
                                 </TouchableOpacity >
                                 <Text style={styles.modalText}>Current password: {password}</Text>
                                 <Text style={styles.modalText}>Set password</Text>

                                 <TextInput style={ styles.textEnter } onChangeText={(password) => setPassword(password)} />
                                <View
                                     style={
                                     styles.modalLine
                                      }
                                />

                                </View>
                            </View>
                        </Modal>
                    </View>

                    <View/>

                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                    >

                    <View
                      style={ styles.borderLine }
                    />
                        <Text style={ styles.textNormal}>Track Meals</Text>

                    <TouchableOpacity active = { .5 } onPress={() =>  setModalVisible3(true) }>
                        <Text style={ styles.textNormal}>Change Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity active = { .5 } onPress={() =>  setModalVisible4(true) }>

                        <Text style={ styles.textNormalRed}>Delete Account</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible4}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible4);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <TouchableOpacity active = { .5 } onPress={() => setModalVisible4(!modalVisible4) }>
                                    <Image
                                        style={ styles.back }
                                        source={require('../../resources/back.png')}
                                    />
                                </TouchableOpacity >
                                <Text style={styles.modalText}>Delete Account?</Text>

                                <TouchableOpacity active = { .5 } onPress={ () => resetEverything() } >
                                    <Text style={ styles.textNormalRed }> DELETE ACCOUNT </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>


                </View>





            </View>

    );
}

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

     dropdownText: {

            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            color: "black",
            fontSize: 17,

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
        fontSize: 14




    },

    textDrop: {
            color: "black",
            marginBottom: "3%",
            flexDirection: "row",
            fontSize: 14




        },

        textDropdown: {
                    color: "black",
                    marginLeft: "3%",
                    marginBottom: "%",
                    flexDirection: "row",





                },

    textEnter: {
            color: "black",
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

    modalLine: {
         borderBottomWidth: 1,
         borderBottomColor: 'grey',
         width: 200,



        },

    borderLine: {
             borderBottomWidth: 1,
             borderBottomColor: 'grey',
             width: 97900,
             marginBottom: "5%",
             paddingRight: "10%"



        },

    backImage: {
        width: 60,
        height: 60



        },

    profileImage: {
            width: 200,
            height: 200,
            marginBottom: "5%",
            alignItems: "center",
            borderRadius: 400 / 2,

        },

    modalText: {
                color: "black",
                marginBottom: "5%",

            },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
         shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },

});


export default ProfileManager;