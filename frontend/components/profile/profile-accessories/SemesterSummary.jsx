import React, { useState, useEffect } from "react";
import {Dimensions, StyleSheet, View, Text, TouchableOpacity, Image, Modal, ScrollView} from "react-native";
import { StackActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Cloud from 'react-native-word-cloud';
import { useTheme } from '@react-navigation/native';
import Logo from "../../../resources/logo.png";
import { LineChart } from "react-native-chart-kit";

function SemesterSummary({route, navigation}) {
    const { colors } = useTheme()
    // Word Cloud most eaten meals
    const [wordArray, setWordArray] = useState([]);

    // Line charts data
    const chartLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]
    const [caloriesData, setCaloriesData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [carbsData, setCarbsData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [fatData, setFatData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [proteinData, setProteinData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [transactionsData, setTransactionsData] = useState([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);

    useEffect(() => {
        setWordArray([])
        // Fetch semester summary
        fetch('https://app-5fyldqenma-uc.a.run.app/Users/UserSummary', {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful GET
                        response.json().then(function(data) {
                            // Set word array data
                            let len = 4;
                            for (let i = 0; i < data["menu_item_count"].length; i++) {
                                if (i % len === 0) {
                                    data["menu_item_count"][i].color = "dodgerblue";
                                } else if (i % len === 1) {
                                    data["menu_item_count"][i].color = "red";
                                } else if (i % len === 2) {
                                    data["menu_item_count"][i].color = "green";
                                } else {
                                    data["menu_item_count"][i].color = "white";
                                }
                            }
                            setWordArray(data["menu_item_count"]);

                            // Set line chart data
                            setCaloriesData(data["weekly_avg_calories"])
                            setCarbsData(data["weekly_avg_carbs"])
                            setFatData(data["weekly_avg_fat"])
                            setProteinData(data["weekly_avg_prot"])
                            setTransactionsData(data["weekly_summary_trans"])
                        });
                    } else {
                        // Examine the text in the response
                        console.log('Looks like there was a problem retrieving semester summary. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }, []);

    return (
        <ScrollView>
            <View style={ [styles.screenView, {flexDirection:"row"}] } >
                <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
            <View>
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Semester Summary</Text>
            </View>
            <Text style={ [styles.dataHeader, {color: colors.text}] }>Your top meals</Text>
            <Cloud width={400} keywords={wordArray} scale={350} largestAtCenter={true}/>
            <Text style={ [styles.dataHeader, {color: colors.text}] }>Your consumed calories by week</Text>
            <LineChart
                data={{
                    labels: chartLabels,
                    datasets: [
                        {
                            data: caloriesData,
                            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                            strokeWidth: 2 // optional
                        }
                    ],
                    legend: ["Calorie value"] // optional
                }}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={{
                    backgroundColor: colors.background,
                    backgroundGradientFrom: colors.background,
                    backgroundGradientTo: colors.background,
                    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                    labelColor: (opacity = 1) => colors.text,
                    propsForBackgroundLines: {
                        strokeWidth: 0
                    }
                }}
            />
            <Text style={ [styles.dataHeader, {color: colors.text}] }>Your consumed carbohydrates by week</Text>
            <LineChart
                data={{
                    labels: chartLabels,
                    datasets: [
                        {
                            data: carbsData,
                            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                            strokeWidth: 2 // optional
                        }
                    ],
                    legend: ["Carbohydrate value in grams"] // optional
                }}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={{
                    backgroundColor: colors.background,
                    backgroundGradientFrom: colors.background,
                    backgroundGradientTo: colors.background,
                    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                    labelColor: (opacity = 1) => colors.text,
                    propsForBackgroundLines: {
                        strokeWidth: 0
                    }
                }}
            />
            <Text style={ [styles.dataHeader, {color: colors.text}] }>Your consumed fat by week</Text>
            <LineChart
                data={{
                    labels: chartLabels,
                    datasets: [
                        {
                            data: fatData,
                            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                            strokeWidth: 2 // optional
                        }
                    ],
                    legend: ["Fat value in grams"] // optional
                }}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={{
                    backgroundColor: colors.background,
                    backgroundGradientFrom: colors.background,
                    backgroundGradientTo: colors.background,
                    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                    labelColor: (opacity = 1) => colors.text,
                    propsForBackgroundLines: {
                        strokeWidth: 0
                    }
                }}
            />
            <Text style={ [styles.dataHeader, {color: colors.text}] }>Your consumed protein by week</Text>
            <LineChart
                data={{
                    labels: chartLabels,
                    datasets: [
                        {
                            data: proteinData,
                            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                            strokeWidth: 2 // optional
                        }
                    ],
                    legend: ["Protein value in grams"] // optional
                }}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={{
                    backgroundColor: colors.background,
                    backgroundGradientFrom: colors.background,
                    backgroundGradientTo: colors.background,
                    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                    labelColor: (opacity = 1) => colors.text,
                    propsForBackgroundLines: {
                        strokeWidth: 0
                    }
                }}
            />
            <Text style={ [styles.dataHeader, {color: colors.text}] }>Your dining dollars transactions by week</Text>
            <LineChart
                yAxisLabel={"$"}
                data={{
                    labels: chartLabels,
                    datasets: [
                        {
                            data: transactionsData,
                            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                            strokeWidth: 2 // optional
                        }
                    ],
                    legend: ["Dining dollar values"] // optional
                }}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={{
                    backgroundColor: colors.background,
                    backgroundGradientFrom: colors.background,
                    backgroundGradientTo: colors.background,
                    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                    labelColor: (opacity = 1) => colors.text,
                    propsForBackgroundLines: {
                        strokeWidth: 0
                    }
                }}
            />
        </ScrollView>
    );
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
        marginBottom: "5%",
        alignItems: "center",
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
    },
    directionsText: {
        fontSize: 15,
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "4%",
        textAlign: "center",
    },
    dataHeader: {
        marginTop: "5%",
        fontSize: 20,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    dataText: {
        marginTop: "2%",
        marginBottom: "2%",
        fontSize: 14,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default SemesterSummary;
