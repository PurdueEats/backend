import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, View } from "react-native";
import { useTheme } from '@react-navigation/native';
import { Button, Item } from 'native-base';

function Name({navigation}) {
    const { colors } = useTheme();
    const [name, setName] = useState('');

    function handleNavigate() {
        navigation.navigate("Email", { name: name })
    }

    return (
        <SafeAreaView style={ [styles.screen, {flexDirection:"column"}] }>
            <Text style={ [styles.questionTitle, {color: colors.text}] }>Enter your name.</Text>
            <Text style={ [styles.detailsTitle, {color: colors.text}] }>This will be the name that we associate with your account.</Text>
            <Item style={ styles.nameInput }>
                <TextInput style={ [styles.textInput, {color: colors.text}] } onChangeText={(name) => setName(name)} />
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
