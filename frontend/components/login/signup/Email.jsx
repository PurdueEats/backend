import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import { Button, Item } from 'native-base';
import { useTheme } from '@react-navigation/native';

function Email({route, navigation}) {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');

    function handleNavigate() {
        navigation.navigate("Password", { name: route.params.name, email: email })
    }

    return (
        <SafeAreaView style={ [styles.screen, {flexDirection:"column"}] }>
            <Text style={ [styles.questionTitle, {color: colors.text}] }>Enter your email.</Text>
            <Text style={ [styles.detailsTitle, {color: colors.text}] }>This will be the email you use to login.</Text>
            <Item style={ styles.emailInput }>
                <TextInput style={ [styles.textInput, {color: colors.text}] } onChangeText={(email) => setEmail(email)} />
            </Item>
            <Button style={ styles.continueButton } onPress={ handleNavigate } >
                <Text style={ styles.continueText }>Continue</Text>
            </Button>
        </SafeAreaView>
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
});

export default Email;
