import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Logo from "../../resources/logo.png";
import { Button, Item, Input } from 'native-base';

const LoginManager = () => {
    return (
        <View >
            <View style={ styles.logoView }>
                <Image source={ Logo } /*style={ styles.logo }*//>
                <Text style={ styles.logoText }>
                    PurdueEats
                </Text>
            </View>
            <View style={ styles.formView }>
                <Text style={ styles.formTitle }>Sign In</Text>
                <Text style={ styles.componentIdentifier }>Email</Text>
                <Item floatingLabel style={ styles.emailComponent }>
                    <Input />
                </Item>
                <Text style={ styles.componentIdentifier }>Password</Text>
                <Item floatingLabel style={ styles.passwordComponent }>
                    <Input />
                </Item>
            </View>
            <View style={ styles.actionView }>
                <Button style={ styles.loginButtonComponent }>
                    <Text style={ styles.loginButtonText }>Sign In</Text>
                </Button>
                <View style={ styles.endingText }>
                    <Text style={ styles.forgotPasswordText }>Forgot Password?</Text>
                    <Text style={ styles.signUpText }>Sign Up</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logoView: {
        paddingTop: "12%",
        alignItems: "center",
    },
    // logo: {
    //     width: "40%",
    //     height: "20%",
    // },
    logoText: {
        marginBottom: "8%",
        fontSize: 18,
        fontWeight: "bold"
    },
    formView: {
        paddingTop: "2%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "12%"
    },
    formTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: "10%"
    },
    componentIdentifier: {
        color: "red",
        fontWeight: "bold"
    },
    emailComponent: {
        marginBottom: "8%",
        height: 40
    },
    passwordComponent: {
        height: 40
    },
    actionView: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    loginButtonComponent: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "red",
        borderRadius: 10
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    endingText: {
        alignItems: "center"
    },
    forgotPasswordText: {
        alignItems: "center",
        paddingTop: "5%",
        paddingBottom: "3%",
        fontWeight: "bold",
        color: "gray"
    },
    signUpText: {
        alignItems: "center",
        fontWeight: "bold",
        color: "red"
    }
});

export default LoginManager;

