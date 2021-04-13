import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Button } from 'native-base';
import { useTheme } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

function MealPlan({route, navigation}) {
    const { colors } = useTheme();
    const [mealPlan, setMealPlan] = useState('');

    function handleLogin() {
        // Login Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/Login`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "user_id": "0",
                "name": "string",
                "email": route.params.email,
                "password": route.params.password
            })
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Examine the text in the response
                        response.json().then(function(data) {
                            sendMealPlan(data.UserID, data.token)
                        });
                    } else {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function sendMealPlan(UserID, token) {
        // Send Meal Plan Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/`+ UserID +`/MealPlan`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "MealPlanName": mealPlan
            })
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        navigation.navigate("NavBar", { UserID: UserID, token: token });
                    } else {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });

    }

    return (
        <SafeAreaView style={ [styles.screen, {flexDirection:"column"}] }>
            <Text style={ [styles.questionTitle, {color: colors.text}] }>Select your meal plan.</Text>
            <Text style={ [styles.detailsTitle, {color: colors.text}] }>This will be the meal plan and dining dollar amount that we associate with your account.</Text>
            <DropDownPicker
                items={[
                    {label: '10 Meal Plan +100', value: '10 Meal Plan +100'},
                    {label: '15 Meal Plan +450', value: '15 Meal Plan +450'},
                    {label: '21 Meal Plan +250', value: '21 Meal Plan +250'},
                    {label: '21 Meal Plan +500', value: '21 Meal Plan +500'},
                ]}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setMealPlan(item.value)}
            />
            <Button style={ styles.continueButton } onPress={ handleLogin }>
                <Text style={ styles.continueText }>Continue</Text>
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen:{
        marginTop: "40%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "12%",
        marginLeft: "10%",
        marginRight: "10%"
    },
    questionTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: "10%",
        paddingBottom: "2%",
        textAlign:"center"
    },
    detailsTitle: {
        fontSize: 18,
        paddingBottom: "10%",
        textAlign:"center",
    },
    textInput: {
        width: "100%",
        height: 40
    },
    continueButton: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "red",
        borderRadius: 10,
        marginTop: "70%"
    },
    continueText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
});

export default MealPlan;
