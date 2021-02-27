import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TextInput } from "react-native";
import Logo from "../../resources/logo.png";
import { Button, Item, Toast } from 'native-base';

function LoginManager({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        // Sample code for sending package to API
		// fetch(`/api/db/getBusinessData/` + params, {
		// 	method: 'GET',
		// 	headers : {
		// 		'Content-Type': 'application/json',
		// 		'Accept': 'application/json'
		// 	}
		// })
		// 	.then(response => response.json())
		// 	.then(response => this.setState({ "response" : response }))

        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Wrong password!",
            textStyle: {
                textAlign: 'center',
            },
            duration: 500
        });
        console.log("email " + email + " password " + password)
        navigation.navigate('Test')
    }

    function handleForgotPassword() {
        console.log("handle forgot password")
    }

    function handleSignUp() {
        console.log("handle sign up")
    }

    return (
        <View>
            <View style={ styles.logoView }>
                <Image source={ Logo } />
				<Text style={ styles.logoTitle }>PurdueEats</Text>
            </View>
            <View style={ styles.formView }>
                <Text style={ styles.formTitle }>Sign In</Text>
                <Text style={ styles.componentIdentifier }>Email</Text>
                <Item style={ styles.emailComponent }>
                    <TextInput style={ styles.textInput } onChangeText={(email) => setEmail(email)} />
                </Item>
                <Text style={ styles.componentIdentifier }>Password</Text>
                <Item style={ styles.passwordComponent }>
                    <TextInput style={ styles.textInput } secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
                </Item>
            </View>
            <View style={ styles.actionView }>
                <Button style={ styles.loginButtonComponent } onPress={ handleLogin }>
                    <Text style={ styles.loginButtonText }>Sign In</Text>
                </Button>
                <View style={ styles.endingText }>
                    <View>
                        <Text style={ styles.forgotPasswordText } onPress={ handleForgotPassword }>Forgot Password?</Text>
                    </View>
                    <View>
                        <Text style={ styles.signUpText } onPress={ handleSignUp }>Sign Up</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logoView: {
        paddingTop: "12%",
        alignItems: "center",
        marginBottom: "2%"
    },
	logoTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: "5%"
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
        marginBottom: "8%"
    },
    componentIdentifier: {
        color: "red",
        fontWeight: "bold"
    },
    textInput: {
        width: "100%",
        height: 40
    },
    emailComponent: {
        marginBottom: "10%",
        height: 40
    },
    passwordComponent: {
        height: 40,
        marginBottom: "4%"
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
        paddingTop: "10%",
        paddingBottom: "8%",
        fontSize: 16,
        fontWeight: "bold",
        color: "gray"
    },
    signUpText: {
        alignItems: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "red"
    }
});

export default LoginManager;
