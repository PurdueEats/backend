import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button, Toast } from 'native-base';
import Logo from "../../../resources/logo.png";
import { useTheme } from '@react-navigation/native';
import MaterialTabs from 'react-native-material-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { StackActions } from '@react-navigation/native';
import SelectMultiple from 'react-native-select-multiple'
import { SearchBar } from 'react-native-elements';

function FavoriteMeals({route, navigation}) {
    const { colors } = useTheme();
    //Total meals list
    const [meals, selectedMeals] = React.useState([]);
    const [allMeals, setAllMeals] = React.useState([]);
    //Tab selection
    const [selectedTab, setSelectedTab] = React.useState(0);
    //Current list of User's Fav Meals
    const [currentSelection, setCurrentSelection] = React.useState([]);
    //List of user's Fav Meals to be removed
    const [removeSelection, setRemoveSelection] = React.useState([]);
    //List of fav meals to be added
    const [selectedFavMeals, setSelectedFavMeals] = React.useState([]);
    //Search bar
    const [searched, setSearched] = useState('');

    useEffect(() => {
        getFavMeal();
        getMeal();
    },[]);

    //For select multiple; displays change on click
    const onSelectionsChange = newSelections => {
      setSelectedFavMeals(newSelections);
    }

    const onFavSelectionsChange = favSelections => {
      setRemoveSelection(favSelections);
    }

    //Search bar filtering
    function searchFiltering (searchText) {
        if (!searchText) {
            setSearched(searchText);
            selectedMeals(allMeals);
        }
        if(searchText) {
            const searchData = meals.filter(function (menuItem)
            {
                const menuInfo = menuItem.label ? menuItem.label.toUpperCase() : ''.toUpperCase();
                const textInfo = searchText.toUpperCase();
                return menuInfo.indexOf(textInfo) > -1;
            });
            selectedMeals(searchData);
            setSearched(searchText);
        }
    }

    //Toast message for recording fav meal successfully
    function displayConfirmation() {
        Toast.show({
            style: { backgroundColor: "green", justifyContent: "center" },
            position: "top",
            text: "Favorite Meal(s) recorded successfully.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    //Toast message for error
    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Selecting favorite meal(s) failed. Please try again.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    //POST request for favorite meal(s)
    function handleFavMeal() {
        const updatedList = currentSelection.concat(selectedFavMeals);
        setCurrentSelection(updatedList);
        selectedFavMeals.map(item => {
            fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + route.params.UserID + '/UserFavMeals', {
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
        setSelectedFavMeals([]);
    }

    // GET request to get the selected favorite item(s)
    function getFavMeal() {
       fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + route.params.UserID + '/UserFavMeals', {
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

    // GET request to get all of the menu items
     function getMeal() {
           fetch(`https://app-5fyldqenma-uc.a.run.app/MenuItems/`, {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        response.json().then(function(data) {
                            selectedMeals(data.map(menuItem => ({ label: menuItem.item_name, value: menuItem.menu_item_id })));
                            setAllMeals(data.map(menuItem => ({ label: menuItem.item_name, value: menuItem.menu_item_id })));
                        });
                    } else {
                        console.log('Auth like there was a problem with fetching all menu items. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
     }

    // Toast for successful deletion
    function displayConfirmationDelete() {
        Toast.show({
            style: { backgroundColor: "green", justifyContent: "center" },
            position: "top",
            text: "Favorite Meal(s) deleted successfully.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    // Toast for error in deletion
    function displayErrorDelete() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Deleting favorite meal(s) failed. Please try again.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

     // DELETE request to remove selected menu items from database
     function removeFavMeal() {
        removeSelection.map(singleMeal => {
            fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + route.params.UserID + '/UserFavMeals?menuItemID='+ singleMeal.value, {
                 method: 'DELETE',
                 headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
                     'Authorization': 'Bearer ' + route.params.token
                 },
             })
             .then(
                 function(response) {
                     if (response.status === 200 || response.status === 201) {
                         // Successful DELETE
                         displayConfirmationDelete();
                         response.json().then(function() {
                             const filtered = currentSelection.filter(item => !removeSelection.map(i => i.value).includes(item.value));
                             setCurrentSelection(filtered);
                             setRemoveSelection([]);
                         });
                     } else {
                        displayErrorDelete();
                         console.log('Auth like there was a problem with removing items. Status Code: ' +
                             response.status);
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
            </View>
            <View style={ [styles.tabBar, {backgroundColor: colors.background}]}>
                <MaterialTabs
                    items={['Your Favorite Meals', 'Select Favorite Meals']}
                    selectedIndex={selectedTab}
                    onChange={setSelectedTab}
                    barColor={colors.background}
                    indicatorColor={colors.text}
                    activeTextColor={"red"}
                    inactiveTextColor={colors.text}
                />
            </View>
            {selectedTab === 0 ? (
                <View>
                    <View style={ styles.selectMultipleView }>
                        <SelectMultiple
                          items={currentSelection}
                          selectedItems={removeSelection}
                          onSelectionsChange={onFavSelectionsChange}
                          labelStyle={{ color: colors.text}}
                          rowStyle={{ backgroundColor: colors.background}}
                          checkboxStyle={{ backgroundColor: "#f2f2f2", borderRadius: 10 }}
                          />
                    </View>
                    <View style={ [styles.buttonView, {alignItems:"center"}] }>
                        <Button style={ styles.favoriteButtonComponent } onPress= { removeFavMeal }>
                            <Text style={ styles.favoriteButtonText }>Remove</Text>
                        </Button>
                    </View>
                    <View style={ styles.notiView }>
                        <TouchableOpacity active = { .5 } onPress={() =>  navigation.navigate("Notifications", { UserID: route.params.UserID, token: route.params.token }) }>
                            <Text style={ [styles.textNormal, {color: colors.text}] }>Customize Notifications</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ): (
                <View>
                    <SearchBar
                        round
                        containerStyle={{backgroundColor: colors.background, borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                        searchIcon={{ size: 20 }}
                        placeholder="Look for an item here"
                        value={searched}
                        lightTheme = "true"
                        onChangeText={(searchText) => searchFiltering(searchText)}
                        onClear={(searchText) => searchFiltering('')}
                    />
                    <SelectMultiple
                      items={meals}
                      selectedItems={selectedFavMeals}
                      onSelectionsChange={onSelectionsChange}
                      labelStyle={{ color: colors.text}}
                      rowStyle={{ backgroundColor: colors.background}}
                      checkboxStyle={{ backgroundColor: "#f2f2f2", borderRadius: 10 }}
                      />
                    <View style={ [styles.buttonView, {alignItems:"center"}] }>
                        <Button style={ styles.favoriteButtonComponent } onPress= { handleFavMeal }>
                            <Text style={ styles.favoriteButtonText }>Favorite!</Text>
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
        marginTop: "5%"
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

export default FavoriteMeals;
