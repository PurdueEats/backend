import React, {Component, useState} from "react";
import {StyleSheet, SafeAreaView, Text, TextInput, ScrollView, View, Image, TouchableOpacity} from "react-native";
import {Button, Item, Toast} from 'native-base';

function Email({navigation}) {
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');
    //console.log(route.params.name);

    function storeEmail() {
    }

    return (
        <SafeAreaView style={ styles.screen }>
            <Text style={ styles.questionTitle }>Enter your email.</Text>
            <Item style={ styles.emailInput }>
                <TextInput style={ styles.textInput } onChangeText={(email) => setEmail(email)} />
            </Item>

            <Button style={ styles.continueButton }>
                <Text style={ styles.continueText} onPress={navigation.navigate("Password")}>Continue</Text>
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
    emailInput: {
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

export default Email;
