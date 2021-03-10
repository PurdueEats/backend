import React, { useState, useEffect } from "react";
import {Image, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import Logo from "../../resources/logo.png";
import { Button, Item, Toast } from 'native-base';

function LoginManager({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Add use effect to clear email and password on re-render

    function tokenManager() {
        // TODO add check for token expiration
    }
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
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/Login`, {
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
                            // Login successful, redirect to MealPreferences
                            navigation.navigate("MealReview", { UserID: data.UserID, token: data.token });
                        });
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function handleForgotPassword() {
        navigation.navigate("ForgotPassword")
    }

    function handleSignUp() {
        navigation.navigate("Name")
    }

    return (
        <ScrollView>
            <View style={ styles.iconPosition }>
                <Image source = { Logo } />
                <Text style={ styles.appName }>PurdueEats</Text>
            </View>
            <View style={ styles.content }>
                <Text style={ styles.signInContent }>Sign In</Text>
                <Text style={ styles.sectionHeader }>Email</Text>
                <Item style={ styles.emailContent }>
                    <TextInput style={ styles.textInput } onChangeText={(email) => setEmail(email)} />
                </Item>
                <Text style={ styles.sectionHeader }>Password</Text>
                <Item style={ styles.passwordContent }>
                    <TextInput style={ styles.textInput } secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
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
        </ScrollView>
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
