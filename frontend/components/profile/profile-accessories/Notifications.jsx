import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Button, Toast } from 'native-base';
import Logo from "../../../resources/logo.png";
import { useTheme } from '@react-navigation/native';
import MaterialTabs from 'react-native-material-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackActions } from '@react-navigation/native';
import SelectMultiple from 'react-native-select-multiple'

function Notifications({route, navigation}) {
    const { colors } = useTheme();
    //Tab selection
    const [selectedTab, setSelectedTab] = React.useState(0);
    //Current fav meals w/ notifications on
    const [notiOn, setNotiOn] = React.useState([]);
    //Current fav meals w/o notifications on
    const [notiOff, setNotiOff] = React.useState([]);
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

    //Toast message for recording fav meal successfully
    function displayConfirmation() {
        Toast.show({
            style: { backgroundColor: "green", justifyContent: "center" },
            position: "top",
            text: "Notification turned on successfully.",
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
            text: "Notification failed turning on. Please try again.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
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
        notiOn.map(item => {
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
    }

    //Toast message for recording fav meal successfully
    function displayConfirmation2() {
        Toast.show({
            style: { backgroundColor: "green", justifyContent: "center" },
            position: "top",
            text: "Notification turned off successfully.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    //Toast message for error
    function displayError2() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Notification failed turning off. Please try again.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
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
        notiOff.map(item => {
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
                     "toggle": false
                })
            })
                .then(
                    function(response) {
                        if (response.status === 200 || response.status === 201) {
                            // Successful POST
                            displayConfirmation2();
                        } else {
                            // Examine the text in the response
                            console.log('Looks like there was a problem recording meals. Status Code: ' +
                                response.status);
                            displayError2();
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
                    <Text style={ [styles.screenTitle, {color: colors.text}] }>Notification Preferences</Text>
                </View>
            </View>

            <View style={ [styles.tabBar, {backgroundColor: colors.background}]}>
                <MaterialTabs
                    items={['Notifications On', 'Notifications Off']}
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
                          selectedItems={notiOff}
                          onSelectionsChange={onFavSelectionsChange}
                          labelStyle={{ color: colors.text}}
                          rowStyle={{ backgroundColor: colors.background}}
                          checkboxStyle={{ backgroundColor: "#f2f2f2", borderRadius: 10 }}
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
                          labelStyle={{ color: colors.text}}
                          rowStyle={{ backgroundColor: colors.background}}
                          checkboxStyle={{ backgroundColor: "#f2f2f2", borderRadius: 10 }}
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
