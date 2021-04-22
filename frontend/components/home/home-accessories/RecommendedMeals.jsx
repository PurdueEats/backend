import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from 'native-base';
import { useTheme } from "@react-navigation/native";

const DiningFacilities = (props) => {
    // Dark mode theme manager
    const { colors } = useTheme();

    // Recommended meals
    const [recommendedMeals, setRecommendedMeals] = useState([]);

    useEffect(() => {
        getRecommendedMeals();
    }, []);

    function getRecommendedMeals() {
        // User Nutrition Summary Route
        fetch("https://app-5fyldqenma-uc.a.run.app/Users/Predict", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then(
                function (response) {
                    if (response.status !== 200 && response.status !== 201) {
                        console.log('Looks like there was a problem retrieving recommended meals. Status Code: ' +
                            response.status);
                    } else {
                        // Examine the text in the response
                        response.json().then(function (data) {
                            setRecommendedMeals(data)
                        });
                    }
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    return (
        <View>
            <View style={ styles.recommendedView }>
                <Text style={ [styles.dataHeader, {color: colors.text}] }>These meals fit your eating habits</Text>
            </View>
            {recommendedMeals.length === 0 ? (
                <Button style={ styles.mealsButton }>
                    <Text style={ styles.mealsText }>No meals available.</Text>
                </Button>
            ) : (
                recommendedMeals.map(function (meal, index) {
                    return (
                        <Button key={index} style={ styles.mealsButton } onPress={() => props.navigation.navigate("MealNutrition",
                            { UserID: props.UserID, token: props.token,
                                MealID: meal["menu_item_id"], MealName: meal["item_name"]})}>
                            <Text style={ styles.mealsText }>{meal["item_name"]}</Text>
                        </Button>
                    );
                })
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    // Recommended Meals
    recommendedView: {
        marginTop: "5%",
        alignItems: "center"
    },
    directionsText: {
        marginTop: "2%",
        marginBottom: "2%",
        fontSize: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    dataView: {
        alignItems: "center"
    },
    dataHeader: {
        fontSize: 24,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center"
    },
    dataText: {
        marginTop: "2%",
        marginBottom: "2%",
        fontSize: 14,
        justifyContent: "center",
        alignItems: "center"
    },
    mealsButton: {
        marginTop: "5%",
        marginLeft: "15%",
        width: '70%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    mealsText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    }
});

export default DiningFacilities;
