import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import { useTheme } from '@react-navigation/native';
import { AirbnbRating } from 'react-native-ratings';
import { Button, Toast } from 'native-base';
import Logo from "../../../resources/logo.png";

function MealPreferences({route, navigation}) {
    const { colors } = useTheme();
    const [currMeals, setCurrMeals] = useState([]);
    const ratings = [ 3, 3, 3, 3, 3 ];
    var moment = require('moment-timezone');
    var time = moment().tz('America/New_York').utcOffset("−05:00").format();

    useEffect(() => {
        fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItems/MealPreferences`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful GET
                        // Set Fields to correct values
                        response.json().then(function(data) {
                            setCurrMeals(data);
                        });
                    } else {
                        console.log('Getting Menu Items from Meal Preferences looks like there was a problem. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }, []);

    function handleSubmit() {
        sendMealPreferences();
        navigation.navigate("NavBar", { UserID: route.params.UserID, token: route.params.token });
    }

    function sendMealPreferences() {
        fetch("https://app-5fyldqenma-uc.a.run.app/MenuItemReview/", {
            method: 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{
                    "user_id": route.params.UserID,
                    "menu_item_id": currMeals[0].menu_item_id,
                    "rating": ratings[0],
                    "timestamp": time
                },
                {
                    "user_id": route.params.UserID,
                    "menu_item_id": currMeals[1].menu_item_id,
                    "rating": ratings[1],
                    "timestamp": time
                },
                // {
                //     "user_id": route.params.UserID,
                //     "menu_item_id": currMeals[2].menu_item_id,
                //     "rating": ratings[2],
                //     "timestamp": time
                // },
                // {
                //     "user_id": route.params.UserID,
                //     "menu_item_id": currMeals[3].menu_item_id,
                //     "rating": ratings[3],
                //     "timestamp": time
                // },
                {
                    "user_id": route.params.UserID,
                    "menu_item_id": currMeals[4].menu_item_id,
                    "rating": ratings[4],
                    "timestamp": time
                }]
            )
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        displayConfirmation();
                    } else {
                        // Examine the text in the response
                        console.log('Looks like there was a problem recording meals. Status Code: ' +
                            response.status);
                        displayError();
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function displayConfirmation() {
        Toast.show({
            style: { backgroundColor: "green", justifyContent: "center" },
            position: "top",
            text: "Meal Preferences successfully recorded.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Meal Preferences could not be recorded. Please try again.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ styles.screenView }>
                <Image style={ styles.logoImage } source={ Logo } />
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Enter your meal preferences</Text>
            </View>


            <View style={ styles.screenView }>
                {
                   currMeals.map(function (meal, index) {

                       function updateRating(rating) {
                            ratings[index] = rating;
                        }
                       return (
                            <View key={index} style={ styles.individualRatingComponents }>
                                <Text key={index + "Text"} style={ [styles.mealText, {color: colors.text}] }>{meal.item_name}</Text>
                                <AirbnbRating
                                    key={index + "Rating"}
                                    count={5}
                                    reviews={["Terrible", "Meh", "OK", "Good", "Amazing"]}
                                    type={"custom"}
                                    showRating={false}
                                    selectedColor={"#ff0000"}
                                    defaultRating={3}
                                    reviewSize={20}
                                    size={25}
                                    onFinishRating={ updateRating }
                                />
                            </View>
                        );
                    })}
            </View>
            <View style={ styles.actionView }>
                <Button style={ styles.submitButtonComponent } onPress={ handleSubmit }>
                    <Text style={ styles.submitButtonText }>Submit</Text>
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screenView: {
        paddingTop: "10%",
        alignItems: "center",
    },
    logoImage: {
        height: 70,
        width: 70,
        marginBottom: "8%"
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center"
    },
    ratingComponent: {
        borderRadius: 10,
    },
    individualRatingComponents: {
        flex: 1,
        flexDirection: "column",
        marginBottom: "10%"
    },
    mealText: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: "3%"
    },
    actionView: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    submitButtonComponent: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "red",
        borderRadius: 10,
        marginTop: "5%",
        marginBottom: "10%"
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
});

export default MealPreferences;
