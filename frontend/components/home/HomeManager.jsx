import React, {useEffect, useState} from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View, Text, TouchableOpacity, Modal} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { ProgressChart } from "react-native-chart-kit";
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialTabs from 'react-native-material-tabs';
import RecommendedMeals from "./home-accessories/RecommendedMeals";
import AllUserSummary from "./home-accessories/AllUserSummary";
import Logo from "../../resources/logo.png";
import Earhart from "../../resources/earhart.png";
import Wiley from "../../resources/wiley.png";
import Ford from "../../resources/ford.png";
import Hillenbrand from "../../resources/hillenbrand.png";
import Windsor from "../../resources/windsor.png";
import {Button} from "native-base";

function HomeManager({route, navigation}) {
    const { colors } = useTheme();
    // Setup re-render on focus change
    const isFocused = useIsFocused();
    // Recommended Meals
    const [calories, setCalories] = useState(1);
    const [carbs, setCarbs] = useState(1);
    const [fat, setFat] = useState(1);
    const [protein, setProtein] = useState(1);
    // Set chart visibility
    const [showChart, setShowChart] = useState(true);
    // Chart Data
    const [chartCalories, setChartCalories] = useState(0);
    const [chartCarbs, setChartCarbs] = useState(0);
    const [chartFat, setChartFat] = useState(0);
    const [chartProtein, setChartProtein] = useState(0);
    // Dining Courts
    const [selectedTab, setSelectedTab] = useState(0);

    // Current Date (For fun fact)
    var moment = require('moment-timezone');
    var time = moment().tz('America/New_York').utcOffset("−05:00").format();
    var date = time.substring(0, time.indexOf('T'));

    // Modal for Fun Fact
    const [modalFact, setModalFact] = useState(false);

    // Fun Fact
    const [funFact, setFunFact] = useState('');
    const [fact, setFact] = useState(false);
    const [loginFirst, setLoginFirst] = useState(true);

    useEffect(() => {
        if (isFocused) {
            if (loginFirst) {
                getFact();
                setLoginFirst(false);
            }
            getUserNutrition();
        }
    }, [isFocused]);

    function getFact() {
          //retrieves setting
          fetch('https://app-5fyldqenma-uc.a.run.app/Users/'+ route.params.UserID +'/Schedule', {
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
                                setFact(data["schedule"].substring(42, 43));
                                if (data["schedule"].substring(42, 43) === "1") {
                                    getFunFact();
                                }
                            });
                        } else {
                            // Examine the text in the response
                            console.log('Looks like there was a problem retrieving schedule. Status Code: ' +
                                response.status);
                        }
                    }
                )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });
      }

    function getUserNutrition() {
        // User Nutrition Summary Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + route.params.UserID + "/Nutrition", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            }
        })
            .then(
                function (response) {
                    if (response.status !== 200 && response.status !== 201) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                    } else {
                        // Examine the text in the response
                        response.json().then(function (data) {
                            // Set data fields
                            if (data["calories"] > 0) {
                                setCalories(data["calories"]);
                            }
                            if (data["carbs"] > 0) {
                                setCarbs(data["carbs"]);
                            }
                            if (data["fat"] > 0) {
                                setFat(data["fat"]);
                            }
                            if (data["protein"] > 0) {
                                setProtein(data["protein"]);
                            }
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

    function getFunFact() {
        // User Nutrition Summary Route
        fetch(`https://app-5fyldqenma-uc.a.run.app/PFF/` + date, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            }
        })
            .then(
                function (response) {
                    if (response.status !== 200 && response.status !== 201) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                            console.log('fact');
                    } else {
                        // Examine the text in the response
                        response.json().then(function (data) {
                            // Set data fields
                            setFunFact(data.fact);
                            setModalFact(true);
                            setFact(true);
                        });
                    }
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }
    function handleSetChart() {
        setShowChart(!showChart);
    }

    function EarhartNavigation() {
        navigation.navigate("Menu", { UserID: route.params.UserID, token: route.params.token, DiningID: 1});
    }
    function HillenbrandNavigation() {
        navigation.navigate("Menu", { UserID: route.params.UserID, token: route.params.token, DiningID: 2});
    }
    function FordNavigation() {
        navigation.navigate("Menu", { UserID: route.params.UserID, token: route.params.token, DiningID: 3});
    }
    function WindsorNavigation() {
        navigation.navigate("Menu", { UserID: route.params.UserID, token: route.params.token, DiningID: 4});
    }
    function WileyNavigation() {
        navigation.navigate("Menu", { UserID: route.params.UserID, token: route.params.token, DiningID: 5});
    }

    function handleWaitTimesNavigate() {
        navigation.navigate("WaitTimes");
    }

    return (
        <ScrollView>
        <Modal animationType="slide" transparent={true} visible={modalFact}
               onRequestClose={() => {
                   setModalFact(!modalFact);
               }}
        >
            <View>
                <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                    <TouchableOpacity active={0.5} style={ styles.backImage } onPress={() =>  setModalFact(false)}>
                        <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                    </TouchableOpacity>
                    <Text style={ [styles.modalTextTitle, {color: colors.text}]}>Did you know?</Text>
                    <Text style={ [styles.modalText, {color: colors.text}]}>           </Text>
                    <Text style={ [styles.modalText, {color: colors.text}]}>{funFact}</Text>
                </View>
            </View>
        </Modal>
            <View style={ [styles.iconPosition, {flexDirection:"row"}] }>
                <Image source = { Logo } style = { styles.iconSize } />
            </View>
            <View style={styles.tabBar}>
                <MaterialTabs
                    items={['Recommended Meals', 'Dining Facilities']}
                    selectedIndex={selectedTab}
                    onChange={setSelectedTab}
                    barColor={colors.background}
                    indicatorColor={colors.text}
                    activeTextColor={"red"}
                    inactiveTextColor={colors.text}
                />
            </View>
            {selectedTab === 0 ? (
                <View style={{ marginBottom: "5%" }}>
                    { showChart ? (
                        <View style={{ marginBottom: "3%" }}>
                            <View style={ styles.recommendedView }>
                                <Text style={ [styles.dataHeader, {color: colors.text}] }>Your eating habits</Text>
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
                                    backgroundColor: colors.background,
                                    backgroundGradientFrom: colors.background,
                                    backgroundGradientTo: colors.background,
                                    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`
                                }}
                            />
                            <View style={ styles.dataView }>
                                <Text style={ [styles.dataText, {color: colors.text}] }>
                                    <Text style={{ fontWeight: "bold"}}>Calories</Text> {calories.toLocaleString()} of 14,000
                                </Text>
                                <Text style={ [styles.dataText, {color: colors.text}] }>
                                    <Text style={{ fontWeight: "bold"}}>Carbohydrates</Text> {carbs.toLocaleString()}g of 1,900g
                                </Text>
                                <Text style={ [styles.dataText, {color: colors.text}] }>
                                    <Text style={{ fontWeight: "bold"}}>Fat</Text> {fat.toLocaleString()}g of 200g
                                </Text>
                                <Text style={ [styles.dataText, {color: colors.text}] }>
                                    <Text style={{ fontWeight: "bold"}}>Protein</Text> {protein.toLocaleString()}g of 350g
                                </Text>
                            </View>
                            <Button onPress={handleSetChart} style={ styles.mealsButton }>
                                <Text style={ styles.mealsText }>Show Other Users' Eating Habits</Text>
                            </Button>
                        </View>
                    ) : (
                        <View style={{ marginBottom: "3%" }}>
                            <AllUserSummary calories={calories} carbs={carbs} fat={fat} protein={protein}/>
                            <Button onPress={handleSetChart} style={ styles.mealsButton }>
                                <Text style={ styles.mealsText }>Show Your Eating Habits</Text>
                            </Button>
                        </View>
                    )}
                    <RecommendedMeals UserID={route.params.UserID} token={route.params.token} navigation={navigation}/>
                </View>
            ) : (
                <View>
                    <View style={ [styles.buttonView, {alignItems:"center"}] }>
                        <Button style={ styles.favoriteButtonComponent } onPress= { handleWaitTimesNavigate }>
                            <Text style={ styles.favoriteButtonText }>View Wait Times</Text>
                        </Button>
                    </View>
                    <View style={ styles.imageContainer }>
                        <View style={{alignItems: "center", justifyContent: "center", flexDirection:"row"}}>
                            <TouchableOpacity onPress={ EarhartNavigation }>
                                <Image source = { Earhart } style = { styles.earhartDiningImage }/>
                                <Text style={ [styles.earhartTitle, {color: colors.text}] }>{"Earhart"}</Text>
                                <Text style={ [styles.earhartTime, {color: colors.text}] }>{"5:00-9:00 PM"}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={ WileyNavigation }>
                            <Image source = { Wiley } style = { styles.wileyDiningImage }/>
                            <Text style={ [styles.wileyTitle, {color: colors.text}] }>{"Wiley"}</Text>
                            <Text style={ [styles.wileyTime, {color: colors.text}] }>{"5:00-9:00 PM"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.imageContainer }>
                        <View style={{alignItems: "center", justifyContent: "center", flexDirection:"row"}}>
                            <TouchableOpacity onPress={ HillenbrandNavigation }>
                                <Image source = { Hillenbrand } style = { styles.hillenbrandDiningImage }/>
                                <Text style={ [styles.hillenbrandTitle, {color: colors.text}] }>{"Hillenbrand"}</Text>
                                <Text style={ [styles.hillenbrandTime, {color: colors.text}] }>{"4:00-9:00 PM"}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={ WindsorNavigation }>
                            <Image source = { Windsor } style = { styles.windsorDiningImage }/>
                            <Text style={ [styles.windsorTitle, {color: colors.text}] }>{"Windsor"}</Text>
                            <Text style={ [styles.windsorTime, {color: colors.text}] }>{"5:00-10:00 PM"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.lastDiningCourt }>
                        <TouchableOpacity onPress={ FordNavigation }>
                            <Image source = { Ford } style = { styles.fordDiningImage } />
                            <Text style={ [styles.fordTitle, {color: colors.text}] }>{"Ford"}</Text>
                            <Text style={ [styles.fordTime, {color: colors.text}] }>{"5:00-9:00 PM"}</Text>
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
        marginLeft: "10%",
        width: '80%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    mealsText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    switch: {
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    // Dining Facilities
    earhartTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "32%",
        alignItems: "center",
        marginTop: "35%"
    },
    earhartTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "23%",
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
        marginTop:"5%",
        borderRadius: 15
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
        marginTop: "5%",
        borderRadius: 15
    },
    hillenbrandTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "20%",
        alignItems: "center",
        marginTop: "35%"
    },
    hillenbrandTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "24%",
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
        marginTop:"5%",
        borderRadius: 15
    },
    windsorTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "24%",
        alignItems: "center",
        marginTop: "34%"
    },
    windsorTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "15.5%",
        alignItems: "center",
        marginTop: "50%"
    },
    windsorDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "-0.5%",
        marginBottom: "0%",
        marginTop: "5%",
        borderRadius: 15
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
        marginLeft: "14%",
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
        marginBottom: "5%",
        marginTop: "-5%",
        borderRadius: 15
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
    buttonView: {
        marginTop: "5%",
        marginBottom: "4%",
    },
    favoriteButtonComponent: {
        marginTop: "1%",
        marginLeft: "25%",
        width: '50%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    favoriteButtonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 200
    },
    modalText: {
        color: "black",
        fontSize: 16,
    },
    modalTextTitle: {
        color: "black",
        fontSize: 18,
    }
});

export default HomeManager;
