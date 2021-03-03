import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import { Button, Item } from 'native-base';


class DiningDollarEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diningDollars: ""
        };
    }
    async storeDiningDollars() {
        console.log("send dining dollars to database");
    }

    render() {
        return (
            <SafeAreaView style={ styles.screen }>
                <Text style={ styles.questionTitle }>Enter the number of dining dollars you have.</Text>
                <Item style={ styles.diningInput }>
                    <TextInput style={ styles.textInput } onChangeText={(diningDollars) => this.setState(diningDollars)} />
                </Item>
                <Button style={ styles.signUpButton }>
                    <Text style={ styles.signUpText }>Sign Up!</Text>
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
