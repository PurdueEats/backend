import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Button } from 'native-base';
import Logo from "../../resources/logo.png";
import MaterialTabs from 'react-native-material-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import SelectMultiple from 'react-native-select-multiple'


const meals = [
    { label: 'Bangkok Chicken Wrap', value: 21 },
    { label: 'Moo Shu Chicken', value: 25 },
    { label: 'Strawberry Gelatin', value: 43 },
    { label: 'Waffle Fries', value: 20 },
    { label: 'Firehouse Chili with Pork', value: 35 },
    { label: 'Gluten Free Cookies', value: 41 },
    { label: 'Pineapple Chunks', value: 6 },
    { label: 'Vegan Pub Fried Fish', value: 23 },
    { label: 'Brown Rice with Mushrooms', value: 47 },
]

function FavoriteMeals({route, navigation}) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [currentSelection, setCurrentSelection] = useState([]);
    const [removeSelection, setRemoveSelection] = useState([]);
    const [selectedFavMeals, setSelectedFavMeals] = React.useState([]);


    /*function handleNavigate() {
        navigation.navigate("Menu", { UserID: route.params.UserID, token: route.params.token });
    }*/

    const onSelectionsChange = newSelections => {
      setSelectedFavMeals(newSelections);
    }

    const onFavSelectionsChange = favSelections => {
      setRemoveSelection(favSelections);
    }

    function handleFavMeal() {
      setCurrentSelection(selectedFavMeals);
      setSelectedFavMeals([]);
//       console.log(currentSelection)
    }

    function handleRemoveMeal() {
      console.log("Hit");
      console.log(removeSelection);
//       currentSelection = currentSelection.filter((item) => !removeSelection.includes(item));
      setCurrentSelection(currentSelection);
//       console.log(currentSelection);
    }

    return (
        <ScrollView>
            <View style={ [styles.iconPosition, {flexDirection:"row"}] }>
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
                        <Button style={ styles.favoriteButtonComponent } onPress= { handleRemoveMeal }>
                            <Text style={ styles.favoriteButtonText }>Remove</Text>
                        </Button>
                    </View>
                </View>
            ): (
                <View>
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
});

export default FavoriteMeals;
