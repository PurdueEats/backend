import React, { useState, useEffect, Component, Fragment } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import { AirbnbRating, TouchableOpacity} from 'react-native-ratings';
import { Button, Item } from 'native-base';
import Logo from "../../resources/logo.png";
import SelectMultiple from 'react-native-select-multiple'

const meals = [ "Hamburger", "Balsamic Chicken", "Hotdog", "Pizza", "Beef Broccoli Stirfry", "Grilled Cheese", "BBQ Chicken Quesadilla", "Caesar Salad", "Grilled Chicken Breast" ]
const selectedMealsList = []
function MealReview({navigation}) {
  //state = { selectedFruits: [] }
  const [selectedMeals, setSelectedMeals] = useState([]);

  onSelectionsChange = ( meals ) => {
    // selectedFruits is array of { label, value }
    //this.setState({ selectedFruits })
    selectedMealsList.push(meals)
  }

  function handleRecordMeal() {
    // Sample code for sending package to API
    // MenuItemReview Post request
  	// fetch(`/api/db/getBusinessData/` + params, {
    // 	method: 'GET',
  	// 	headers : {
  	// 		'Content-Type': 'application/json',
  	// 		'Accept': 'application/json'
  	// 	}
  	// })
  	// 	.then(response => response.json())
  	// 	.then(response => this.setState({ "response" : response }))
    navigation.navigate("MealReview")
   }

    return (
          <ScrollView showsVerticalScrollIndicator={false}>
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
                      selectedItems={selectedMealsList}
                      onSelectionsChange={onSelectionsChange}
                      />
                  </View>
              </View>
              <View>
                  <View style={{ flexDirection:"row" }}>
                    <Button style={ styles.cancelButtonComponent }>
                        <Text style={ styles.cancelButtonText }>Cancel</Text>
                    </Button>
                    <Button style={ styles.confirmButtonComponent } onPress={ handleRecordMeal }>
                        <Text style={ styles.confirmButtonText }>Confirm</Text>
                    </Button>
                  </View>
              </View>
          </ScrollView>
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
