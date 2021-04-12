import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Button } from 'native-base';
import { StackActions } from '@react-navigation/native';
import { AirbnbRating } from "react-native-ratings";

function ReadReviews({route, navigation}) {
    const { colors } = useTheme();


    useEffect(() => {

    }, []);


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
            <View style={{ marginLeft: "2%", marginRight: "2%" }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: "2%" }}>
                    <AirbnbRating
                        key={"Rating"}
                        count={5}
                        reviews={["Terrible", "Meh", "OK", "Good", "Amazing"]}
                        type={"custom"}
                        showRating={false}
                        selectedColor={"#ff0000"}
                        defaultRating={3}
                        reviewSize={20}
                        size={25}
                        // onFinishRating={ updateRating }
                    />
                </View>
            </View>
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
});

export default ReadReviews;
