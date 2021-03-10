import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import {Button, Item, Toast} from 'native-base';
import { StackActions } from '@react-navigation/native';

function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('');
    const popAction = StackActions.pop();

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
        <View style={styles.viewFlex}>
             <View style={ styles.profileHeader }>
                <View style={ styles.backImage }>
                    <TouchableOpacity active = { .5 } onPress={ () => navigation.dispatch(popAction) }>
                        <Image style={ styles.backImage } source={require('../../resources/back.png')}/>
                    </TouchableOpacity>
                </View>
             </View>
            <SafeAreaView style={ [styles.screen, {flexDirection:"column"}] }>
                <Text style={ styles.questionTitle }>Enter your email.</Text>
                <Item style={ styles.emailInput }>
                    <TextInput style={ styles.textInput } onChangeText={(email) => setEmail(email)} />
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