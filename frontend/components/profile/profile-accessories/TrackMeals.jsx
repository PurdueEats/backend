import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { Button} from 'native-base';
import Logo from "../../../resources/logo.png";

function TrackMeals({route, navigation}) {
    const { colors } = useTheme();

    const [currentSelectID, setCurrentSelectID] = React.useState([]);
    const [currentSelection, setCurrentSelection] = React.useState([]);
    const [label, setLabel] = useState('');
    const [bool, setBool] = useState('a');
    const EmptyListMessage = ({item}) => {
        return (
            // Flat List Item
            <Text
                style={styles.emptyListStyle}
                onPress={() => getItem(item)}>
                No Data Found
            </Text>
        );
    };

    useEffect(() => {
        getMealIds();
    },[]);

    function sortList() {
        currentSelection.sort(function(a, b) { return a.timestamp < b.timestamp; });

        setBool('a');
        setBool('b');
    }

    function getMealIds() {

        fetch(`https://app-5fyldqenma-uc.a.run.app/MenuItemReview/`  + route.params.UserID, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' +  route.params.token
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful GET
                        // Set fields to correct values

                        /* response.json().then(function(data) {                            //currentSelectID.push(item.menu_item_id);
                            setCurrentSelectID(data.map(menuItem => ({ value: menuItem.menu_item_id, timestamp: menuItem.timestamp })));

                        }); */
                        //console.log(currentSelectID);
                        return response.json();
                    } else {
                        console.log('Auth like there was a problem with ID fetching. Status Code: ' +
                            response.status);
                    }
                }
            ).then(item => {
            item.map(item1 => {
                fetch(`https://app-5fyldqenma-uc.a.run.app/MenuItems/` + item1.menu_item_id, {
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
                                    currentSelection.push( { label: data.item_name, value: item1.menu_item_id, timestamp: item1.timestamp } );
                                    //setCurrentSelection( ({ label: data.item_name, value: item.id, timestamp: item.timestamp } ));
                                });

                                setBool('b');
                                //sortList();
                                setBool('a');
                            } else {
                                console.log('Getting Menu Item` like there was a problem. Status Code: ' +
                                    response.status);
                            }
                        }
                    )
                    .catch(function(err) {
                        console.log('Fetch sdfError :-S', err)
                    });
            })

                .catch(function(err) {
                    console.log('Fetch Error :-S', err)
                });

        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    function renderItem(item) {
        return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button style={ styles.foodButton } onPress={() =>  navigation.navigate("MealNutrition", { UserID: route.params.UserID, token: route.params.token,
                MealName: item.item.label,
                MealID: item.item.value }) }>
                    <View style={ styles.buttonText }>
                        <Text style={ styles.buttonText }> { item.item.label  + " " + item.item.timestamp.substring(2, item.item.timestamp.length - 6) }   </Text>
                    </View>
                    <View style={{flexDirection: "column"}}>
                        <View style = {{flexDirection: "row"}}>
                            <Text style={styles.buttonText}>{currentSelection.label}</Text>
                        </View>
                    </View>
            </Button>
        </View>

        );
    }

    return (
        // Do not remove ScrollView. Adds scrolling to screens.
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ [styles.screenView, {flexDirection:"row"}] } >
                <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
            <View style={ styles.sortView }>
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Track Meals</Text>
                <Button style={ styles.sortButton } onPress={ () => sortList() }>
                    <Text style={ styles.sortText }>Sort</Text>
                </Button>
            </View>
            <View style={ styles.foodButtonView }>
                <FlatList
                    data={ currentSelection }
                    renderItem={ (item) => renderItem(item) }
                    extraData={ bool.state }
                    ListEmptyComponent={ EmptyListMessage }
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screenView: {
        marginTop: "5%",
        marginLeft: "30%",
        marginRight: "30%",
        alignItems: "center",
        justifyContent: 'center',
    },
    foodText: {
        color: 'white',
    },
    foodButtonView: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    foodButton: {
        marginBottom: "5%",
        backgroundColor: 'red',
        width: '100%',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: "center",
    },
    sortView: {
        paddingLeft: "20%",
        paddingRight: "20%",
        marginBottom: "10%"
    },
    sortButton: {
        marginBottom: "5%",
        width: '100%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    viewCenter: {
        alignItems: "center",
        justifyContent: "center",
    },
    logoImage: {
        height: 80,
        width: 80,
        marginTop: "10%",
        marginBottom: "3%",
        alignItems: "center",
        justifyContent: 'center',
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "2%",
        justifyContent: 'center'
    },
    sortTitle: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "2%",
        justifyContent: "center",
    },
    container: {
        flex: 0,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
    },
    item: {
        backgroundColor: 'red',
    },
     buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        justifyContent: 'center',
        textAlign: "center"
    },
    sortText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        },
});

export default TrackMeals;
