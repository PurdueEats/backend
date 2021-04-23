import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { Button} from 'native-base';
import Logo from "../../../resources/logo.png";

function TrackMeals({route, navigation}) {
    const { colors } = useTheme();

    const [currentSelectID, setCurrentSelectID] = React.useState([]);
    const [currentSelection, setCurrentSelection] = React.useState([]);
    const [removeSelection, setRemoveSelection] = React.useState([]);
    const [label, setLabel] = useState('');
    const [bool, setBool] = useState('a');
    const [sortBool, setSortBool] = useState('0');

    const EmptyListMessage = ({item}) => {
        return (
            // Flat List Item
            <Text
                style={styles.emptyListStyle}
                onPress={() => getItem(item)}>
                No Data Found
            </Text>
        );
    };

    useEffect(() => {
        getMealIds();
        getSort();
    },[]);

    function handleSort() {
        if (sortBool === "0") {
            sortList();
        }
        else {
            sortListOpposite();
        }

    }

    function getSort() {
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
                                if (data["schedule"].substring(43, 44) === "1") {
                                    setSortBool("1");
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

    function sortList() {
        currentSelection.sort(function(a, b) { return a.timestamp < b.timestamp; });

        setBool('a');
        setBool('b');
    }

    function sortListOpposite() {
        currentSelection.sort(function(a, b) { return a.timestamp > b.timestamp; });

        setBool('a');
        setBool('b');
    }

    function getMealIds() {

        fetch(`https://app-5fyldqenma-uc.a.run.app/MenuItemReview/`  + route.params.UserID, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' +  route.params.token
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful GET
                        // Set fields to correct values
                        return response.json();
                    } else {
                        console.log('Auth like there was a problem with ID fetching. Status Code: ' +
                            response.status);
                    }
                }
            ).then(item => {
            item.map(item1 => {
                fetch(`https://app-5fyldqenma-uc.a.run.app/MenuItems/` + item1.menu_item_id, {
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
                                    currentSelection.push( { label: data.item_name, value: item1.menu_item_id, timestamp: item1.timestamp } );
                                });
                                setBool('b');
                                setBool('a');
                            } else {
                                console.log('Getting Menu Item` like there was a problem. Status Code: ' +
                                    response.status);
                            }
                        }
                    )
                    .catch(function(err) {
                        console.log('Fetch sdfError :-S', err)
                    });
            })

                .catch(function(err) {
                    console.log('Fetch Error :-S', err)
                });

        }).catch(function(err) {
            console.log("err:", err);
        });
    }

    // GET request to convert selected menu item(s) ID(s) to the respective name(s)
    function getMealInfo() {
        currentSelectID.map(item => {
            fetch(`https://app-5fyldqenma-uc.a.run.app/MenuItems/` + item.value, {
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
                                currentSelection.push( { label: data.item_name, value: item.value, timestamp: item.timestamp } );
                            });
                            console.log(currentSelection)
                        } else {
                            console.log('Getting Menu Item` like there was a problem. Status Code: ' +
                                response.status);
                        }
                    }
                )
                .catch(function(err) {
                    console.log('Fetch sdfError :-S', err);
                });
        })
    }

    function getMealInfo2(value) {
        fetch(`https://app-5fyldqenma-uc.a.run.app/MenuItems/` + value, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        console.log("got to here")
                        // Successful GET
                        // Set Fields to correct values
                        response.json().then(function(data) {
                            setLabel(data.item_name);
                        });
                    } else {
                        console.log('Getting Menu Items like there was a problem. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch sdfError :-S', err)
            });

    }

    const Item = ({ label }) => (
        <View style={styles.foodText}>
            <Text style={styles.label}>{label}</Text>
        </View>
    );

    function renderItem(item) {
        return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button style={ styles.foodButton } onPress={() =>  navigation.navigate("MealNutrition", { UserID: route.params.UserID, token: route.params.token,
                MealName: item.item.label,
                MealID: item.item.value }) }>
                    <View style={ styles.buttonText }>
                        <Text style={ styles.buttonText }> { item.item.label  + " " + item.item.timestamp.substring(2, item.item.timestamp.length - 6) }   </Text>
                    </View>
                    <View style={{flexDirection: "column"}}>
                        <View style = {{flexDirection: "row"}}>
                            <Text style={styles.buttonText}>{currentSelection.label}</Text>
                        </View>
                    </View>
            </Button>
        </View>

        );
    }

    return (
        // Do not remove ScrollView. Adds scrolling to screens.
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ [styles.screenView, {flexDirection:"row"}] } >
                <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
            <View style={ styles.sortView }>
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Track Meals</Text>
                <Button style={ styles.sortButton } onPress={ () => handleSort() }>
                    <Text style={ styles.sortText }>Sort</Text>
                </Button>
            </View>
            <View style={ styles.foodButtonView }>
                <FlatList
                    data={ currentSelection }
                    renderItem={ (item) => renderItem(item) }
                    extraData={ bool.state }
                    keyExtractor={item => { Math.random().toString(36).substring(5) } }
                    ListEmptyComponent={ EmptyListMessage }
                />
            </View>
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
    foodText: {
        color: 'white',
    },
    foodButtonView: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    foodButton: {
        marginBottom: "5%",
        backgroundColor: 'red',
        width: '100%',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: "center",
    },
    sortView: {
        paddingLeft: "20%",
        paddingRight: "20%",
        marginBottom: "10%"
    },
    sortButton: {
        marginBottom: "5%",
        width: '100%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    viewCenter: {
        alignItems: "center",
        justifyContent: "center",
    },
    logoImage: {
        height: 80,
        width: 80,
        marginTop: "10%",
        marginBottom: "3%",
        alignItems: "center",
        justifyContent: 'center',
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "2%",
        justifyContent: 'center'
    },
    sortTitle: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "2%",
        justifyContent: "center",
    },
    container: {
        flex: 0,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
    },
    item: {
        backgroundColor: 'red',
    },
     buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        justifyContent: 'center',
        textAlign: "center"
    },
    sortText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        },
});

export default TrackMeals;
