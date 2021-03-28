import React, { useState, useEffect } from "react";
import { Image, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Switch, TouchableOpacity } from 'react-native';
import { AirbnbRating} from 'react-native-ratings';
import { Button, Toast } from 'native-base';
import SelectMultiple from 'react-native-select-multiple'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import Logo from "../../resources/logo.png";

function Notifications({route, navigation}) {
// const meals = [
//     { label: 'Bangkok Chicken Wrap', value: 21 },
//     { label: 'Moo Shu Chicken', value: 25 },
//     { label: 'Strawberry Gelatin', value: 43 },
//     { label: 'Waffle Fries', value: 20 },
//     { label: 'Firehouse Chili with Pork', value: 35 },
//     { label: 'Gluten Free Cookies', value: 41 },
//     { label: 'Pineapple Chunks', value: 6 },
//     { label: 'Vegan Pub Fried Fish', value: 23 },
//     { label: 'Brown Rice with Mushrooms', value: 47 },
// ]
  const [ratings, setRatings] = React.useState('');
  const [selectedMeals, setSelectedMeals] = React.useState([]);
  const [response, setResponse] = React.useState('');
  const popAction = StackActions.pop();
  const [currentSelectID, setCurrentSelectID] = React.useState([]);
  const [currentSelection, setCurrentSelection] = React.useState([]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
      getFavMeal();
      getFavMealName();
  },[]);

  const onSelectionsChange = newSelections => {
    setSelectedMeals(newSelections)
  }

   function updateRating(rating) {
        setRatings(rating);
    }

    function handleClearMealReview() {
        setSelectedMeals([]);
    }

    // GET request to get the ID(s) of the selected favorite item(s)
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
                        data.map(item => {
                            currentSelectID.push(item.meal_id);
                        })
                    });
                    console.log(currentSelectID)
                } else {
                    console.log('Auth like there was a problem with ID fetching. Status Code: ' +
                        response.status);
                }
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    // GET request to convert selected menu item(s) ID(s) to the respective name(s)
     function getFavMealName() {
     console.log("hereeeeee")
     console.log(currentSelectID)
       currentSelectID.map(item => {
         fetch(`https://purdueeats-304919.uc.r.appspot.com/MenuItems/` + item, {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(
                    function(response) {
                        if (response.status === 200 || response.status === 201) {
                            // Successful GET
                            // Set Fields to correct values
                            response.json().then(function(data) {
                                currentSelection.push({ label: data.item_name, value: item });
                                const unique = currentSelection
                                    .map(e => e['value'])
                                    // store the keys of the unique objects
                                    .map((e, i, final) => final.indexOf(e) === i && i)
                                    // eliminate the dead keys & store unique objects
                                    .filter(e => currentSelection[e]).map(e => currentSelection[e]);
                                setCurrentSelection(unique);
                            });
                            console.log(currentSelection);
                        } else {
                            console.log('Getting Menu Items like there was a problem. Status Code: ' +
                                response.status);
                        }
                    }
                )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });
            })
        }

//     function toggleFunction() {
//       meals.map(item => {
//       <View>
//         <View>
//             <Switch
//                 trackColor={{ false: "#767577", true: "#81b0ff" }}
//                 thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
//                 ios_backgroundColor="#3e3e3e"
//                 onValueChange={toggleSwitch}
//                 value={isEnabled}
//               />
//           </View>
//       </View>
//       })
//     }

    const Item = ({ label }) => (
      <View style={styles.item}>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
    const renderItem = ({ item }) => (
        <View style={{flexDirection:"row"}}>
            <View style={{alignItems: 'flex-end'}}>
                <Item label={item.label} />
            </View>
            <View style={{position: 'absolute', right: 10, bottom: 20}}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
            </View>
        </View>
    );

    return (
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={ [styles.screenView, {flexDirection:"row"}] } >
                  <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                      <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                  </TouchableOpacity>
                  <Image style={ styles.logoImage } source={ Logo } />
              </View>
              <View>
                    <Text style={ styles.screenTitle }>Favorite Meal {"\n"} Notification Preferences</Text>
              </View>
              <View>
                  <SafeAreaView style={styles.container}>
                    <FlatList
                      data={currentSelection}
                      renderItem={renderItem}
                      keyExtractor={item => item.value}
                    />
                  </SafeAreaView>
              </View>
              <View>
              </View>
          </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenView: {
        marginTop: "5%",
        marginLeft: "30%",
        marginRight: "30%",
        alignItems: "center",
    },
    button: {
        marginLeft: "-61%",
        marginRight: "73%",
    },
    logoImage: {
        height: 80,
        width: 80,
        marginRight: "15%",
        marginTop: "10%",
        marginBottom: "3%",
        alignItems: "center",
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
        marginLeft: "80%",
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
export default Notifications
