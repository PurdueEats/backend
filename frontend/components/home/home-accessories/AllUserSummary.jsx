import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { useTheme } from "@react-navigation/native";

const AllUserSummary = (props) => {
    const { colors } = useTheme();

    // Recommended Meals
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);

    useEffect(() => {
        getUserNutrition();
    }, []);

    function getUserNutrition() {
        // Fetch date
        let date = new Date();
        date.setDate(date.getDate() - date.getDay() + 1)
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
                <Text style={ [styles.directionsText, {color: colors.text}] }>Calorie values have been divided by 10.</Text>
            </View>
            <StackedBarChart
                style={{ marginLeft: "2%", marginRight: "5%" }}
                withHorizontalLabels={false}
                data={{
                    labels: ["Calories", "Carbs.", "Fat", "Protein", ""],
                    data: [
                        [parseInt(props.calories / 10), parseInt(calories / 10)],
                        [parseInt(props.carbs), parseInt(carbs)],
                        [parseInt(props.fat), parseInt(fat)],
                        [parseInt(props.protein), parseInt(protein)],
                        []
                    ],
                    barColors: ["red", "white"]
                }}
                width={400}
                height={250}
                strokeWidth={0}
                chartConfig={{
                    backgroundColor: colors.background,
                    backgroundGradientFrom: colors.background,
                    backgroundGradientTo: colors.background,
                    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForBackgroundLines: {
                        strokeWidth: 0
                    }
                }}
                hideLegend={false}
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
