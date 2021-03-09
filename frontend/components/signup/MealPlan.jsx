import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Button } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';

function MealPlan({route, navigation}) {
    const [mealPlan, setMealPlan] = useState('');

    function handleNavigate() {
        navigation.navigate("DiningDollarEntry", { name: route.params.name, email: route.params.email, password: route.params.password,
            mealPlan: mealPlan})
    }

    return (
        <SafeAreaView style={ [styles.screen, {flexDirection:"column"}] }>
            <Text style={ styles.questionTitle }>Select your meal plan.</Text>
            <DropDownPicker
                items={[
                    {label: '10 Meal Plan + 100', value: '10 Meal Plan + 100'},
                    {label: '15 Meal Plan + 450', value: '15 Meal Plan + 450'},
                    {label: '21 Meal Plan + 250', value: '21 Meal Plan + 250'},
                    {label: '21 Meal Plan + 500', value: '21 Meal Plan + 500'},
                ]}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setMealPlan(item.value)}
            />
            <Button style={ styles.continueButton } onPress={ handleNavigate }>
                <Text style={ styles.continueText }>Continue</Text>
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen:{
        paddingTop: "50%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "12%",
        marginRight: "10%",
        marginLeft: "10%",
        marginTop: "10%"
    },
    questionTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: "10%"
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
        marginTop: "50%"
    },
    continueText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
});

export default MealPlan;
