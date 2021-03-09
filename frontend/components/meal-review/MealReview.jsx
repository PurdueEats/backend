import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import { Button } from 'native-base';
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

function MealReview({route, navigation}) {

  const [ratings, setRatings] = React.useState('');
  const [selectedMeals, setSelectedMeals] = React.useState([]);
  const [response, setResponse] = React.useState('');

  const onSelectionsChange = newSelections => {
    setSelectedMeals(newSelections)
  }

  function handleMealReview() {
    fetch(`http://127.0.0.1:8000/`, {
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
         }
     })
         .then(response => response.json())
         .then(response => setResponse(response))
    fetch(`http://127.0.0.1:8000/`, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
         },
         body: JSON.stringify( {
            'user_id': 1,
            'menu_item_id': 1,
            'rating': 1,
            'timestamp': "2021-02-27T06:23:29.468000+00:00"
         })
     })
         .then(response => response.json())
         .then(response => setResponse(response))
         console.log(ratings)
      navigation.navigate("MealReview")
   }
   function updateRating(rating) {
        setRatings(rating);
    }

    return (
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={ styles.screenView }>
                <Image style={ styles.logoImage } source={ Logo } />
                    <Text style={ styles.screenTitle }>Record Meal</Text>
              </View>
              <View>
                <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Meh", "OK", "Good", "Amazing"]}
                    type={"custom"}
                    showRating={false}
                    selectedColor={"#ff0000"}
                    defaultRating={3}
                    reviewSize={20}
                    size={25}
                    onFinishRating={ updateRating }
                />
              </View>
              <View>
                <View>
                    <SelectMultiple
                      items={meals}
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
        width: '50%',
        right: 0,
        justifyContent: 'center',
        backgroundColor: "green",
    },
    cancelButtonComponent: {
        flex: 1,
        width: '50%',
        left: 0,
        justifyContent: 'center',
        backgroundColor: "red",
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
