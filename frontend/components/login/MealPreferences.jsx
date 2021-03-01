import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import { Button } from 'native-base';
import Logo from "../../resources/logo.png";

function MealPreferences({navigation}) {
    // const [meals, setMealRating] = useState('');
    const meals = [ "Hamburger", "Balsamic Chicken", "Hotdog", "Pizza", "Beef Broccoli Stirfry" ]
    const ratings = [ 3, 3, 3, 3, 3 ]

    // useEffect(() => {
    //     console.log("hit here")
    // })

    function handleSubmit() {
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
        navigation.navigate('Template')
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
