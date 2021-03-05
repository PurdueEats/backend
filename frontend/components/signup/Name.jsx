import React, {Component, useState} from "react";
import {StyleSheet, SafeAreaView, Text, TextInput, ScrollView, View, Image, TouchableOpacity} from "react-native";
import {Button, Item, Toast} from 'native-base';

function Name({navigation}) {
    const [name, setName] = useState('');
    const [response, setResponse] = useState('');

    // TODO add check for token expiration
    function tokenManager() {
    }

    function storeName() {

    }

    return (
        <SafeAreaView style={ styles.screen }>
            <Text style={ styles.questionTitle }>Enter your name.</Text>
            <Item style={ styles.nameInput }>
                <TextInput style={ styles.textInput } onChangeText={(name) => this.setState(name)} />
            </Item>

            <Button style={ styles.continueButton }>
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
    },
    textInput: {
        width: "100%",
        height: 40
    },
    nameInput: {
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

export default Name;
