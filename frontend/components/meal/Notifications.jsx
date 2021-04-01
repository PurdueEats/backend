import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Button } from 'native-base';
import Logo from "../../resources/logo.png";
import MaterialTabs from 'react-native-material-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { StackActions } from '@react-navigation/native';
import SelectMultiple from 'react-native-select-multiple'

function Notifications({route, navigation}) {
    //Tab selection
    const [selectedTab, setSelectedTab] = React.useState(0);
    //Current fav meals w/ notifications on
    const [notiOn, setNotiOn] = React.useState([]);
    //Current fav meals w/o notifications on
    const [notiOff, setNotiOff] = React.useState([]);
    //Response status
    const [response, setResponse] = React.useState('');
    //Current Selection of Notifications On
    const [currentSelection, setCurrentSelection] = React.useState([]);
    //Current Selection of Notifications Off
    const [currentSelectionOff, setCurrentSelectionOff] = React.useState([]);
    //Current selected Fav Meals
    const [selectedFavMeals, setSelectedFavMeals] = React.useState([]);
    //Current selection of meals for their notifications to turn off
    const [removeSelection, setRemoveSelection] = React.useState([]);

    useEffect(() => {
        getFavMeal();
    },[]);

    const onSelectionsChange = newSelections => {
      setNotiOn(newSelections);
    }

    const onFavSelectionsChange = favSelections => {
      setNotiOff(favSelections);
    }

// GET request to get the selected favorite item(s)
    function getFavMeal() {
       fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/` + route.params.UserID + '/UserFavMeals', {
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
                    // Set fields to correct values
                    response.json().then(function(data) {
                        setCurrentSelection(data.map(menuItem => ({ label: menuItem.name, value: menuItem.meal_id })));
                    });
                } else {
                    console.log('Auth like there was a problem with favorite meals fetching. Status Code: ' +
                        response.status);
                }
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    function addNoti() {
        const updatedList = currentSelection.concat(selectedFavMeals);
        setCurrentSelection(updatedList);
        setSelectedFavMeals([]);
    }

    function removeNoti() {
        currentSelectID.pop(item.meal_id);
        setRemoveSelection([]);
        const updatedList = currentSelection.concat(selectedFavMeals);
        setCurrentSelection(updatedList);
    }

    // POST request to turn notifications on
    function handleFavMealNotificationsOn() {
        //add to noti on list
        const updatedList = currentSelection.concat(notiOn);
        setCurrentSelection(updatedList);
        //remove from noti off list
        const filtered = currentSelectionOff.filter(item => !notiOn.map(i => i.value).includes(item.value));
        setCurrentSelectionOff(filtered);
        setSelectedFavMeals([]);
        setNotiOn([]);
        //remove duplicates from currentSelection
//         setCurrentSelection(currentSelection
//             .map(e => e.value)
//             .map((e, i, final) => final.indexOf(e) === i && i)
//             .filter(e => currentSelection[e])
//             .map(e => currentSelection[e])
//             .map(menuItem => ({
//                 value: menuItem.value
//             })));
        notiOn.map(item => {
            console.log("hit");
            fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/` + route.params.UserID + '/UserFavMeals', {
                method: 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.token
                },
                body: JSON.stringify({
                     "user_id": route.params.UserID.toString(),
                     "meal_id": item.value,
                     "name": item.label,
                     "toggle": true
                })
            })
                .then(
                    function(response) {
                        if (response.status === 200 || response.status === 201) {
                            // Successful POST
                            displayConfirmation();
//                             response.json().then(function(data) {
//                                 //remove duplicates from currentSelection
//                                 setCurrentSelection(data
//                                     .map(e => e.value)
//                                     .map((e, i, final) => final.indexOf(e) === i && i)
//                                     .filter(e => data[e])
//                                     .map(e => data[e])
//                                     .map(menuItem => ({
//                                         value: menuItem.value
//                                     })));
//                             });
                        } else {
                            // Examine the text in the response
                            console.log('Looks like there was a problem recording meals. Status Code: ' +
                                response.status);
                            displayError();
                        }
                    }
                )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });
        })
    }

    // POST request to turn notifications off
    function handleFavMealNotificationsOff() {
        //add to noti off list
        const updatedList = currentSelectionOff.concat(notiOff);
        setCurrentSelectionOff(updatedList);
        //add to noti on list
        const filtered = currentSelection.filter(item => !notiOff.map(i => i.value).includes(item.value));
        setCurrentSelection(filtered);
        setRemoveSelection([]);
        setNotiOff([]);
//         setCurrentSelectionOff(currentSelectionOff
//             .map(e => e.value)
//             .map((e, i, final) => final.indexOf(e) === i && i)
//             .filter(e => currentSelectionOff[e])
//             .map(e => currentSelectionOff[e])
//             .map(menuItem => ({
//                 value: menuItem.value
//             })));
        notiOff.map(item => {
            console.log("hit");
            fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/` + route.params.UserID + '/UserFavMeals', {
                method: 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.token
                },
                body: JSON.stringify({
                     "user_id": route.params.UserID.toString(),
                     "meal_id": item.value,
                     "name": item.label,
                     "toggle": false
                })
            })
                .then(
                    function(response) {
                        if (response.status === 200 || response.status === 201) {
                            // Successful POST
                            displayConfirmation();
                            response.json().then(function(data) {
                                //remove any duplicates from noti off list
//                                 setCurrentSelectionOff(data
//                                     .map(e => e.value)
//                                     .map((e, i, final) => final.indexOf(e) === i && i)
//                                     .filter(e => data[e])
//                                     .map(e => data[e])
//                                     .map(menuItem => ({
//                                         value: menuItem.value
//                                     })));
                            });
                        } else {
                            // Examine the text in the response
                            console.log('Looks like there was a problem recording meals. Status Code: ' +
                                response.status);
                            displayError();
                        }
                    }
                )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });
        })
    }

    return (
        <ScrollView>
            <View style={ [styles.iconPosition, {flexDirection:"row"}] }>
                <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Image source = { Logo } style = { styles.iconSize } />
                <View style={ styles.title }>
                    <Text style={ styles.screenTitle }>Notification Preferences</Text>
                </View>
            </View>

            <View style={styles.tabBar}>
                <MaterialTabs
                    items={['Notifications On', 'Notifications Off']}
                    selectedIndex={selectedTab}
                    onChange={setSelectedTab}
                    barColor="#ffffff"
                    indicatorColor="#000000"
                    activeTextColor="#000000"
                    inactiveTextColor="#908c8c"
                />
            </View>
            {selectedTab === 0 ? (
                <View>
                    <View style={ styles.selectMultipleView }>
                        <SelectMultiple
                          items={currentSelection}
                          selectedItems={notiOff}
                          onSelectionsChange={onFavSelectionsChange}
                          />
                    </View>
                    <View style={ [styles.buttonView, {alignItems:"center"}] }>
                        <Button style={ styles.favoriteButtonComponent } onPress= { handleFavMealNotificationsOff }>
                            <Text style={ styles.favoriteButtonText }>Remove</Text>
                        </Button>
                    </View>
                </View>
            ): (
                <View>
                    <View style={ styles.selectMultipleView }>
                        <SelectMultiple
                          items={currentSelectionOff}
                          selectedItems={notiOn}
                          onSelectionsChange={onSelectionsChange}
                          />
                    </View>
                    <View style={ [styles.buttonView, {alignItems:"center"}] }>
                        <Button style={ styles.favoriteButtonComponent } onPress= { handleFavMealNotificationsOn }>
                            <Text style={ styles.favoriteButtonText }>Add</Text>
                        </Button>
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
    title: {
        marginTop: "55%",
        marginLeft: "-85%",
    },
    screenTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black"
    },
    button: {
        marginLeft: "-65%",
        marginTop: "20%",
        marginRight: "50%",
    },
    tabBar: {
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "-50%"
    },
    selectMultipleView: {
        marginTop: "5%",
    },
    buttonView: {
        marginTop: "5%",
    },
    favoriteButtonComponent: {
        flex: 1,
        width: '50%',
        height: '100%',
        marginLeft: '25%',
        left: 0,
        justifyContent: 'center',
        backgroundColor: "red",
    },
    favoriteButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    notiView: {
        marginTop: "10%",
        marginLeft: "30%",
    },
});

export default Notifications