import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import {Button, Item, Toast} from 'native-base';

function Password({route, navigation}) {
    const [password, setPassword] = useState('');

    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "There was an issue registering your account, please change your name, email, or password.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    function registerUser() {
        // Register Route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/Register`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "user_id": 0,
                "name": route.params.name,
                "email": route.params.email,
                "password": password
            })
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        navigation.navigate("MealPlan", { email: route.params.email, password: password })
                    } else {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        displayError();
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    return (
        <SafeAreaView style={ styles.screen }>
            <Text style={ styles.questionTitle }>Enter your password.</Text>
            <Text style={ styles.detailsTitle }>Passwords must be at least 6 characters long.</Text>
            <Item style={ styles.passwordInput }>
                <TextInput style={ styles.textInput } secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
            </Item>
            <Button style={ styles.continueButton } onPress={ registerUser }>
                <Text style={ styles.continueText }>Continue</Text>
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen:{
        paddingTop: "50%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "12%"
    },
    questionTitle: {
        fontSize: 25,
        fontWeight: "bold",
        paddingBottom: "2%"
    },
    detailsTitle: {
        fontSize: 18,
    },
    textInput: {
        width: "100%",
        height: 40
    },
    passwordInput: {
        marginBottom: "10%",
        marginTop: "20%",
        height: 40
    },
    continueButton: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "red",
        borderRadius: 10
    },
    continueText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
});

export default Password;
