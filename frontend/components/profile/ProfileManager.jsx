import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { Toast } from 'native-base';
import moment from 'moment';



function ProfileManager({route, navigation}) {
    const [modalName, setModalName] = useState(false);
    const [ModalPlan, setModalPlan] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalDining, setModalDining] = useState(false);

    const [name, setName] = useState('');
    const [nameNew, setNameNew] = useState('');
    const [passNew, setPassNew] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState('');
    const [planNew, setPlanNew] = useState('');
    const [dollars, setDollars] = useState('');
    const [password, setPassword] = useState('');
    const [swipes, setSwipes] = useState('');
    const [transact, setTransact] = useState('');
    const [add, setAdd] = useState('Add');
    const [sign, setSign] = useState('+');


    const [delBool, setDelBool] = useState(false);
    const [nameBool, setNameBool] = useState(false);
    const [planBool, setPlanBool] = useState(false);
    const [passwordBool, setPasswordBool] = useState(false);

    var moment = require('moment-timezone');
    var time = moment().tz('America/New_York').utcOffset("−05:00").format();

    useEffect(() => {
        if (!delBool && !nameBool && !planBool && !passwordBool) {
            getAuth()
            getMealInfo()
        }
    }, []);

    function handleNameExit() {
        setNameBool(true);
        if (name !== nameNew) {
            setName(nameNew);
            putName(nameNew);
        }
        setModalName(!setModalName);
    }

    function handlePlanExit(newPlan) {
        setPlanBool(true);
        setModalPlan(!setModalPlan);
        if (plan !== newPlan) {
            setPlan(newPlan);
            sendMealPlan(newPlan);
        }
    }
    function handlePassExit(password2) {
        setPasswordBool(true);
        setModalPassword(!setModalPassword);
        changePassword(password2);
    }

    function handleDiningExit(subtract) {
        setModalDining(!setModalDining);
        if (add == 'Add') {
            console.log("in here?")
            sendDiningDollars(0 - subtract);
        } else {
            console.log("in here?")

            sendDiningDollars(subtract);
        }
    }

    function handleAdd() {
        setAdd('Add');
        setSign('+');
    }

    function handleSub() {
        setAdd('Subtract');
        setSign('-');
    }

    function handleLogout() {
        if (!delBool && !nameBool && !planBool && !passwordBool) {
            navigation.navigate("Login")
        }
        else Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Wait for profile to update",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
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
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        setPlanBool(false);
                        getMealInfo();
                    } else {
                        console.log('Meal like there was a problem. Status Code: ' +
                            response.status);
                        setPlanBool(false);
                        getMealInfo();
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function sendDiningDollars(dollars2) {
        // Send Meal Plan Route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/`+ route.params.UserID +`/Trans`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
            body: JSON.stringify({
                "user_id": route.params.UserID,
                "transaction_amount": dollars2,
                "balance": dollars,
                "timestamp": time

            })

        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        console.log(dollars2);
                        setPlanBool(false);
                        getMealInfo();
                    } else {
                        console.log('Meal like there was a problem. Status Code: ' +
                            response.status);
                        console.log(dollars2);
                        setPlanBool(false);
                        getMealInfo();
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
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
                if (response.status === 200 || response.status === 201) {
                    // Successful GET
                    // Set fields to correct values
                    response.json().then(function(data) {
                        setName(data.name);
                        setEmail(data.email);
                        setPassword(data.password);
                    });
                } else {
                    console.log('Auth like there was a problem. Status Code: ' +
                        response.status);
                    navigation.navigate("Login");
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
                if (response.status === 200 || response.status === 201) {
                    // Successful GET
                    // Set Fields to correct values
                    response.json().then(function(data) {
                        setDollars(data.dining_dollar_amount);
                        setPlan(data.meal_plan_name);
                        setSwipes(data.meal_swipe_count);
                    });
                } else {
                    console.log('GetMeal like there was a problem. Status Code: ' +
                        response.status);
                }
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    //deletes account
    function deleteAccount() {
        setDelBool(true);
        // Deletion route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/` + route.params.UserID, {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
        })
        .then(
            function(response) {
                if (response.status === 200 || response.status === 201) {
                    // Successful DELETE
                    // Navigates back to login
                    navigation.navigate("Login");
                } else {
                    console.log('Delete like there was a problem. Status Code: ' +
                        response.status);
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
                if (response.status === 200 || response.status === 201) {
                    // Successful POST
                    setNameBool(false);
                } else {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    setNameBool(false);
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
                if (response.status === 200 || response.status === 201) {
                    // Successful POST
                    setPasswordBool(false);
                } else {
                    // Examine the text in the response
                    console.log('PutName like there was a problem. Status Code: ' +
                        response.status);
                    setPasswordBool(false);
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
                    setModalName(!modalName);
                }}
            >
                <View>
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
            <Modal animationType="slide" transparent={true} visible={modalDining}
                onRequestClose={() => {
                    setModalDining(!modalDining);
                }}
            >
                <View>
                    <View style={styles.modalView}>
                        <TouchableOpacity active = { .5 } onPress={() =>  handleDiningExit(transact)}>
                            <Image style={ styles.backImage } source={require('../../resources/back.png')}/>
                        </TouchableOpacity>
                        <View style={styles.rowBetween}>
                            <TouchableOpacity active = { .5 } onPress={() =>  handleSub()}>
                                <Image style={ styles.backImage } source={require('../../resources/minus.png')}/>
                            </TouchableOpacity>
                            <Text style={styles.modalText}>                </Text>
                            <TouchableOpacity active = { .5 } onPress={() =>  handleAdd()}>
                                <Image style={ styles.backImage } source={require('../../resources/add.png')}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.dollarsText}>How many dollars?</Text>
                        <View style={styles.rowBetween}>
                            <Text style={styles.big}>{sign}</Text>
                            <TextInput style={ styles.textEnter } onChangeText={(transact) => setTransact(transact)} />
                        </View>
                        <View style={ styles.modalLine }/>
                    </View>
                </View>
            </Modal>

            <View style={ styles.profileHeader }>
                <View style={ styles.backImage }>
                    <Text style={ styles.profileWord }>           </Text>
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
            <TouchableOpacity active = { .5 } onPress={() =>  setModalDining(true) }>
                <Image style={ styles.editImage } source={require('../../resources/edit.png')}/>
            </TouchableOpacity>
        </View>
        <View style={styles.colBetween}/>
            <View style={styles.rowBetween}>
                <Text style={ styles.textNormal }>   Meal Swipes Left: { swipes } </Text>
                <Modal animationType="slide" transparent={true} visible={ModalPlan}
                    onRequestClose={() => {
                        setModalPlan(!ModalPlan);
                    }}
                >
                    <View>
                        <View style={styles.modalView}>
                            <TouchableOpacity active = { .5 } onPress={() => handlePlanExit(planNew) }>
                                <Image style={ styles.backImage } source={require('../../resources/back.png')}/>
                            </TouchableOpacity>
                            <DropDownPicker
                                items={[
                                    {label: '10 Meal Plan + 100', value: '10 Meal Plan +100'},
                                    {label: '15 Meal Plan + 450', value: '15 Meal Plan +450'},
                                    {label: '21 Meal Plan + 250', value: '21 Meal Plan +250'},
                                    {label: '21 Meal Plan + 500', value: '21 Meal Plan +500'},
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
                        setModalName(!modalPassword);
                    }}
                >
                    <View>
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
                <TouchableOpacity active = { .5 } onPress={() =>
                    navigation.navigate("Track") }>
                    <Text style={ styles.textNormal}>Track Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>  setModalPassword(true) }>
                    <Text style={ styles.textNormal}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>
                    navigation.navigate("EditSchedule", { UserID: route.params.UserID, token: route.params.token }) }>
                    <Text style={ styles.textNormal}>Change Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>  setModalDelete(true) }>
                    <Text style={ styles.textNormalRed}>Delete Account</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={ () => handleLogout() }>
                    <Text style={ styles.textNormal }>Logout</Text>
                </TouchableOpacity>

                <Modal animationType="slide" transparent={true} visible={modalDelete}
                    onRequestClose={() => {
                        setModalName(!modalDelete);
                    }}
                >
                    <View>
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
        width: "60%",
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
    dollarsText: {
        color: "black",
        marginBottom: "1%",

        },

    big: {
        color: "black",
        fontSize: 20,
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
