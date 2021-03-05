import React, { Component, useState } from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Button, Item } from 'native-base';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';








function ProfileManager({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);

    const [name, setName] = useState('Eric Thompson');
    const [email, setEmail] = useState('email@email.email');
    const [plan, setPlan] = useState('Boiler Flex Unlimited 350');
    const [dollars, setDollars] = useState('200');

    function resetEverything() {
        setName('');
        setEmail('');
        setDollars('');


    }

    const plans = ['Boiler Flex Unlimited Plan 350', 'Boiler Plan 2', 'I will add the actual names in later'];



    // TODO add check for token expiration
    function tokenManager() {

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
                        style={{ width: 40, height: 40}}

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
                                                                            style={{ width: 40, height: 40,  }}
                                                                            source={require('../../resources/arrow.png')}
                                                                        />
                                                                    </TouchableOpacity >
                                          <Text style={styles.modalText}>Set new name</Text>


                                             <TextInput style={ styles.textEnter } onChangeText={(name) => setName(name)} />
                                             <View
                                                                                   style={{
                                                                                     borderBottomWidth: 1,
                                                                                     borderBottomColor: 'grey',
                                                                                     width: 200,
                                                                                   }}
                                                                                 />
                                        </View>
                                      </View>
                        </Modal>


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
                                      style={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: 'grey',
                                        width: 97900,
                                        marginBottom: "3%",
                                      }}
                                    />


                    <View/>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >

                        <ModalDropdown style={ styles.textDropdown } defaultValue={plan} textStyle={ styles.textNormal }  dropdownTextStyle={ styles.dropdownText }
                        options={ plans } onSelect={ (plan) => setPlan((String(this.renderButtonText)))}/>




                    </View>


                    <View
                        style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        }}
                    >
                        <Text style={ styles.textNormal }>   Dining Dollars Left: ${ dollars } </Text>


                    </View>

                    <View/>

                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                    >

                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                        width: 97900,
                        marginBottom: "5%",
                      }}
                    />
                        <Text style={ styles.textNormal}>Track Meals</Text>
                        <Text style={ styles.textNormal}>Change Password</Text>

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
                                                                                                style={{ width: 40, height: 40,  }}
                                                                                                source={require('../../resources/arrow.png')}
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
        fontSize: 16




    },

    textNormal: {
            color: "black",
            marginBottom: "5%",
            flexDirection: "row",




        },

        textDropdown: {
                    color: "black",
                    marginLeft: "3%",
                    marginBottom: "5%",
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

    profileImage: {
            width: 200,
            height: 200,
            marginBottom: "5%",
            alignItems: "center",

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