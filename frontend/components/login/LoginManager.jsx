import React, { Component } from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Button, Item } from 'native-base';

class LoginManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    async forgotPwd() {}

    render() {
        return (
            <View>
                <View style={ styles.iconPosition }>
                    <Image source = {require("../../resources/logo.png")} />
                    <Text style={ styles.appName }>PurdueEats</Text>
                </View>
                <View style={ styles.content }>
                    <Text style={ styles.signInContent }>Sign In</Text>
                    <Text style={ styles.sectionHeader }>Email</Text>
                    <Item style={ styles.emailContent }>
                        <TextInput style={ styles.textInput } onChangeText={(email) => this.setState(email)} />
                    </Item>
                    <Text style={ styles.sectionHeader }>Password</Text>
                    <Item style={ styles.passwordContent }>
                        <TextInput style={ styles.textInput } secureTextEntry={true} onChangeText={(password) => this.setState(password)} />
                    </Item>
                </View>
                <View style={ styles.buttons }>
                    <Button style={ styles.signInButton }>
                            <Text style={ styles.signInText }>Sign In</Text>
                    </Button>
                    <View style={ styles.optionText }>
                        <View>
                            <TouchableOpacity>
                                <Text style={ styles.forgotPasswordText } >Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={ styles.signUpText }>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    iconPosition: {
        paddingTop: "15%",
        marginBottom: "5%",
        alignItems: "center"
    },
    appName: {
        fontSize: 35,
        fontWeight: "bold"
    },
    content: {
        paddingTop: "5%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "10%"
    },
    signInContent: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: "10%"
    },
    sectionHeader: {
        color: "red",
        fontWeight: "bold"
    },
    textInput: {
        width: "100%",
        height: 40
    },
    emailContent: {
        marginBottom: "10%",
        height: 40
    },
    passwordContent: {
        height: 40,
        marginBottom: "5%"
    },
    buttons: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    signInButton: {
        width: '100%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    signInText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    forgotPasswordText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "gray",
        alignItems: "center",
        paddingTop: "10%",
        paddingBottom: "10%",
    },
    signUpText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "red",
        alignItems: "center",

    },
    optionText: {
        alignItems: "center"
    }
});

export default LoginManager;