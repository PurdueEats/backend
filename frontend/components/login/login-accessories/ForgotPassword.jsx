import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, View } from "react-native";
import {Button, Item, Toast} from 'native-base';
import { useTheme } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

function ForgotPassword({navigation}) {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const popAction = StackActions.pop();

    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "There was an issue resetting your password.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 3000
        });
    }

    function forgotPassword(email2) {
        // Register Route
        console.log(email2);
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/ForgotPassword?email=` + email2, {
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
        <View style={styles.viewFlex}>
            <SafeAreaView style={ [styles.screen, {flexDirection:"column"}] }>
                <Text style={ [styles.questionTitle, {color: colors.text}] }>Enter your email.</Text>
                <Text style={ [styles.detailsTitle, {color: colors.text}] }>If we have an account associated with your email, you'll receive an email to reset your password.</Text>
                <Item style={ styles.emailInput }>
                    <TextInput style={ [styles.textInput, {color: colors.text}] } onChangeText={(email) => setEmail(email)} />
                </Item>
                <Button style={ styles.continueButton } onPress={ () => forgotPassword(email) }>
                    <Text style={ styles.continueText }>Submit</Text>
                </Button>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        marginTop: "50%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "12%",
        marginLeft: "10%",
        marginRight: "10%"
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
    profileHeader: {
        marginTop: "8%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        color: "black",
        fontSize: 22,
    },
    backImage: {
        width: 60,
        height: 60
    },
    viewFlex: {
        flex: 1,
    },
});

export default ForgotPassword;
