import React, {Component, useState} from "react";
import {StyleSheet, SafeAreaView, Text, TextInput, ScrollView, View, Image, TouchableOpacity} from "react-native";
import {Button, Item, Toast} from 'native-base';

function DiningDollarEntry({navigation}) {
    const [diningDollars, setDiningDollars] = useState('');
    const [response, setResponse] = useState('');

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

    function handleSignUp() {
        // setResponse({  });
        // Login Route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Login`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                // TODO edit body
                // "user_id": 0,
                // "name": "string",
                // "email": email,
                // "password": password
            })
        })
            .then(
                function(response) {
                    // all fails are 400s 200s are success
                    if (/*response.status !== 200 ||*/ response.status !== 201) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        displayError();
                        return;
                    } else {
                        // Login successful, redirect to MealPreferences
                        navigation.navigate("MealPreferences")
                    }

                    // // Examine the text in the response
                    // response.json().then(function(data) {
                    //     console.log(data);
                    //     setResponse(data);
                    // });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    return (
        <SafeAreaView style={ styles.screen }>
            <Text style={ styles.questionTitle }>Enter the number of dining dollars you have.</Text>
            <Item style={ styles.diningInput }>
                <TextInput style={ styles.textInput } onChangeText={(diningDollars) => setDiningDollars(diningDollars)} />
            </Item>
            <Button style={ styles.signUpButton }>
                <Text style={ styles.signUpText } onPress={storeDiningDollars()}>Sign Up!</Text>
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
    },
    textInput: {
        width: "100%",
        height: 40
    },
    diningInput: {
        marginBottom: "10%",
        marginTop: "20%",
        height: 40
    },
    signUpButton: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "red",
        borderRadius: 10
    },
    signUpText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
});

export default DiningDollarEntry;