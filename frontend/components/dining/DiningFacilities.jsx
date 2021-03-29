import React, {useEffect, useState} from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import Logo from "../../resources/logo.png";
import Earhart from "../../resources/earhart.png"
import Wiley from "../../resources/wiley.png"
import Ford from "../../resources/ford.png"
import Hillenbrand from "../../resources/hillenbrand.png"
import Windsor from "../../resources/windsor.png"
import MaterialTabs from 'react-native-material-tabs';
import { ProgressChart } from "react-native-chart-kit";
import { Button } from 'native-base';

function DiningFacilities({route, navigation}) {
    // Recommended Meals
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);
    // Dining Courts
    const [diningCourt, setDiningCourt] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        // User Nutrition Summary Route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/` + route.params.UserID + "/Nutrition", {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
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
                            setCalories(data["calories"])
                            setCarbs(data["carbs"])
                            setFat(data["fat"])
                            setProtein(data["protein"])
                        });
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }, []);

    function handleNavigate() {
        navigation.navigate("Menu", { UserID: route.params.UserID, token: route.params.token });
    }

    return (
        <ScrollView>
            <View style={ [styles.iconPosition, {flexDirection:"row"}] }>
                <Image source = { Logo } style = { styles.iconSize } />
            </View>
            <View style={styles.tabBar}>
                <MaterialTabs
                    items={['Recommended Meals', 'Dining Facilities']}
                    selectedIndex={selectedTab}
                    onChange={setSelectedTab}
                    barColor="#ffffff"
                    indicatorColor="#000000"
                    activeTextColor="#000000"
                    inactiveTextColor="#908c8c"
                />
            </View>
            {selectedTab === 0 ? (
                <View style={{ marginBottom: "5%" }}>
                    <View style={ styles.recommendedView }>
                        <Text style={ styles.dataHeader }>Your eating habits</Text>
                        <Text style={ styles.directionsText }>Rings show % of the NHS recommended weekly totals.</Text>
                    </View>
                    <ProgressChart
                        data={{
                            labels: ["Calories", "Carbs.", "Fat", "Protein"],
                            data:
                                // 14000 1820 490 350
                                [parseFloat(calories)/14000,
                                parseFloat(carbs)/1900,
                                parseFloat(fat)/50,
                                parseFloat(protein)/350]
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
                        <Text style={ styles.dataText }>
                            <Text style={{ fontWeight: "bold"}}>Calories</Text> {calories} of 14,000
                        </Text>
                        <Text style={ styles.dataText }>
                            <Text style={{ fontWeight: "bold"}}>Carbohydrates</Text> {carbs}g of 1900g
                        </Text>
                        <Text style={ styles.dataText }>
                            <Text style={{ fontWeight: "bold"}}>Fat</Text> {fat}g of 50g
                        </Text>
                        <Text style={ styles.dataText }>
                            <Text style={{ fontWeight: "bold"}}>Protein</Text> {protein}g of 350g
                        </Text>
                    </View>
                    <View style={ styles.recommendedView }>
                        <Text style={ styles.dataHeader }>These meals fit your eating habits</Text>
                    </View>
                    <Button style={ styles.mealsButton } onPress={() => navigation.navigate("MealNutrition",
                        { UserID: route.params.UserID, token: route.params.token,
                            MealID: 1, MealName: "French Toast Sticks"})}>
                        <Text style={ styles.mealsText }>French Toast Sticks</Text>
                    </Button>
                    <Button style={ styles.mealsButton } onPress={() => navigation.navigate("MealNutrition",
                        { UserID: route.params.UserID, token: route.params.token,
                            MealID: 20, MealName: "French Roll"})}>
                        <Text style={ styles.mealsText }>French Roll</Text>
                    </Button>
                    <Button style={ styles.mealsButton } onPress={() => navigation.navigate("MealNutrition",
                        { UserID: route.params.UserID, token: route.params.token,
                            MealID: 51, MealName: "Fried Potatoes"})}>
                        <Text style={ styles.mealsText }>French Potatoes</Text>
                    </Button>
                </View>
            ): (
                <View>
                    <View style={ styles.imageContainer }>
                        <View style={{alignItems: "center", justifyContent: "center", flexDirection:"row"}}>
                            <TouchableOpacity onPress={ handleNavigate }>
                                <Image source = { Earhart } style = { styles.earhartDiningImage }/>
                                <Text style={ styles.earhartTitle }>{"Earhart"}</Text>
                                <Text style={ styles.earhartTime }>{"4:00-10:00 PM"}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={ handleNavigate }>
                            <Image source = { Wiley } style = { styles.wileyDiningImage }/>
                            <Text style={ styles.wileyTitle }>{"Wiley"}</Text>
                            <Text style={ styles.wileyTime }>{"4:00-10:00 PM"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.imageContainer }>
                        <View style={{alignItems: "center", justifyContent: "center", flexDirection:"row"}}>
                            <TouchableOpacity onPress={ handleNavigate }>
                                <Image source = { Hillenbrand } style = { styles.hillenbrandDiningImage }/>
                                <Text style={ styles.hillenbrandTitle }>{"Hillenbrand"}</Text>
                                <Text style={ styles.hillenbrandTime }>{"4:00-10:00 PM"}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={ handleNavigate }>
                            <Image source = { Windsor } style = { styles.windsorDiningImage }/>
                            <Text style={ styles.windsorTitle }>{"Windsor"}</Text>
                            <Text style={ styles.windsorTime }>{"4:00-10:00 PM"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.lastDiningCourt }>
                        <TouchableOpacity onPress={ handleNavigate }>
                            <Image source = { Ford } style = { styles.fordDiningImage } />
                            <Text style={ styles.fordTitle }>{"Ford"}</Text>
                            <Text style={ styles.fordTime }>{"4:00-10:00 PM"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    iconPosition: {
        marginBottom: "2%",
        marginTop: "7%",
        marginRight: "10%",
        marginLeft: "37%",
        aspectRatio: 0.6
    },
    iconSize: {
        marginTop: "5%",
        aspectRatio: 1,
        width: 100,
        height: 100,
    },
    tabBar: {
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "-50%"
    },
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
        marginLeft: "25%",
        width: '50%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    mealsText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    // Dining Facilities
    earhartTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "27%",
        alignItems: "center",
        marginTop: "35%"
    },
    earhartTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "17%",
        alignItems: "center",
        marginTop: "50%"
    },
    earhartDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "5%",
        marginBottom: "5%",
        marginTop:"5%"
    },
    wileyTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "29%",
        alignItems: "center",
        marginTop: "34%",
    },
    wileyTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "15%",
        alignItems: "center",
        marginTop: "49%"
    },
    wileyDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "-1%",
        marginBottom: "5%",
        marginTop: "5%"
    },
    hillenbrandTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "17%",
        alignItems: "center",
        marginTop: "35%"
    },
    hillenbrandTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "18.5%",
        alignItems: "center",
        marginTop: "50%"
    },
    hillenbrandDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "5%",
        marginBottom: "0%",
        marginTop:"5%"
    },
    windsorTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "23%",
        alignItems: "center",
        marginTop: "34%"
    },
    windsorTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "15.5%",
        alignItems: "center",
        marginTop: "47%"
    },
    windsorDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "-0.5%",
        marginBottom: "0%",
        marginTop: "5%"
    },
    fordTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "20%",
        alignItems: "center",
        marginTop: "10%"
    },
    fordTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "13%",
        alignItems: "center",
        marginTop: "17%"
    },
    fordDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "6%",
        marginBottom: "50%",
        marginTop: "-5%"
    },
    imageContainer: {
        flexDirection: "row",
        marginLeft: "5%",
        marginRight: "5%",
        alignItems: "center"
    },
    lastDiningCourt: {
        alignItems: "center",
        marginTop: "10%"
    },
});

export default DiningFacilities;
