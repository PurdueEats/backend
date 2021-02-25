import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Logo from "../../resources/logo.png";
import { Button } from 'native-base';

const LoginManager = () => {

    return (
        <View style={ styles.baseText }>
            <Image source={ Logo } style={ styles.image }/>
            <Text style={ styles.titleText }>
                PurdueEats
            </Text>
            <Button>
                <Text>Click me!</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    baseText: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 150,
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold"
    }
});

export default LoginManager;

