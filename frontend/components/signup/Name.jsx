import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, View } from "react-native";
import { Button, Item } from 'native-base';

function Name({navigation}) {
    const [name, setName] = useState('');

    function handleNavigate() {
        navigation.navigate("Email", { name: name })
    }

    return (
        <SafeAreaView style={ [styles.screen, {flexDirection:"column"}] }>
            <Text style={ styles.questionTitle }>Enter your name.</Text>
            <Item style={ styles.nameInput }>
                <TextInput style={ styles.textInput } onChangeText={(name) => setName(name)} />
            </Item>
            <View style={{flexDirection: "row"}}>
                <Button style={ styles.continueButton } onPress={ handleNavigate } >
                    <Text style={ styles.continueText } >Continue</Text>
                </Button>
            </View>

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
    nameInput: {
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

export default Name;
