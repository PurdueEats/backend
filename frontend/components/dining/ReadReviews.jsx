import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Button } from 'native-base';
import { StackActions } from '@react-navigation/native';

function ReadReviews({route, navigation}) {
    const { colors } = useTheme();

    function handleNavigate() {
        navigation.navigate("WriteReview", { UserID: route.params.UserID, token: route.params.token, DiningID: route.params.DiningID });
    }

    return (
        <ScrollView>
            <View style={ styles.topView } >
                <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Reviews</Text>
                <TouchableOpacity active = { .5 } onPress={handleNavigate}>
                    <MaterialCommunityIcons name="pencil" color="red" size={30}/>
                </TouchableOpacity>
            </View>
            <View style={{ marginLeft: "2%", marginRight: "2%", flexDirection: "row" }}>
                    <Text style={ [styles.avgTitle, {color: colors.text}] }>Average Rating: </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: "2%" }}>
                        <MaterialCommunityIcons name="star" color="red" size={30}/>
                        <MaterialCommunityIcons name="star" color="red" size={30}/>
                        <MaterialCommunityIcons name="star" color="red" size={30}/>
                        <MaterialCommunityIcons name="star" color="red" size={30}/>
                        <MaterialCommunityIcons name="star" color="red" size={30}/>
                    </View>
            </View>
            <View
                style={{
                    borderBottomColor: '#c4baba',
                    borderBottomWidth: 1,
                }}
            />
            <Text style={ [styles.reviewTitle, {color: colors.text}] }>REVIEW TITLE </Text>
            <Text style={ [styles.reviewContent, {color: colors.text}] }> REVIEW BODY HERE</Text>
            <View
                style={{
                    borderBottomColor: '#c4baba',
                    borderBottomWidth: 1,
                }}
            />
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
    avgTitle: {
        fontSize: 22,
        fontWeight: "bold",
        alignItems: "center",
        marginLeft: "9%",
        marginRight: "1%",
        justifyContent: "center"
    },
    reviewTitle: {
        fontSize: 22,
        fontWeight: "bold",
        alignItems: "center",
        marginLeft: "15%",
        marginRight: "3%",
        marginTop: "3%",
        marginBottom: "3%",
        justifyContent: "center"
    },
    reviewContent: {
        fontSize: 20,
        alignItems: "center",
        marginLeft: "15%",
        marginRight: "3%",
        marginBottom: "3%",
        justifyContent: "center"
    },
});

export default ReadReviews;
