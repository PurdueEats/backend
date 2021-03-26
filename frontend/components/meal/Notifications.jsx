import React, { useState } from "react";
import { Image, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Switch, TouchableOpacity } from 'react-native';
import { AirbnbRating} from 'react-native-ratings';
import { Button, Toast } from 'native-base';
import SelectMultiple from 'react-native-select-multiple'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import Logo from "../../resources/logo.png";

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

function Notifications({route, navigation}) {
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
  const [ratings, setRatings] = React.useState('');
  const [selectedMeals, setSelectedMeals] = React.useState([]);
  const [response, setResponse] = React.useState('');
  const popAction = StackActions.pop();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onSelectionsChange = newSelections => {
    setSelectedMeals(newSelections)
  }

   function updateRating(rating) {
        setRatings(rating);
    }

    function handleClearMealReview() {
        setSelectedMeals([]);
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
                      data={meals}
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
