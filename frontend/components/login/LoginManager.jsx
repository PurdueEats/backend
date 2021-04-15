import React, {useEffect, useState} from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Button, Item, Toast } from 'native-base';
import Logo from "../../resources/logo.png";

function LoginManager({navigation}) {
    const { colors } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
       retrieveData();
    }, []);

    // Start Login Persistence
    async function retrieveData() {
        try {
            const userID = await SecureStore.getItemAsync('UserID');
            const token = await SecureStore.getItemAsync('token');
            // If credentials are stored
            if (userID !== null && token !== null) {
                // Dummy fetch to check token
                fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + userID + `/Auth`, {
                    method: 'GET',
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                })
                    .then(
                        function(response) {
                            if (response.status === 200 || response.status === 201) {
                                // Successful GET, display welcome and redirect to home
                                response.json().then(function(data) {
                                    displayWelcome(data.name);
                                });
                                navigation.navigate("NavBar", { UserID: userID, token: token });
                            } else {
                                console.log('Expired token. Status Code: ' + response.status);
                                displayTokenExpiration();
                            }
                        }
                    )
                    .catch(function(err) {
                        console.log('Fetch Error :-S', err);
                    });
            } else {
                // No credentials, do nothing
                console.log("No found credentials.")
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    function displayWelcome(name) {
        Toast.show({
            style: { backgroundColor: "green", justifyContent: "center" },
            position: "top",
            text: "Welcome back, " + name + ".",
            textStyle: {
                textAlign: 'center',
            },
            duration: 2000
        });
    }

    function displayTokenExpiration() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Your sign in has expired. Please sign in again.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 2000
        });
    }

    async function storeData(UserID, token) {
        try {
            await SecureStore.setItemAsync('UserID', UserID);
            await SecureStore.setItemAsync('token', token);
        } catch (error) {
            // Error saving data
        }
    }
    // End Login Persistence

    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Incorrect username/password combination.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    function handleLogin() {
        // Login Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/Login`, {
        	method: 'POST',
        	headers : {
        		'Content-Type': 'application/json',
        		'Accept': 'application/json'
            },
            body: JSON.stringify({
                "user_id": "0",
                "name": "string",
                "email": email,
                "password": password
            })
        })
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        displayError();
                    } else {
                        // Examine the text in the response
                        response.json().then(function(data) {
                            // Login successful, store & redirect to MealPreferences
                            storeData(data.UserID, data.token);
                            navigation.navigate("MealPreferences", { UserID: data.UserID, token: data.token });
                        });
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function handleForgotPassword() {
        navigation.navigate("ForgotPassword");
    }

    function handleSignUp() {
        navigation.navigate("Name");
    }

    return (
        <View>
            <View style={ styles.iconPosition }>
                <Image source = { Logo } />
                <Text style={ [styles.appName, {color: colors.text}] }>PurdueEats</Text>

            </View>
            <View style={ styles.content }>
                <Text style={ [styles.signInContent, {color: colors.text}] }>Sign In</Text>
                <Text style={ styles.sectionHeader }>Email</Text>
                <Item style={ styles.emailContent }>
                    <TextInput style={ [styles.textInput, {color: colors.text}] } onChangeText={(email) => setEmail(email)} />
                </Item>
                <Text style={ styles.sectionHeader }>Password</Text>
                <Item style={ styles.passwordContent }>
                    <TextInput style={ [styles.textInput, {color: colors.text}] } secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
                </Item>
            </View>
            <View style={ styles.buttons }>
                <Button style={ styles.signInButton } onPress={ handleLogin }>
                        <Text style={ styles.signInText }>Sign In</Text>
                </Button>
                <View style={ styles.optionText }>
                    <View>
                        <TouchableOpacity onPress={ handleForgotPassword }>
                            <Text style={ styles.forgotPasswordText } >Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={ handleSignUp }>
                            <Text style={ styles.signUpText }>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    iconPosition: {
        paddingTop: "12%",
        marginBottom: "5%",
        alignItems: "center"
    },
    appName: {
        fontSize: 35,
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
        fontWeight: "bold"
    },
    textInput: {
        width: "100%",
        height: 40
    },
    emailContent: {
        marginBottom: "10%",
        height: 40
    },
    passwordContent: {
        height: 40,
        marginBottom: "5%"
    },
    buttons: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    signInButton: {
        width: '100%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    signInText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    forgotPasswordText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "gray",
        alignItems: "center",
        paddingTop: "8%",
        paddingBottom: "8%",
    },
    signUpText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "red",
        alignItems: "center",

    },
    optionText: {
        alignItems: "center"
    }
});

export default LoginManager;
