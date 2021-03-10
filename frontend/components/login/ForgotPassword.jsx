import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import {Button, Item, Toast} from 'native-base';

function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('');

    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "There was an issue reseting your password.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 3000
        });
    }

    function forgotPassword(email2) {
        // Register Route
        console.log(email2);
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/ForgotPassword?email=` + email2, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        console.log('worked');
                        navigation.navigate("Login")
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
        <SafeAreaView style={ [styles.screen, {flexDirection:"column"}] }>
            <Text style={ styles.questionTitle }>Enter your email.</Text>
            <Item style={ styles.emailInput }>
                <TextInput style={ styles.textInput } onChangeText={(email) => setEmail(email)} />
            </Item>
            <Button style={ styles.continueButton } onPress={ () => forgotPassword(email) }>
                <Text style={ styles.continueText }>Submit</Text>
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen:{
        paddingTop: "50%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "12%",
        marginRight: "10%",
        marginLeft: "10%"
    },
    questionTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: "10%",
        marginLeft: "10%",
        paddingBottom: "2%"
    },
    detailsTitle: {
        fontSize: 18,
    },
    textInput: {
        width: "100%",
        height: 40
    },
    emailInput: {
        marginBottom: "10%",
        marginTop: "20%",
        height: 40,
        marginLeft: "10%",
        marginRight: "10%",
    },
    continueButton: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "red",
        borderRadius: 10,
        alignItems: "center"
    },
    continueText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
});

export default ForgotPassword;