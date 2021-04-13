import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import { useTheme } from '@react-navigation/native';
import { Button, Item, Toast } from 'native-base';

function Password({route, navigation}) {
    const { colors } = useTheme();
    const [password, setPassword] = useState('');

    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "There was an issue registering your account, please change your name, email, or password.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 3000
        });
    }

    function registerUser() {
        // Register Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/Register`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "user_id": "0",
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
        <SafeAreaView style={ [styles.screen, {flexDirection:"column"}] }>
            <Text style={ [styles.questionTitle, {color: colors.text}] }>Enter your password.</Text>
            <Text style={ [styles.detailsTitle, {color: colors.text}] }>Passwords must be at least 6 characters long.</Text>
            <Item style={ styles.passwordInput }>
                <TextInput style={ [styles.textInput, {color: colors.text}] } secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
            </Item>
            <Button style={ styles.continueButton } onPress={ registerUser }>
                <Text style={ styles.continueText }>Continue</Text>
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen:{
        marginTop: "50%",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: "12%",
        marginLeft: "10%",
        marginRight: "10%",
    },
    questionTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: "10%",
        paddingBottom: "2%",
        textAlign:"center"
    },
    detailsTitle: {
        fontSize: 18,
        textAlign:"center",
    },
    textInput: {
        width: "100%",
        height: 40
    },
    passwordInput: {
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

export default Password;
