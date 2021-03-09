import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import { Button, Item } from 'native-base';

function Password({route, navigation}) {
    const [password, setPassword] = useState('');

    function handleNavigate() {
        navigation.navigate("MealPlan", { name: route.params.name, email: route.params.email, password: password })
    }

    return (
        <SafeAreaView style={ [styles.screen, {flexDirection:"column"}] }>
            <Text style={ styles.questionTitle }>Enter your password.</Text>
            <Item style={ styles.passwordInput }>
                <TextInput style={ styles.textInput } secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
            </Item>
            <Button style={ styles.continueButton } onPress={ handleNavigate }>
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
        paddingBottom: "12%",
        marginRight: "10%",
        marginLeft: "10%"
    },
    questionTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: "10%",
        marginLeft: "10%"
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
