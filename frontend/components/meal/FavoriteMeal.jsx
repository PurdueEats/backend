import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Button } from 'native-base';
import Logo from "../../resources/logo.png";
import MaterialTabs from 'react-native-material-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { StackActions } from '@react-navigation/native';
import SelectMultiple from 'react-native-select-multiple'
import { SearchBar } from 'react-native-elements';


function FavoriteMeals({route, navigation}) {
    const [meals, selectedMeals] = React.useState([]);
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [currentSelection, setCurrentSelection] = React.useState([]);
    const [removeSelection, setRemoveSelection] = React.useState([]);
    const [selectedFavMeals, setSelectedFavMeals] = React.useState([]);
    const [currentSelectID, setCurrentSelectID] = React.useState([]);
    const [response, setResponse] = React.useState('');
    const [searched, setSearched] = useState('');


    useEffect(() => {
        getFavMeal();
//         getFavMealName();
        getMeal();
    },[]);

    /*function handleNavigate() {
        navigation.navigate("Menu", { UserID: route.params.UserID, token: route.params.token });
    }*/

    const onSelectionsChange = newSelections => {
      setSelectedFavMeals(newSelections);
    }

    const onFavSelectionsChange = favSelections => {
      setRemoveSelection(favSelections);
    }

    function searchFiltering (searchText) {
        if (!searchText) {
            setSearched(searchText);
            selectedMeals(meals);

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

    // POST request for favorite meal(s)
    function handleFavMeal() {
        const updatedList = currentSelection.concat(selectedFavMeals);
        setCurrentSelection(updatedList);
        selectedFavMeals.map(item => {
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
                .then((response) => response.text())
                        .then((responseData) => {
                         console.log("inside responsejson");
                         console.log('response object:',responseData);
                         console.log(item.value);
                         }).done();
        })
        setSelectedFavMeals([]);
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
//                         data.map(item => {
//                             currentSelectID.push(item.meal_id);
//                         })
                        setCurrentSelection(data.map(menuItem => ({ label: menuItem.name, value: menuItem.meal_id })));
//                         console.log(menuItem.name)
                    });
//                     console.log(currentSelectID)
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
           fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItems/`, {
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
//                             data.map(item => {
//                                 meals.push({ label: item.item_name, value: item.menu_item_id});
//                             })
                            selectedMeals(data.map(menuItem => ({ label: menuItem.item_name, value: menuItem.menu_item_id })));
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

     // DELETE request to remove selected menu items from database
     function removeFavMeal() {
        removeSelection.map(singleMeal => {
            fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/` + route.params.UserID + '/UserFavMeals?menuItemID='+ singleMeal.value, {
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
                         response.json().then(function(data) {
                             const filtered = currentSelection.filter(item => !removeSelection.map(i => i.value).includes(item.value));
                             setCurrentSelection(filtered);
                             currentSelectID.pop(item.meal_id);
                             setRemoveSelection([]);
                         });
                     } else {
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
            <View style={styles.tabBar}>
                <MaterialTabs
                    items={['Your Favorite Meals', 'Select Favorite Meals']}
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
                          selectedItems={removeSelection}
                          onSelectionsChange={onFavSelectionsChange}
                          />
                    </View>
                    <View style={ [styles.buttonView, {alignItems:"center"}] }>
                        <Button style={ styles.favoriteButtonComponent } onPress= { removeFavMeal }>
                            <Text style={ styles.favoriteButtonText }>Remove</Text>
                        </Button>
                    </View>
                    <View style={ styles.notiView }>
                        <TouchableOpacity active = { .5 } onPress={() =>  navigation.navigate("Notifications", { UserID: route.params.UserID, token: route.params.token }) }>
                            <Text style={ styles.textNormal}>Customize Notifications</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ): (
                <View>
                    <SearchBar
                        round
                        searchIcon={{ size: 20 }}
                        placeholder="Look for an item here"
                        value={searched}
                        lightTheme = "true"
                        onChangeText={(searchText) => searchFiltering(searchText)}
                        onClear={(searchText) => searchFiltering('')}
                    />
                    <View style={ styles.selectMultipleView }>
                        <SelectMultiple
                          items={meals}
                          selectedItems={selectedFavMeals}
                          onSelectionsChange={onSelectionsChange}
                          />
                    </View>
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

export default FavoriteMeals;
