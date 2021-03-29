import React, { useState } from "react";
import { Image, StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Button, Item } from 'native-base';
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


  const onSelectionsChange = newSelections => {
    setSelectedMeals(newSelections)
  }

function MealHistory({route, navigation}) {

    return (
    <View style={styles.viewFlex}>
        <View style={ styles.viewCenter }>
            <View style={ styles.profileHeader }>
                <View style={ styles.backImage }>
                    <Text style={ styles.profileWord }>           </Text>
                </View>
                <Text style={ styles.profileWord }>Meal History</Text>
                <Text style={ styles.profileWord }>           </Text>
            </View>

        </View>
            <ScrollView style={styles.scrollView} >

            <View style={ styles.selectMultipleView }>
                <SelectMultiple
                  items={meals}
                  onSelectionsChange={onSelectionsChange}
                  />
            </View>
        </ScrollView>
     </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 30,
    },
    viewFlex: {
        flex: 1,
    },
    backImage: {
        width: 60,
        height: 60
    },
    profileWord: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        color: "black",
        fontSize: 22,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    viewCenter: {
        alignItems: "center",
        justifyContent: "center",
    },

});

export default MealHistory;