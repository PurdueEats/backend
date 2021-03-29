import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {StackActions} from "@react-navigation/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";

function MealNutrition({route, navigation}) {
    // Nutritional Information
    const [servingSize, setServingSize] = useState('');
    const [calories, setCalories] = useState('');
    // Macros
    const [fat, setFat] =  useState('');
    const [fatValue, setFatValue] = useState('0%');
    const [saturatedFat, setSaturatedFat] = useState('');
    const [saturatedFatValue, setSaturatedFatValue] = useState('0%');
    const [cholesterol, setCholesterol] =  useState('');
    const [cholesterolValue, setCholesterolValue] = useState('0%');
    const [sodium, setSodium] =  useState('');
    const [sodiumValue, setSodiumValue] = useState('0%');
    const [carbs, setCarbs] =  useState('');
    const [carbsValue, setCarbsValue] = useState('0%');
    const [protein, setProtein] =  useState('');
    const [proteinValue, setProteinValue] = useState('0%');

    useEffect(() => {
        // Meal Nutrition Route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItems/` + route.params.MealID + "/Nutrition", {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                    } else {
                        // Examine the text in the response
                        response.json().then(function(data) {
                            // GET successful, set nutrition data
                            setServingSize(data["Nutrition"][0]["LabelValue"])
                            setCalories(data["Nutrition"][1]["LabelValue"])
                            setFat(data["Nutrition"][3]["LabelValue"])
                            setFatValue(data["Nutrition"][3]["DailyValue"])
                            setSaturatedFat(data["Nutrition"][4]["LabelValue"])
                            setSaturatedFatValue(data["Nutrition"][4]["DailyValue"])
                            setCholesterol(data["Nutrition"][5]["LabelValue"])
                            setCholesterolValue(data["Nutrition"][5]["DailyValue"])
                            setSodium(data["Nutrition"][6]["LabelValue"])
                            setSodiumValue(data["Nutrition"][6]["DailyValue"])
                            setCarbs(data["Nutrition"][7]["LabelValue"])
                            setCarbsValue(data["Nutrition"][7]["DailyValue"])
                            setProtein(data["Nutrition"][10]["LabelValue"])
                            setProteinValue(data["Nutrition"][10]["DailyValue"])
                        });
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }, []);

    return (
        <ScrollView style={{ marginBottom: "5%" }}>
            <View style={ styles.topView } >
                <TouchableOpacity onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Text style={ styles.screenTitle }>{route.params.MealName}</Text>
            </View>
            <View style={ styles.bodyView }>
                <Text style={ styles.dataHeader }>Nutritional Information</Text>
                <View style={ styles.sameLineDataView }>
                    <Text style={ styles.data }>Serving Size </Text>
                    <Text style={ styles.data }>{servingSize}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ styles.data }>Calories </Text>
                    <Text style={ styles.data }>{calories}</Text>
                </View>
                <Text style={ styles.dataHeader }>Macros % of Daily Value</Text>
                <View style={{ marginTop: "5%" }}>
                    <ProgressChart
                        data={{
                            labels: ["Fat", "Carbs.", "Sodium", "Cholest.", "Protein"],
                            data: [ parseFloat(fatValue.slice(0, -1))/100, parseFloat(carbsValue.slice(0, -1))/100,
                                parseFloat(sodiumValue.slice(0, -1))/100, parseFloat(cholesterolValue.slice(0, -1))/100,
                                parseFloat(proteinValue.slice(0, -1))/100 ]
                        }}
                        width={Dimensions.get("window").width - 20}
                        height={250}
                        strokeWidth={12}
                        radius={35}
                        chartConfig={{
                            backgroundColor: "#f2f2f2",
                            backgroundGradientFrom: "#f2f2f2",
                            backgroundGradientTo: "#f2f2f2",
                            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`
                        }}
                    />
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ styles.dataHeader }>Macros</Text>
                    <Text style={ styles.dataHeader }>% Daily Value</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ styles.data }>Total fat {fat} </Text>
                    <Text style={ styles.data }>{fatValue}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ styles.data }>Saturated fat {saturatedFat}</Text>
                    <Text style={ styles.data }>{saturatedFatValue}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ styles.data }>Cholesterol {cholesterol}</Text>
                    <Text style={ styles.data }>{cholesterolValue}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ styles.data }>Sodium {sodium}</Text>
                    <Text style={ styles.data }>{sodiumValue}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ styles.data }>Total Carbohydrates {carbs}</Text>
                    <Text style={ styles.data }>{carbsValue}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ styles.data }>Protein {protein}</Text>
                    <Text style={ styles.data }>{proteinValue}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    topView: {
        marginLeft: "3%",
        marginRight: "3%",
        marginTop: "10%",
        flexDirection: "row"
    },
    screenTitle: {
        fontSize: 30,
        fontWeight: "bold",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
    },
    bodyView: {
        marginLeft: "5%",
        marginRight: "5%",
    },
    dataHeader: {
        marginTop: "10%",
        fontSize: 18,
        fontWeight: "bold"
    },
    sameLineDataView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    data: {
        marginTop: "5%",
        fontSize: 16,
    }
});

export default MealNutrition;
