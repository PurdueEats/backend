import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import {Button, Item, Toast} from 'native-base';
import { StackActions } from '@react-navigation/native';

function WriteReview({route, navigation}) {
    const { colors } = useTheme();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {

    }, []);


    function submitReview() {
        if (title === '' || body === '') {
            reviewError();
            return;
        }
        else {
            reviewSubmitted()
            navigation.navigate("ReadReviews", { UserID: route.params.UserID, token: route.params.token, DiningID: route.params.DiningID });
        }
    }

    function reviewSubmitted() {
        Toast.show({
            style: { backgroundColor: "green", justifyContent: "center" },
            position: "top",
            text: "Thank you for your review!",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    function reviewError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Please make sure you enter text in each input.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    return (
        <ScrollView>
            <View style={ styles.topView } >
                <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Write a Review</Text>
            </View>
            <Text style={ [styles.subheader, {color: colors.text}] }>Title</Text>
            <Item style={ styles.titleInput }>
                <TextInput style={ [styles.textInput, {color: colors.text}] } placeholder="Enter your review title here" onChangeText={(title) => setTitle(title)} />
            </Item>
            <Text style={ [styles.subheader, {color: colors.text}] }>Body</Text>
            <Item style={ styles.bodyInput }>
                <TextInput style={ [styles.bodyTextInput, {color: colors.text}] } multiline={true} numberOfLines={10} placeholder="Enter your review here" onChangeText={(body) => setBody(body)} />
            </Item>
            <Button style={ styles.submitButton } onPress={submitReview}>
                <Text style={ styles.submitText }>Submit</Text>
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageView: {
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    topView: {
        marginLeft: "3%",
        marginRight: "3%",
        marginTop: "10%",
        marginBottom: "5%",
        flexDirection: "row"
    },
    screenTitle: {
        fontSize: 30,
        fontWeight: "bold",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center"
    },
    subheader: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: "10%",
        marginRight: "auto",
    },
    textInput: {
        width: "100%",
        height: 40
    },
    titleInput: {
        marginBottom: "10%",
        marginTop: "4%",
        height: 40,
        marginLeft: "10%",
        marginRight: "10%",
    },
    bodyInput: {
        marginBottom: "10%",
        marginTop: "4%",
        height: 40,
        marginLeft: "10%",
        marginRight: "10%",
    },
    bodyTextInput: {
        width: "100%",
        height: 200
    },
    submitButton: {
        marginLeft: "10%",
        marginBottom: "1%",
        width: '80%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    submitText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
});

export default WriteReview;
