import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { Toast } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from "expo-secure-store";

function ProfileManager({route, navigation}) {
    const { colors } = useTheme();
    // Setup re-render on focus change
    const isFocused = useIsFocused();

    // Modal attributes
    const [modalName, setModalName] = useState(false);
    const [ModalPlan, setModalPlan] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalDining, setModalDining] = useState(false);
    const [modalSwipes, setModalSwipes] = useState(false);

    // Settings attributes
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
    const [add, setAdd] = useState('Subtract');
    const [sign, setSign] = useState('+');

    // Booleans for checking if a post is in progress
    const [delBool, setDelBool] = useState(false);
    const [nameBool, setNameBool] = useState(false);
    const [planBool, setPlanBool] = useState(false);
    const [passwordBool, setPasswordBool] = useState(false);
    const [dollarsBool, setDollarsBool] = useState(false);
    const [swipesBool, setSwipesBool] = useState(false);

    const [picture, setPicture] = useState(null);
    // Timestamp fields
    var moment = require('moment-timezone');
    var time = moment().tz('America/New_York').utcOffset("−05:00").format();

    useEffect(() => {
        if (isFocused) {
            if (!delBool && !nameBool && !planBool && !passwordBool && !dollarsBool && !swipesBool) {
                getAuth()
                getMealInfo()
                getProfilePicture()
            }
        }
    }, [isFocused]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    function handleNameExit() {
        setModalName(!setModalName);
        if (!delBool && !nameBool && !planBool && !passwordBool && !swipesBool && !dollarsBool) {
            if (name !== nameNew) {
                setNameBool(true);
                setName(nameNew);
                putName(nameNew);
            }
        } else {
            Toast.show({
                style: { backgroundColor: "red", justifyContent: "center" },
                position: "top",
                text: "Wait for information to update",
                textStyle: {
                    textAlign: 'center',
                },
                duration: 3000

            });
        }
    }

    function handlePlanExit(newPlan) {
        setModalPlan(!setModalPlan);
        if (!delBool && !nameBool && !planBool && !passwordBool && !swipesBool && !dollarsBool) {
            setPlanBool(true);
            if (plan !== newPlan) {
                setPlan(newPlan);
                sendMealPlan(newPlan);
            }
        } else {
            Toast.show({
                style: { backgroundColor: "red", justifyContent: "center" },
                position: "top",
                text: "Wait for information to update",
                textStyle: {
                    textAlign: 'center',
                },
                duration: 3000
            });


        }
    }

    function handlePassExit(password2) {
        if (!delBool && !nameBool && !planBool && !passwordBool && !swipesBool && !dollarsBool) {
            setPasswordBool(true);
            setModalPassword(!setModalPassword);
            changePassword(password2);
        }
        else {
            Toast.show({
                style: { backgroundColor: "red", justifyContent: "center" },
                position: "top",
                text: "Wait for information to update",
                textStyle: {
                    textAlign: 'center',
                },
                duration: 3000
            });
        }
    }

    function handleDiningExit(subtract) {
        setModalDining(!setModalDining);
        if (!delBool && !nameBool && !planBool && !passwordBool && !dollarsBool && !swipesBool) {

            if (add === 'Add') {
                if ((dollars + subtract) > 999999999) {
                    Toast.show({
                        style: { backgroundColor: "red", justifyContent: "center" },
                        position: "top",
                        text: "Too many dining dollars to add",
                        textStyle: {
                            textAlign: 'center',
                        },
                        duration: 3000
                    });
                    return

                }
                setDollarsBool(true);
                sendDiningDollars(0 - subtract);
            } else {
                if ((dollars - subtract) < 0) {
                    Toast.show({
                        style: { backgroundColor: "red", justifyContent: "center" },
                        position: "top",
                        text: "Invalid dollar subtraction amount",
                        textStyle: {
                            textAlign: 'center',
                        },
                        duration: 3000
                    });
                    return;
                }
                setDollarsBool(true);
                sendDiningDollars(subtract);
            }
        } else {
            Toast.show({
                style: { backgroundColor: "red", justifyContent: "center" },
                position: "top",
                text: "Wait for information to update",
                textStyle: {
                    textAlign: 'center',
                },
                duration: 3000
            });
        }
    }

    function handleSwipesSub() {
        setModalSwipes(!setModalSwipes);
        if (!delBool && !nameBool && !planBool && !passwordBool && !dollarsBool && !swipesBool) {

            if (swipes > 0) {
                setSwipesBool(true);
                useSwipe();
            } else {
                Toast.show({
                    style: { backgroundColor: "red", justifyContent: "center" },
                    position: "top",
                    text: "You are already out of swipes for the week",
                    textStyle: {
                        textAlign: 'center',
                    },
                    duration: 3000
                });
            }
        } else {
            Toast.show({
                style: { backgroundColor: "red", justifyContent: "center" },
                position: "top",
                text: "Wait for information to update",
                textStyle: {
                    textAlign: 'center',
                },
                duration: 3000
            });
        }

    }

    function handleSwipesExit(subtract) {
        setModalSwipes(!setModalSwipes);
    }

    function handleAdd() {
        setAdd('Add');
        setSign('+');
    }

    function handleSub() {
        setAdd('Subtract');
        setSign('-');
    }

    // Start logout functions
    function handleLogout() {
        if (!delBool && !nameBool && !planBool && !passwordBool && !swipesBool && !dollarsBool) {
            clearCredentials();
            navigation.navigate("Login");
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

    async function clearCredentials() {
        try {
            await SecureStore.deleteItemAsync('UserID', null);
            await SecureStore.deleteItemAsync('token', null);
        } catch (error) {
            // Error saving data
        }
    }
    // End logout functions

    function sendMealPlan(planNew) {
        // Send Meal Plan Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/`+ route.params.UserID +`/MealPlan`, {
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
                        setPlanBool(false);
                        getMealInfo();
                    }
                }
            )
            .catch(function(err) {
            });
    }

    function sendDiningDollars(dollars2) {
        // Send Meal Plan Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/`+ route.params.UserID +`/Trans`, {
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
                        setDollarsBool(false);
                        getMealInfo();
                    } else {
                        setDollarsBool(false);
                        getMealInfo();
                    }
                }
            )
            .catch(function(err) {
            });
    }

    function useSwipe() {
        // Send Meal Plan Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/`+ route.params.UserID +`/MealSwipe`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        setSwipesBool(false);
                        getMealInfo();
                    } else {
                        setSwipesBool(false);
                        getMealInfo();
                    }
                }
            )
            .catch(function(err) {
            });
    }

    // Gets login and Email
    function getAuth() {
        // Auth Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + route.params.UserId + `/Auth`, {
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
                        navigation.navigate("Login");
                    }
                }
            )
            .catch(function(err) {
            });
    }

    // Fetches Plan and Swipe information
    function getMealInfo() {
        // MealPlan Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + route.params.UserID + `/MealPlan`, {
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
                    }
                }
            )
            .catch(function(err) {
            });
    }

    //deletes account
    function deleteAccount() {
        setDelBool(true);
        // Deletion route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + route.params.UserID, {
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
                    }
                }
            )
            .catch(function(err) {
            });
    }

    // Set name route
    function putName(name2) {
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/`+ route.params.UserID +'/Auth', {
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
                        setNameBool(false);
                    }
                }
            )
            .catch(function(err) {
            });
    }

    //change password route
    function changePassword(password2) {
        // Set name route
        fetch('https://app-5fyldqenma-uc.a.run.app/Users/'+ route.params.UserID +'/Auth', {
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
                        setPasswordBool(false);
                    }
                }
            )
            .catch(function(err) {        });
    }

    const pickProfilePicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            setPicture(result.base64);
            submitProfilePicture(result.base64.toString());
        }
    };

    function getProfilePicture() {
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + route.params.UserID + `/ProfilePic`, {
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
                            setPicture(data["profile_pic"]);
                        });
                    } else {
                        console.log('Looks like there was a problem with getting the picture. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function submitProfilePicture(directString) {
        // Submit current schedule data
        fetch('https://app-5fyldqenma-uc.a.run.app/Users/'+ route.params.UserID +'/ProfilePic', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
            body: JSON.stringify({
                "user_id": route.params.UserID,
                "profile_pic": directString
            })
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        displayConfirmation();
                    } else {
                        // Examine the text in the response
                        console.log('Looks like there was a problem submitting the picture. Status Code: ' +
                            response.status);
                        displayError();
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function displayConfirmation() {
        Toast.show({
            style: { backgroundColor: "green", justifyContent: "center" },
            position: "top",
            text: "Profile picture successfully updated.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Profile Picture upload failed. Please try again.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }


    return (
        <ScrollView style={styles.viewFlex}>
            <Modal animationType="slide" transparent={true} visible={modalName}
                   onRequestClose={() => {
                       setModalName(!modalName);
                   }}
            >
                <View>
                    <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                        <TouchableOpacity active={0.5} style={ styles.backImage } onPress={() =>  handleNameExit()}>
                            <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                        </TouchableOpacity>
                        <Text style={ [styles.modalText, {color: colors.text}] }>Set new name</Text>
                        <TextInput style={ [styles.textEnter, {color: colors.text}] } onChangeText={(nameNew) => setNameNew(nameNew)} />
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
                    <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                        <TouchableOpacity active={0.5} style={ styles.backImage } onPress={() =>  handleDiningExit(transact)}>
                            <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                        </TouchableOpacity>
                        <View style={styles.rowBetween}>
                            <TouchableOpacity active={0.5} style={ styles.symbolStyle } onPress={() =>  handleSub()}>
                                <MaterialCommunityIcons name="minus" color="white" size={30}/>
                            </TouchableOpacity>
                            <Text style={ [styles.modalText, {color: colors.text}] }>                </Text>
                            <TouchableOpacity active={0.5} style={ styles.symbolStyle } onPress={() =>  handleAdd()}>
                                <MaterialCommunityIcons name="plus" color="white" size={30}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={ [styles.dollarsText, {color: colors.text}]}>How many dollars?</Text>
                        <View style={styles.rowBetween}>
                            <Text style={ [styles.big, {color: colors.text}]}>{sign}</Text>
                            <TextInput style={ [styles.textEnter, {color: colors.text}]} onChangeText={(transact) => setTransact(transact)} />
                        </View>
                        <View style={ styles.modalLine }/>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={modalSwipes}
                   onRequestClose={() => {
                       setModalSwipes(!modalSwipes);
                   }}
            >
                <View>
                    <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                        <TouchableOpacity active={0.5} style={ styles.backImage } onPress={() =>  handleSwipesExit()}>
                            <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                        </TouchableOpacity>
                        <Text style={ [styles.dollarsText, {color: colors.text}]}>Subtract a swipe from your total?</Text>
                        <TouchableOpacity active={0.5} style={ styles.symbolStyleBig }  onPress={() =>  handleSwipesSub()}>
                            <MaterialCommunityIcons name="minus" color="white" size={30}/>
                        </TouchableOpacity>
                        <View style={styles.rowBetween}>

                        </View>
                    </View>
                </View>
            </Modal>
            <View style={ styles.profileHeader }>
                <Text style={ [styles.profileWord, {color: colors.text}] }>Profile</Text>
            </View>
            <View style={ styles.viewCenter }>
                <Image style={ styles.profileImage } defaultSource={require('../../resources/train.jpg')} source={{uri: 'data:image/jpeg;base64,' + picture}}
                />
            </View>
            <View style={styles.rowBetween}>
                <Text style={ [styles.textNormal, {color: colors.text}] }>   {name} </Text>
                <TouchableOpacity active = { .5 } onPress={() =>  setModalName(true) }>
                    <Image style={ styles.editImage } source={require('../../resources/edit.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.rowBetween}>
                <Text style={ [styles.textNormal, {color: colors.text}] }>   {email} </Text>
            </View>
            <View style={ styles.borderLine }/>
            <View/>
            <View style={styles.rowBetween}>
                <Text style={ [styles.textNormal, {color: colors.text}] }>   {plan} </Text>
                <TouchableOpacity active = { .5 } onPress={() =>  setModalPlan(true) }>
                    <Image style={ styles.editImage } source={require('../../resources/edit.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.rowBetween}>
                <Text style={ [styles.textNormal, {color: colors.text}] }>   Dining Dollars Left: ${ dollars } </Text>
                <TouchableOpacity active = { .5 } onPress={() =>  setModalDining(true) }>
                    <Image style={ styles.editImage } source={require('../../resources/edit.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.colBetween}/>
            <View style={styles.rowBetween}>
                <Text style={ [styles.textNormal, {color: colors.text}] }>   Meal Swipes Left: { swipes } </Text>
                <View style={styles.rowBetween}>
                    <TouchableOpacity active = { .5 } onPress={() =>  setModalSwipes(true) }>
                        <Image style={ styles.editImage } source={require('../../resources/edit.png')}/>
                    </TouchableOpacity>
                </View>
                <Modal animationType="slide" transparent={true} visible={ModalPlan}
                       onRequestClose={() => {
                           setModalPlan(!ModalPlan);
                       }}
                >
                    <View>
                        <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                            <TouchableOpacity active={0.5} style={ styles.backImage } onPress={() => handlePlanExit(planNew) }>
                                <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
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
                        <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                            <TouchableOpacity active={0.5} style={ styles.backImage } onPress={() => handlePassExit(passNew) }>
                                <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                            </TouchableOpacity>
                            <Text style={ [styles.modalText, {color: colors.text}]}>Set password</Text>
                            <TextInput style={ [styles.textEnter, {color: colors.text}]} onChangeText={(password2) => setPassNew(password2)} />
                            <View style={ styles.modalLine }/>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.viewCenter}>
                <View style={ styles.borderLine }/>
                <TouchableOpacity active = { .5 } onPress={() =>
                    navigation.navigate("SemesterSummary", { UserID: route.params.UserID, token: route.params.token }) }>
                    <Text style={ [styles.textNormal, {color: colors.text}] }>View Semester Summary</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>
                    navigation.navigate("Track", { UserID: route.params.UserID, token: route.params.token }) }>
                    <Text style={ [styles.textNormal, {color: colors.text}] }>Track Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>  navigation.navigate("FavoriteMeal", { UserID: route.params.UserID, token: route.params.token }) }>
                    <Text style={ [styles.textNormal, {color: colors.text}] }>Favorite Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>  setModalPassword(true) }>
                    <Text style={ [styles.textNormal, {color: colors.text}] }>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>  pickProfilePicture() }>
                    <Text style={ [styles.textNormal, {color: colors.text}] }>Change Profile Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>
                    navigation.navigate("EditSchedule", { UserID: route.params.UserID, token: route.params.token }) }>
                    <Text style={ [styles.textNormal, {color: colors.text}] }>Change Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={() =>  setModalDelete(true) }>
                    <Text style={ styles.textNormalRed }>Delete Account</Text>
                </TouchableOpacity>
                <TouchableOpacity active = { .5 } onPress={ () => handleLogout() }>
                    <Text style={ [styles.textNormal, {color: colors.text}] }>Logout</Text>
                </TouchableOpacity>

                <Modal animationType="slide" transparent={true} visible={modalDelete}
                       onRequestClose={() => {
                           setModalName(!modalDelete);
                       }}
                >
                    <View>
                        <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                            <TouchableOpacity active={0.5} style={ styles.backImage } onPress={() => setModalDelete(!modalDelete) }>
                                <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                            </TouchableOpacity >
                            <Text style={ [styles.modalText, {color: colors.text}]}>Delete Account?</Text>
                            <TouchableOpacity active = { .5 } onPress={ () => deleteAccount() }>
                                <Text style={ styles.textNormalRed }> DELETE ACCOUNT </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
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
        marginBottom: "5%",
        alignItems: "center",
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
        marginTop: "2%",
        marginBottom: "2%",
        color: "black"
    },

    big: {
        color: "black",
        fontSize: 20,
    },

    modalView: {
        margin: 20,
        borderRadius: 20,
        backgroundColor: "white",
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
        height: 350,
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

    symbolStyle: {
        height: 30,
        width: 30,
        backgroundColor: 'red',
        color: 'white',

    },

    symbolStyleBig: {
        marginTop: "10%",
        height: 30,
        width: 30,
        backgroundColor: 'red',
        color: 'white',

    },

});

export default ProfileManager;
