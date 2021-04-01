import React, {useEffect} from "react";
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AirbnbRating} from 'react-native-ratings';
import { Button, Toast } from 'native-base';
import SelectMultiple from 'react-native-select-multiple'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import Logo from "../../resources/logo.png";

function MealReview({route, navigation}) {
    const [ratings, setRatings] = React.useState(3);
    const [selectedMeals, setSelectedMeals] = React.useState([]);
    const [meals, setMeals] = React.useState([]);

    var moment = require('moment-timezone');
    var time = moment().tz('America/New_York').utcOffset("−05:00").format();

    useEffect(() => {
        getMeals();
    }, []);

    const onSelectionsChange = newSelections => {
        setSelectedMeals(newSelections)
    }

    function getMeals() {
        fetch(`https://purdueeats-304919.uc.r.appspot.com/DF/` + route.params.DiningID + `/Menu`, {
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
                            setMeals(data.map(menuItem => ({ label: menuItem.menu_item.item_name, value: menuItem.menu_item.menu_item_id })));
                            setMeals(data
                                .map(e => e.menu_item.menu_item_id)
                                .map((e, i, final) => final.indexOf(e) === i && i)
                                .filter(e => data[e])
                                .map(e => data[e])
                                .map(menuItem => ({
                                    label: menuItem.menu_item.item_name,
                                    value: menuItem.menu_item.menu_item_id
                                })));
                        });
                    } else {
                        console.log('Getting Menu Dining Menu Items like there was a problem. Status Code: ' +
                            response.status);
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
            text: "Meals successfully recorded.",
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
            text: "Record meals failed. Please try again.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    function handleMealReview() {
        selectedMeals.map(item => {
            fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItemReview/`, {
                method: 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_id": route.params.UserID.toString(),
                    "menu_item_id": item.value,
                    "rating": ratings,
                    "timestamp": time
                })
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
        })
    }

    function updateRating(rating) {
        setRatings(rating);
    }

    function handleClearMealReview() {
        setSelectedMeals([]);
    }
    return (
        <ScrollView>
            <View style={ [styles.screenView, {flexDirection:"row"}] } >
                <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
            <View>
                <Text style={ styles.screenTitle }>Record Meal</Text>
            </View>
            <View style={ styles.ratingView }>
                <AirbnbRating
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
            <View>
                <View style={ styles.selectMultipleView }>
                    <SelectMultiple
                        items={meals}
                        selectedItems={selectedMeals}
                        onSelectionsChange={onSelectionsChange}
                    />
                </View>
            </View>
            <View style={ styles.buttonView }>
                <View style={{ flexDirection:"row" }}>
                    <Button style={ styles.cancelButtonComponent } onPress= { handleClearMealReview }>
                        <Text style={ styles.cancelButtonText }>Clear</Text>
                    </Button>
                    <Button style={ styles.confirmButtonComponent } onPress={ handleMealReview }>
                        <Text style={ styles.confirmButtonText }>Confirm</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenView: {
        marginTop: "5%",
        marginLeft: "30%",
        marginRight: "30%",
        alignItems: "center",
    },
    button: {
        marginLeft: "-65%",
        marginRight: "73%",
    },
    logoImage: {
        height: 80,
        width: 80,
        marginRight: "15%",
        marginTop: "10%",
        marginBottom: "3%",
        alignItems: "center",
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "2%",
    },
    ratingComponent: {
        borderRadius: 10,
    },
    ratingView: {
        marginBottom: "3%",
    },
    mealText: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: "5%"
    },
    actionView: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    selectMultipleView: {
        marginBottom: "4%",
    },
    buttonView: {
        marginBottom: "4%",
    },
    confirmButtonComponent: {
        width: '50%',
        right: 0,
        justifyContent: 'center',
        backgroundColor: "green",
    },
    cancelButtonComponent: {
        flex: 1,
        width: '50%',
        left: 0,
        justifyContent: 'center',
        backgroundColor: "red",
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
});
export default MealReview