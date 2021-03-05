import React, {Component, useState} from "react";
import {StyleSheet, SafeAreaView, Text, TextInput, ScrollView, View, Image, TouchableOpacity} from "react-native";
import {Button, Item, Toast} from 'native-base';

function DiningDollarEntry({navigation}) {
    const [diningDollars, setDiningDollars] = useState('');
    const [response, setResponse] = useState('');

    function storeDiningDollars() {
        fetch(`http://127.0.0.1:8000/Trans`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "user_id": 0,
                "transaction_amount": diningDollars,
                "balance": 0,
                "timestamp": "2021-02-27T06:23:29.468000+00:00"
            })
        })
            .then(response => response.json())
            .then(response => setResponse(response))
            .catch(function(error) {
                console.log('Issue with post req. ' + error.message);
                throw error;
            });
        // navigation.navigate("HomeManager")
    }

    return (
        <SafeAreaView style={ styles.screen }>
            <Text style={ styles.questionTitle }>Enter the number of dining dollars you have.</Text>
            <Item style={ styles.diningInput }>
                <TextInput style={ styles.textInput } onChangeText={(diningDollars) => setDiningDollars(diningDollars)}/>
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
