import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/native";
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";

function MealNutrition({route, navigation}) {
    const { colors } = useTheme();
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

    // Chart Data
    const [chartProtein, setChartProtein] = useState(0);
    const [chartCholesterol, setChartCholesterol] = useState(0);
    const [chartSodium, setChartSodium] = useState(0);
    const [chartCarbs, setChartCarbs] = useState(0);
    const [chartFat, setChartFat] = useState(0);

    useEffect(() => {
        // Meal Nutrition Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/MenuItems/` + route.params.MealID + "/Nutrition", {
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
                            if (!data["Nutrition"]) {
                                return;
                            }
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

                            // Set chart values
                            // Protein
                            const proteinVal = parseFloat(data["Nutrition"][10]["DailyValue"].slice(0, -1));
                            if (proteinVal > 100) {
                                setChartProtein(100);
                            } else {
                                setChartProtein(parseFloat(data["Nutrition"][10]["DailyValue"].slice(0, -1)))
                            }
                            // Cholesterol
                            const cholesterolVal = parseFloat(data["Nutrition"][5]["DailyValue"].slice(0, -1));
                            if (cholesterolVal > 100) {
                                setChartCholesterol(100);
                            } else {
                                setChartCholesterol(cholesterolVal);
                            }
                            // Sodium
                            const sodiumVal = parseFloat(data["Nutrition"][6]["DailyValue"].slice(0, -1));
                            if (sodiumVal > 100) {
                                setChartSodium(100);
                            } else {
                                setChartSodium(sodiumVal);
                            }
                            // Carbs
                            const carbsVal = parseFloat(data["Nutrition"][7]["DailyValue"].slice(0, -1));
                            if (carbsVal > 100) {
                                setChartCarbs(100);
                            } else {
                                setChartCarbs(carbsVal)
                            }
                            // Fat
                            const fatVal = parseFloat(data["Nutrition"][3]["DailyValue"].slice(0, -1));
                            if (fatVal > 100) {
                                setChartFat(100);
                            } else {
                                setChartFat(fatVal)
                            }
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
                <Text style={ [styles.screenTitle, {color: colors.text}] }>{route.params.MealName}</Text>
            </View>
            <View style={ styles.bodyView }>
                <Text style={ [styles.dataHeader, {color: colors.text}] }>Nutritional Information</Text>
                <View style={ styles.sameLineDataView }>
                    <Text style={ [styles.data, {color: colors.text}] }>Serving Size </Text>
                    <Text style={ [styles.data, {color: colors.text}] }>{servingSize}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ [styles.data, {color: colors.text}] }>Calories </Text>
                    <Text style={ [styles.data, {color: colors.text}] }>{calories.toLocaleString()}</Text>
                </View>
                <Text style={ [styles.dataHeader, {color: colors.text}] }>Macros % of Daily Value</Text>
                <View style={{ marginTop: "5%" }}>
                    <ProgressChart
                        data={{
                            labels: ["Fat", "Carbs.", "Sodium", "Cholest.", "Protein"],
                            data: [ chartFat/100, chartCarbs/100,
                                chartSodium/100, chartCholesterol/100,
                                chartProtein/100 ]
                        }}
                        width={Dimensions.get("window").width - 20}
                        height={250}
                        strokeWidth={12}
                        radius={35}
                        chartConfig={{
                            backgroundColor: colors.background,
                            backgroundGradientFrom: colors.background,
                            backgroundGradientTo: colors.background,
                            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`
                        }}
                    />
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ [styles.dataHeader, {color: colors.text}] }>Macros</Text>
                    <Text style={ [styles.dataHeader, {color: colors.text}] }>% Daily Value</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ [styles.data, {color: colors.text}] }>Total fat {fat} </Text>
                    <Text style={ [styles.data, {color: colors.text}] }>{fatValue}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ [styles.data, {color: colors.text}] }>Saturated fat {saturatedFat}</Text>
                    <Text style={ [styles.data, {color: colors.text}] }>{saturatedFatValue}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ [styles.data, {color: colors.text}] }>Cholesterol {cholesterol}</Text>
                    <Text style={ [styles.data, {color: colors.text}] }>{cholesterolValue}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ [styles.data, {color: colors.text}] }>Sodium {sodium}</Text>
                    <Text style={ [styles.data, {color: colors.text}] }>{sodiumValue}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ [styles.data, {color: colors.text}] }>Total Carbohydrates {carbs}</Text>
                    <Text style={ [styles.data, {color: colors.text}] }>{carbsValue}</Text>
                </View>
                <View style={ styles.sameLineDataView }>
                    <Text style={ [styles.data, {color: colors.text}] }>Protein {protein}</Text>
                    <Text style={ [styles.data, {color: colors.text}] }>{proteinValue}</Text>
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
        textAlign: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center"
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
