import React, { useState, useEffect, Component, Fragment } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import { AirbnbRating, TouchableOpacity} from 'react-native-ratings';
import { Button, Item } from 'native-base';
import Logo from "../../resources/logo.png";
import SelectMultiple from 'react-native-select-multiple'

const meals = [
    { label: 'Hamburger', value: 'ham' },
    { label: 'Balsamic Chicken', value: 'bchick'},
    { label: 'Grilled Chicken', value: 'gchick' },
    { label: 'Hotdog', value: 'hotdog' },
    { label: 'Pizza', value: 'piz' },
    { label: 'Beef Broccoli Stirfry', value: 'bbs' },
    { label: 'Grilled Cheese', value: 'gc' },
    { label: 'BBQ Chicken Quesadilla', value: 'bbqq' },
    { label: 'Caesar Salad', value: 'cs' }
]

const ratings = [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ]

function MealReview({navigation}) {
  //state = { selectedFruits: [] }
  const [selectedMeals, setSelectedMeals] = React.useState([]);

  const onSelectionsChange = newSelections => {
    // selectedFruits is array of { label, value }
    setSelectedMeals(newSelections)
  }

  function handleMealReview() {
    navigation.navigate("MealReview")
   }

    return (
          <View showsVerticalScrollIndicator={false}>
              <View style={ styles.screenView }>
                <Image style={ styles.logoImage } source={ Logo } />
                    <Text style={ styles.screenTitle }>Record Meal</Text>
              </View>
              <View>
                <AirbnbRating
                    //key={index + "Rating"}
                    count={5}
                    reviews={["Terrible", "Meh", "OK", "Good", "Amazing"]}
                    type={"custom"}
                    showRating={false}
                    selectedColor={"#ff0000"}
                    defaultRating={3}
                    reviewSize={20}
                    size={25}
                    //onFinishRating={ updateRating }
                    /*function updateRating(rating) {
                        ratings[index] = rating;
                    }*/
                 />
              </View>
              <View>
                <View>
                    <SelectMultiple
                      items={meals}
                      //selectedItems={this.state.selectedFruits}
                      selectedItems={selectedMeals}
                      onSelectionsChange={onSelectionsChange}
                      />
                </View>
              </View>
              <View>
                  <View style={{ flexDirection:"row" }}>
                    <Button style={ styles.cancelButtonComponent }>
                        <Text style={ styles.cancelButtonText }>Cancel</Text>
                    </Button>
                    <Button style={ styles.confirmButtonComponent } onPress={ handleMealReview }>
                        <Text style={ styles.confirmButtonText }>Confirm</Text>
                    </Button>
                  </View>
              </View>
          </View>
    )
}

const styles = StyleSheet.create({
    screenView: {
        paddingTop: "10%",
        alignItems: "center",
    },
    logoImage: {
        height: 70,
        width: 70,
        marginBottom: "8%"
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center"
    },
    ratingComponent: {
        borderRadius: 10,
    },
    mealText: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: "5%"
    },
    actionView: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    confirmButtonComponent: {
        //position: 'absolute',
        width: '50%',
        right: 0,
        justifyContent: 'center',
        backgroundColor: "green",
        //borderRadius: 10,
    },
    cancelButtonComponent: {
        //position: 'absolute',
        flex: 1,
        width: '50%',
        left: 0,
        justifyContent: 'center',
        backgroundColor: "red",
        //borderRadius: 10,
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
});
export default MealReview
