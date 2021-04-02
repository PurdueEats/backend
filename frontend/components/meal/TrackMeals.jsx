import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { Button} from 'native-base';
import Logo from "../../resources/logo.png";
import SelectMultiple from 'react-native-select-multiple'

function TrackMeals({route, navigation}) {

    const [currentSelectID, setCurrentSelectID] = React.useState([]);
    const [currentSelection, setCurrentSelection] = React.useState([]);
    const [removeSelection, setRemoveSelection] = React.useState([]);
    const [label, setLabel] = useState('');
    const [valueTest, setValueTest] = useState('');
    const [bool, setBool] = useState('a');
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
        //testList();
        //setCurrentSelectID([]);
        //getMealIds();
        //sortList();

        getMealIds2();

    },[]);

    function sortList() {
        currentSelection.sort(function(a, b) { return a.timestamp < b.timestamp; });

        setBool('a');
        setBool('b');
    }

    function getMealIds() {
        fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItemReview/`  + route.params.UserID, {
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
                        console.log("fetch1 worked");
                        // Successful GET
                        // Set fields to correct values
                        response.json().then(function(data) {                            //currentSelectID.push(item.menu_item_id);
                            setCurrentSelectID(data.map(menuItem => ({ value: menuItem.menu_item_id, timestamp: menuItem.timestamp })));

                        });
                        //console.log(currentSelection);

                    } else {
                        console.log('Auth like there was a problem with ID fetching. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err)
            });

    }

    function getMealIds2() {

        fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItemReview/`  + route.params.UserID, {
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

                        /* response.json().then(function(data) {                            //currentSelectID.push(item.menu_item_id);
                            setCurrentSelectID(data.map(menuItem => ({ value: menuItem.menu_item_id, timestamp: menuItem.timestamp })));

                        }); */
                        //console.log(currentSelectID);
                        return response.json();
                    } else {
                        console.log('Auth like there was a problem with ID fetching. Status Code: ' +
                            response.status);
                    }
                }
            ).then(item => {
            item.map(item1 => {
                fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItems/` + item1.menu_item_id, {
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
                                    //setCurrentSelection( ({ label: data.item_name, value: item.id, timestamp: item.timestamp } ));
                                });

                                setBool('b');
                                //sortList();
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
            console.log("err");
        });
    }



    function testList() {
        //setCurrentSelectID(meals.map(item => {item.value}));
        setCurrentSelection(meals.map(item => ({ label: item.label, value: item.value })));

        //     console.log(currentSelectID);


    }

    // GET request to convert selected menu item(s) ID(s) to the respective name(s)
    function getMealInfo() {
        currentSelectID.map(item => {
            fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItems/` + item.value, {
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
                                //setCurrentSelection( ({ label: data.item_name, value: item.id, timestamp: item.timestamp } ));
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
        fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItems/` + value, {
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
                            //setCurrentSelection( ({ label: data.item_name, value: item.id, timestamp: item.timestamp } ));
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
            <View styles={ styles.viewCenter }>
                <Text style={ styles.screenTitle }>Track Meals</Text>
                <Button style={ styles.sortButton } onPress={ () => sortList()}>
                    <Text style={ styles.sortText }>Sort</Text>
                </Button>
                <View>
                        <FlatList
                            data={ currentSelection }
                            renderItem={ (item) => renderItem(item) }
                            extraData={ bool.state }
                            keyExtractor={item => { Math.random().toString(36).substring(5) } }
                            ListEmptyComponent={ EmptyListMessage }

                        />
                </View>
            </View>
        </ScrollView>
    );
}
/* <FlatList
     data={currentSelection}
     renderItem={renderItem}
     keyExtractor={item => item.value}
   /> */


const styles = StyleSheet.create({
    screenView: {
        marginTop: "5%",
        marginLeft: "30%",
        marginRight: "30%",
        alignItems: "center",
        justifyContent: 'center',
    },

    foodText: {
        color: 'white',
    },

     foodButton: {
        marginBottom: "5%",
        backgroundColor: 'red',
        width: '60%',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: "center",
    },

    sortButton: {
        marginBottom: "5%",
        backgroundColor: 'red',
        width: '100%',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: "center",
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
    },

    sortText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        },

});

export default TrackMeals;
