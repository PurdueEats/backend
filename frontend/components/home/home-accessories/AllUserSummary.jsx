import React, {useEffect, useState} from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useTheme } from "@react-navigation/native";

const AllUserSummary = (props) => {
    const { colors } = useTheme();

    // Recommended Meals
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);

    // Chart Data
    const [chartCalories, setChartCalories] = useState(0);
    const [chartCarbs, setChartCarbs] = useState(0);
    const [chartFat, setChartFat] = useState(0);
    const [chartProtein, setChartProtein] = useState(0);

    useEffect(() => {
        getUserNutrition();
    }, []);

    function getUserNutrition() {
        // Fetch date
        let date = new Date(2021, 6, 2);
        date.setDate(date.getDate() - date.getDay())
        let fetchFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        // User Nutrition Summary Route
        fetch('https://app-5fyldqenma-uc.a.run.app/WeeklyNutrition/' + fetchFormat, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(
                function (response) {
                    if (response.status !== 200 && response.status !== 201) {
                        console.log('Looks like there was a problem getting user aggregate data. Status Code: ' +
                            response.status);
                    } else {
                        // Examine the text in the response
                        response.json().then(function (data) {
                            // Set data fields
                            setCalories(data["calories"]);
                            setCarbs(data["carbs"]);
                            setFat(data["fat"]);
                            setProtein(data["protein"]);

                            // Set chartData
                            // Calories
                            if (parseFloat(data["calories"]) > 14000) {
                                setChartCalories(14000);
                            } else {
                                setChartCalories(parseFloat(data["calories"]));
                            }
                            // Carbs
                            if (parseFloat(data["carbs"]) > 1900) {
                                setChartCarbs(1900);
                            } else {
                                setChartCarbs(parseFloat(data["carbs"]));
                            }
                            // Fat
                            if (parseFloat(data["fat"]) > 200) {
                                setChartFat(200);
                            } else {
                                setChartFat(parseFloat(data["fat"]));
                            }
                            // Protein
                            if (parseFloat(data["protein"]) > 350) {
                                setChartProtein(350);
                            } else {
                                setChartProtein(parseFloat(data["protein"]));
                            }
                        });
                    }
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    return (
        <View style={{ backgroundColor: "5%" }}>
            <View style={ styles.recommendedView }>
                <Text style={ [styles.dataHeader, {color: colors.text}] }>Other users' eating habits</Text>
                <Text style={ [styles.directionsText, {color: colors.text}] }>Rings show % of the NHS recommended weekly totals.</Text>
            </View>
            <ProgressChart
                data={{
                    labels: ["Calories", "Carbs.", "Fat", "Protein"],
                    data: [chartCalories / 14000, chartCarbs / 1900, chartFat / 200, chartProtein / 350]
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
            <View style={ styles.dataView }>
                <Text style={ [styles.dataText, {color: colors.text}] }>
                    You ate <Text style={{ fontWeight: "bold"}}>{props.calories.toLocaleString()} calories</Text>
                    , compared to {calories.toLocaleString()} of 14,000.
                </Text>

                <Text style={ [styles.dataText, {color: colors.text}] }>
                    You ate <Text style={{ fontWeight: "bold"}}>{props.carbs.toLocaleString()}g of carbohydrates</Text>
                    , compared to {carbs.toLocaleString()}g of 1,900g.
                </Text>

                <Text style={ [styles.dataText, {color: colors.text}] }>
                    You ate <Text style={{ fontWeight: "bold"}}>{props.fat.toLocaleString()}g of fat</Text>
                    , compared to {fat.toLocaleString()}g of 200g.
                </Text>

                <Text style={ [styles.dataText, {color: colors.text}] }>
                    You ate <Text style={{ fontWeight: "bold"}}>{props.protein.toLocaleString()}g of protein</Text>
                    , compared to {protein.toLocaleString()}g of 350g.
                </Text>
            </View>
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
    showButton: {
        marginTop: "5%",
        marginLeft: "25%",
        width: '50%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    showText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
});

export default AllUserSummary;
