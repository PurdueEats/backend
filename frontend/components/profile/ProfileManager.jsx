import React, { Component, useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Button, Item } from 'native-base';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import DropDownPicker from 'react-native-dropdown-picker';
import ReactRoundedImage from "react-rounded-image";
import { StackActions } from '@react-navigation/native';



function ProfileManager({route, navigation}) {
    const [modalName, setModalName] = useState(false);
    const [ModalPlan, setModalPlan] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const [name, setName] = useState('');
    const [nameNew, setNameNew] = useState('');
    const [passNew, setPassNew] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState('');
    const [planNew, setPlanNew] = useState('');
    const [dollars, setDollars] = useState('');
    const [password, setPassword] = useState('Password');
    const [swipes, setSwipes] = useState('');
    const plans = ['   Meal Plan: Boiler Flex Unlimited Plan 350', '   Meal Plan: Boiler Plan 2', '   Meal Plan: I will add the actual names in later'];

    const [response, setResponse] = useState({ userID: "", name: "", email: "" });
    const [mealResponse, setMealResponse] = useState({ userID: "", mealPlan: "", diningDollars: "", });

    const popAction = StackActions.pop();

    const [del, setDel] = useState(false);
    const [nam, setNam] = useState(false);
    const [plann, setPlann] = useState(false);
    const [pas, setPas] = useState(false);


    useEffect(() => {
        if (!del & !nam & !plann & !pas) {
            getAuth()
            getMealInfo()
        }
    });

    function handleNameExit() {
        setNam(true);
        if (name != nameNew) {
            setName(nameNew);
            putName(nameNew);
        }
        setModalName(!setModalName);
    }

    function handlePlanExit(newPlan) {
        setPlann(true);
        setModalPlan(!setModalPlan);
        sendMealPlan(newPlan);
    }
    function handlePassExit(password2) {
        setPas(true);
        setModalPassword(!setModalPassword);
        changePassword(password2);
    }

    function sendMealPlan(planNew) {
        // Send Meal Plan Route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/`+ route.params.UserID +`/MealPlan`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
            body: JSON.stringify({
                "MealPlanName": planNew
            })

        })
            .then(
                function(response) {
                    if (response.status === 200 & response.status === 201) {
                        // Successful POST
                        setPlann(false);
                    } else {
                        console.log('Meal like there was a problem. Status Code: ' +
                            response.status);
                        setPlann(false);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });

    }

    function resetEverything() {
        setName('');
        setEmail('');
        setDollars('');
        console.log(route.params.token);
    }

    // TODO add check for token expiration
    function tokenManager() {
    }

    // Gets login and Email
    function getAuth() {
        // Auth Route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/` + route.params.UserId + `/Auth`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
        })
        .then(
            function(response) {
                if (response.status !== 200 & response.status !== 201) {
                    console.log('Auth like there was a problem. Status Code: ' +
                                response.status);
                    navigation.navigate("Login");
                    return;
                } else {
                    // Set fields to correct values
                    response.json().then(function(data) {
                        setResponse(data);
                        setName(data.name);
                        setEmail(data.email);
                        setPassword(data.password);
                    });
                }
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    // Fetches Plan and Swipe information
    function getMealInfo() {
        // MealPlan Route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/` + route.params.UserID + `/MealPlan`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
        })
        .then(
            function(response) {
                if (response.status !== 200 & response.status !== 201) {
                    console.log('GetMeal like there was a problem. Status Code: ' +
                                response.status);
                    return;
                } else {
                    // Set Fields to correct values
                    response.json().then(function(data) {
                        setMealResponse(data);
                        setDollars(data.dining_dollar_amount);
                        setPlan(data.meal_plan_name);
                        setSwipes(data.meal_swipe_count);
                    });
                }
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    //deletes account
    function deleteAccount() {
        setDel(true);
        // Deletion route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/` + route.params.UserId, {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
        })
        .then(
            function(response) {
                if (response.status !== 200 & response.status !== 201) {
                    console.log('Delete like there was a problem. Status Code: ' +
                    response.status);
                    displayError();
                    return;
                } else {
                    // Navigates back to login
                    response.json().then(function(data) {
                        setResponse(data);
                        navigation.navigate("Login");
                    });
                }
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    // Set name route
    function putName(name2) {
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/`+ route.params.UserID +'/Auth', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
            body: JSON.stringify({
                "user_id": "" + route.params.UserID + "",
                "name": name2,
                "email": email,
                "password": ""
            })
        })
        .then(
            function(response) {
                if (response.status !== 200 & response.status !== 201) {
                    console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                    setNam(false);
                } else {
                    // Successful POST
                    setNam(false);
                 }
             }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    //change password route
    function changePassword(password2) {
        // Set name route
        fetch('https://purdueeats-304919.uc.r.appspot.com/Users/'+ route.params.UserID +'/Auth', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
            body: JSON.stringify({
                "user_id": "" + route.params.UserID + "",
                "name": name,
                "email": email,
                "password": password2
            })
        })
        .then(
            function(response) {
                if (response.status !== 200 & response.status !== 201) {
                    console.log('PutName like there was a problem. Status Code: ' +
                    response.status);
                    setPas(false);

                    return;
                } else {
                    // Examine the text in the response
                    console.log('password updated');
                    response.json().then(function(data) {
                    setResponse(data);
                    setPas(false);

                    });
                }
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    return (
        <View style={styles.viewFlex}>
            <Modal animationType="slide" transparent={true} visible={modalName}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalName(!modalName);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity active = { .5 } onPress={() =>  handleNameExit()}>
                            <Image style={ styles.backImage }  source={require('../../resources/back.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Set new name</Text>
                        <TextInput style={ styles.textEnter } onChangeText={(nameNew) => setNameNew(nameNew)} />
                        <View style={ styles.modalLine }/>
                    </View>
                </View>
            </Modal>
            <View style={ styles.profileHeader }>
                <View style={ styles.backImage }>
                    <TouchableOpacity active = { .5 } onPress={ () => navigation.dispatch(popAction) }>
                        <Image style={ styles.backImage } source={require('../../resources/back.png')}/>
                    </TouchableOpacity>
                </View>
                <Text style={ styles.profileWord }>Profile</Text>
                <Text style={ styles.profileWord }>           </Text>
            </View>
            <View style={ styles.viewCenter }>
                <Image style={ styles.profileImage } source={require('../../resources/train.jpg')}/>
            </View>

            <View style={styles.rowBetween}>
                <Text style={ styles.textNormal }>   {name} </Text>
                <TouchableOpacity active = { .5 } onPress={() =>  setModalName(true) }>
                    <Image style={ styles.editImage } source={require('../../resources/edit.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.rowBetween}>
                <Text style={ styles.textNormal }>   {email} </Text>
            </View>
            <View style={ styles.borderLine }/>
        <View/>
        <View style={styles.rowBetween}>
        <Text style={ styles.textNormal }>   {plan} </Text>
        <TouchableOpacity active = { .5 } onPress={() =>  setModalPlan(true) }>
            <Image style={ styles.editImage } source={require('../../resources/edit.png')}/>
        </TouchableOpacity>
        </View>
        <View style={styles.rowBetween}>
            <Text style={ styles.textNormal }>   Dining Dollars Left: ${ dollars } </Text>
        </View>
        <View style={styles.colBetween}/>
            <View style={styles.rowBetween}>
                <Text style={ styles.textNormal }>   Meal Swipes Left: { swipes } </Text>
                <Modal animationType="slide" transparent={true} visible={ModalPlan}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalName(!ModalPlan);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity active = { .5 } onPress={() => handlePlanExit(planNew) }>
                                <Image style={ styles.backImage } source={require('../../resources/back.png')}/>
                            </TouchableOpacity >
                            <DropDownPicker
                                items={[
                                    {label: '10 Meal Plan +100', value: '10 Meal Plan +100'},
                                    {label: '15 Meal Plan +450', value: '15 Meal Plan +450'},
                                    {label: '21 Meal Plan +250', value: '21 Meal Plan +250'},
                                    {label: '21 Meal Plan +500', value: '21 Meal Plan +500'},
                                ]}
                                containerStyle={{height: 40, width: 200}}
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => setPlanNew(item.value)}
                            />
                        </View>
                    </View>
                </Modal>
                <Modal animationType="slide" transparent={true} visible={modalPassword}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalName(!modalPassword);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity active = { .5 } onPress={() => handlePassExit(passNew) }>
                                <Image style={ styles.backImage } source={require('../../resources/back.png')}/>
                            </TouchableOpacity>
                            <Text style={styles.modalText}>Set password</Text>
                            <TextInput style={ styles.textEnter } onChangeText={(password2) => setPassNew(password2)} />
                            <View style={ styles.modalLine }/>
                        </View>
                    </View>
                </Modal>
            </View>
        <View style={styles.viewCenter}>
            <View style={ styles.borderLine }/>
                <TouchableOpacity active = { .5 } onPress={() =>  navigation.navigate("MealPreferences") }>
                    <Text style={ styles.textNormal}>Track Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>  setModalPassword(true) }>
                    <Text style={ styles.textNormal}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>  setModalDelete(true) }>
                    <Text style={ styles.textNormalRed}>Delete Account</Text>
                </TouchableOpacity>

                <Modal animationType="slide" transparent={true} visible={modalDelete}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalName(!modalDelete);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity active = { .5 } onPress={() => setModalDelete(!modalDelete) }>
                                <Image style={ styles.backImage } source={require('../../resources/back.png')}/>
                            </TouchableOpacity >
                            <Text style={styles.modalText}>Delete Account?</Text>
                            <TouchableOpacity active = { .5 } onPress={ () => deleteAccount() }>
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

    viewCenter: {
        alignItems: "center",
        justifyContent: "center",
    },

    viewFlex: {
        flex: 1,
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    colBetween: {
        flexDirection: "column",
        justifyContent: "space-between",
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
        marginLeft: "2%",
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
        elevation: 5,
        height: 350
    },

    modalViewPlan: {
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