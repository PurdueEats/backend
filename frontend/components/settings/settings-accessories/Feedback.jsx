import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from '@react-navigation/native';
import { Toast } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

function Feedback({route, navigation}) {
    const {colors} = useTheme();
    const [feedback, setFeedback] = useState('');
    const moment = require('moment-timezone');
    const time = moment().tz('America/New_York').utcOffset("−05:00").format();

    function postFeedback() {
        // Set name route
        fetch('https://app-5fyldqenma-uc.a.run.app/Users/Feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
            body: JSON.stringify({
                "user_id": "" + route.params.UserID + "",
                "feedback_text": feedback,
                "timestamp": time
            })
        })
            .then(
                function (response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        if (response.status === 200 || response.status === 201) {
                            // Successful POST
                            Toast.show({
                                style: {backgroundColor: "green", justifyContent: "center"},
                                position: "top",
                                text: "Feedback successfully sent.",
                                textStyle: {
                                    textAlign: 'center',
                                },
                                duration: 1500
                            });
                            navigation.dispatch(StackActions.pop(1));
                        } else {
                            // Examine the text in the response
                            Toast.show({
                                style: {backgroundColor: "red", justifyContent: "center"},
                                position: "top",
                                text: "Feedback not sent correctly.",
                                textStyle: {
                                    textAlign: 'center',
                                },
                                duration: 1500
                            });
                        }
                    }
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    return (
        <ScrollView>
            <View style={[styles.screenView, {flexDirection: "row"}]}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
            </View>
            <View style={styles.iconPosition}>
                <Text style={[styles.appName, {color: colors.text}]}>Feedback</Text>
            </View>
            <View style={styles.content}>
                <Text style={[styles.signInContent, {color: colors.text}]}>Frequently Asked Questions</Text>
                <Text style={[styles.textQuestion, {color: colors.text}]}>What user information does the PurdueEats app
                    save?</Text>
                <Text style={styles.textAnswer}>The application only saves your email, password, and meal
                    history.</Text>
                <Text style={[styles.textQuestion, {color: colors.text}]}>How long will it take for my submitted
                    feedback to be considered?</Text>
                <Text style={styles.textAnswer}>The developers of the app will most likely view feedback within a few
                    days.</Text>
                <Text style={[styles.textQuestion, {color: colors.text}]}>What permissions does this app need for
                    complete functionality?</Text>
                <Text style={styles.textAnswer}>The location permission is needed for the map function to work, and that
                    is all.</Text>
                <Text style={[styles.textNormal, {color: colors.text}]}> </Text>
                <Text style={[styles.signInContent, {color: colors.text}]}>Submit Feedback</Text>
                <TextInput style={[styles.textEnter, {color: colors.text}]}
                           onChangeText={(feedback) => setFeedback(feedback)}/>
                <TouchableOpacity style={styles.button} onPress={() => postFeedback()}>
                    <MaterialCommunityIcons name="send" color={"red"} size={40}/>
                </TouchableOpacity>
                <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
                <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
                <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
                <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    iconPosition: {
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
    submit: {
        fontSize: 20,
        marginTop: "5%",
        marginLeft: "35%"
    },
    sectionHeader: {
        color: "red",
        fontWeight: "bold",
    },
    screenView: {
        marginTop: "10%",
        marginLeft: "7%",
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    logo: {
        width: 100,
        height: 100
    },
    textEnter: {
        width: "90%",
        height: "10%",
        textAlignVertical: "top",
        borderColor: "white",
        borderWidth: 1,
        flexDirection: "row",
        fontSize: 16
    },
    textQuestion: {
        color: "black",
        flexDirection: "row",
        fontSize: 16
    },
    textAnswer: {
        color: "red",
        flexDirection: "row",
        fontSize: 13
    },


});

export default Feedback;
