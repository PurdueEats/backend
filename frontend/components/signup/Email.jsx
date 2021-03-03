import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import { Button, Item } from 'native-base';

class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
    }
    async storeEmail() {
        console.log("send email to database");
    }

    render() {
        return (
            <SafeAreaView style={ styles.screen }>
                <Text style={ styles.questionTitle }>Enter your email.</Text>
                <Item style={ styles.emailInput }>
                    <TextInput style={ styles.textInput } onChangeText={(email) => this.setState(email)} />
                </Item>

                <Button style={ styles.continueButton }>
                    <Text style={ styles.continueText }>Continue</Text>
                </Button>
            </SafeAreaView>
        );
    }
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