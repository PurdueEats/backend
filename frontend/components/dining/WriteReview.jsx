import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Button } from 'native-base';
import { StackActions } from '@react-navigation/native';

function WriteReview({route, navigation}) {
    const { colors } = useTheme();


    useEffect(() => {

    }, []);


    function handleNavigate() {
        navigation.navigate("ReadReviews", { UserID: route.params.UserID, token: route.params.token, DiningID: route.params.DiningID });
    }


    return (
        <ScrollView>
            <View style={ styles.topView } >
                <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Write a Review</Text>
            </View>
            <Button style={ styles.submitButton } onPress={handleNavigate}>
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
