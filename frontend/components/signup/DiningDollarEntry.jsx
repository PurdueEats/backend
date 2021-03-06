import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import { Button, Item, Toast } from 'native-base';

function DiningDollarEntry({route, navigation}) {
    const [diningDollars, setDiningDollars] = useState('');
    const [response, setResponse] = useState('');

    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "There was an issue registering your account, please change your data.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    function handleSignUp() {
        // Login Route
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
                "password": route.params.password
            })
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Login successful, redirect to MealPreferences
                        navigation.navigate("Login")
                    } else {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        displayError();
                        console.log(response.json())
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function(data) {
                        console.log(data);
                        setResponse(data);
                    });
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
            <Button style={ styles.signUpButton } onPress={ handleSignUp }>
                <Text email style={ styles.signUpText }>Sign Up!</Text>
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
