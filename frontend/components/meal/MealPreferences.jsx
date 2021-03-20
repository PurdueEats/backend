import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import { Button } from 'native-base';
import Logo from "../../resources/logo.png";

function MealPreferences({route, navigation}) {
    // const [meals, setMealRating] = useState('');
    const meals = [ "Hamburger", "Balsamic Chicken", "Hotdog", "Pizza", "Beef Broccoli Stirfry" ]
    const ratings = [ 3, 3, 3, 3, 3 ]
    var moment = require('moment-timezone');
    var time = moment().tz('America/New_York').utcOffset("−05:00").format();

    // useEffect(() => {
    //     console.log("hit here")
    // })

    function handleSubmit() {
        // Login Route
        // fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/Login`, {
        //     method: 'POST',
        //     headers : {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "user_id": route.params.UserID,
        //         "menu_item_id": 30005,
        //         "rating": 2,
        //         "timestamp": "2021-03-04T06:23:29.468000+00:00"
        //     })
        // })
        //     .then(
        //         function(response) {
        //             if (response.status !== 200) {
        //                 console.log('Looks like there was a problem. Status Code: ' +
        //                     response.status);
        //                 displayError();
        //             } else {
        //                 // Examine the text in the response
        //                 response.json().then(function(data) {
        //                     // Login successful, redirect to MealPreferences
        //                     navigation.navigate("MealPreferences", { UserID: data.UserID, token: data.token });
        //                 });
        //             }
        //         }
        //     )
        //     .catch(function(err) {
        //         console.log('Fetch Error :-S', err);
        //     });
        navigation.navigate("NavBar", { UserID: route.params.UserID, token: route.params.token });
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ styles.screenView }>
                <Image style={ styles.logoImage } source={ Logo } />
                <Text style={ styles.screenTitle }>Enter your meal preferences</Text>
            </View>
            <View style={ styles.screenView }>
                { meals.length === 0 ? (
                    <Text>Error</Text>
                ) : (
                    meals.map(function (meal, index) {
                        function updateRating(rating) {
                            ratings[index] = rating;
                        }
                        return (
                            <View key={index} style={ styles.individualRatingComponents }>
                                <Text key={index + "Text"} style={ styles.mealText }>{meal}</Text>
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
                    }))}
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
