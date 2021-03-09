import React, { useState, useEffect, Component, Fragment } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import { AirbnbRating, TouchableOpacity} from 'react-native-ratings';
import { Button, Item, Toast } from 'native-base';
import Logo from "../../resources/logo.png";
import SelectMultiple from 'react-native-select-multiple'
// import * as axios from 'axios';


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

//   function handleMealReview() {
//     fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItemReview/`, {
//         method: 'GET',
//         headers : {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//          }
//      })
//          .then(response => response.json())
//          .then(response => setResponse(response))
//     fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItemReview/`, {
//         method: 'POST',
//         headers : {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//          },
//          body: JSON.stringify( {
//             'user_id': 2373328848193777032,
//             'menu_item_id': 1,
//             'rating': 1,
//             'timestamp': "2021-03-04T06:23:29.468000+00:00"
//          })
//      })
//          .then(response => response.json())
//          .then(response => setResponse(response))
//          console.log(ratings)
//     navigation.navigate("MealReview")
//    }

    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Incorrect username/password combination.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }


    function handleMealReview() {
        console.log("hit");
        fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItemReview/`, {
        	method: 'POST',
        	headers : {
        	    'Accept': 'application/json',
        		'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": "-6583805008624267670",
                "menu_item_id": 1,
                "rating": ratings,
                "timestamp": "2021-03-09T06:23:29.468000+00:00"
            })
        })
//             .then(
//                 function(response) {
//                     if (response.status === 201) {
//                                 // Successful POST
//                                 console.log('YAYYYY ' + response.status);
//                                 navigation.navigate("MealReview")
//                      } else {
//                         console.log('Looks like there was a problem. Status Code: ' +
//                                     response.status);
//                         console.log('rating cuh ' + ratings);
//                         console.log('meals cuh ' + selectedMeals);
//                         displayError();
//                      }
//                  }
//             )
//             .catch(function(err) {
//                 console.log('Fetch Error :-S', err);
//             });
//             console.log('YEET');
            .then((response) => response.json())
                    .then((responseData) => {
                                             console.log("inside responsejson");
                                             console.log('response object:',responseData);
//         console.log(parseInt(route.params.UserId));

                     }).done();
    }

   function updateRating(rating) {
        setRatings(rating);
    }

    function handleClearMealReview() {
        setSelectedMeals([]);
    }
    return (
          <View showsVerticalScrollIndicator={false}>
              <View style={ styles.screenView }>
                <Image style={ styles.logoImage } source={ Logo } />
                    <Text style={ styles.screenTitle }>Record Meal</Text>
              </View>
              <View style={ styles.ratingView }>
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
                <View style={ styles.selectMultipleView }>
                    <SelectMultiple
                      items={meals}
                      selectedItems={selectedMeals}
                      onSelectionsChange={onSelectionsChange}
                      />
                </View>
              </View>
              <View style={ styles.buttonView }>
                  <View style={{ flexDirection:"row" }}>
                    <Button style={ styles.cancelButtonComponent } onPress= { handleClearMealReview }>
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
        marginBottom: "1%"
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "2%",
    },
    ratingComponent: {
        borderRadius: 10,
    },
    ratingView: {
        marginBottom: "3%",
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
    selectMultipleView: {
        marginBottom: "4%",
    },
    buttonView: {
        marginBottom: "4%",
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
