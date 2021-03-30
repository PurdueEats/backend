import React, {useEffect, useState} from "react";

import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, FlatList} from "react-native";


import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { Button} from 'native-base';
import { StackActions } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import {AirbnbRating} from "react-native-ratings";



function Menu({route, navigation}) {
    const [filter, setFilter] = useState('');
    const [legendModalVisible, setLegendModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [searched, setSearched] = useState('');

    // stuff for search filtering
    const [allData, setAllData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    //filterData = ["hello", "test", "here"];

    // stuff for drop down filter
    const [vegetarianData, setVegetarianData] = useState([]);
    const [glutenFreeData, setGlutenFreeData] = useState([]);
    const [dairyFreeData, setDairyFreeData] = useState([]);
    const [nutFreeData, setNutFreeData] = useState([]);

    //
    const [vegetarian, setVegetarian] = useState(false);
    const [glutenFree, setGlutenFree] = useState(false);
    const [dairyFree, setDairyFree] = useState(false);
    const [nutFree, setNutFree] = useState(false);

    const popAction = StackActions.pop();

    useEffect(() => {
        getMeals();
    }, []);


    function handleNavigate() {
        navigation.navigate("MealReview", { UserID: route.params.UserID, token: route.params.token, DiningID: route.params.DiningID });
    }

    function getMeals() {
        fetch(`https://purdueeats-304919.uc.r.appspot.com/DF/` + route.params.DiningID + `/Menu`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
               /* 'Authorization': 'Bearer ' + route.params.token */
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful GET
                        // Set Fields to correct values
                        response.json().then(function(data) {
                            data.map(menuItem => {
                                //console.log(menuItem);
                                if(menuItem["menu_item"]["is_vegetarian"] === true) {
                                    //console.log(menuItem["menu_item"]["item_name"] + menuItem["menu_item"]["menu_item_id"])
                                    vegetarianData.push(menuItem);
                                    setVegetarian(true);
                                }
                                if(!menuItem["menu_item"]["has_wheat"] && !menuItem["menu_item"]["has_gluten"]) {
                                    glutenFreeData.push(menuItem);
                                    setGlutenFree(true);
                                }
                                if(!menuItem["menu_item"]["has_milk"]) {
                                    dairyFreeData.push(menuItem);
                                    setDairyFree(true);
                                }
                                if (!menuItem["menu_item"]["has_peanuts"] && !menuItem["menu_item"]["has_treenuts"]) {

                                    nutFreeData.push(menuItem);
                                    //console.log(nutFreeData);
                                    setNutFree(true);
                                }
                                allData.push(menuItem);
                                //console.log(allData);
                                //console.log(filterData);
                            })
                            setFilterData(allData);
                            //console.log(allData);
                        });
                    } else {
                        console.log('Getting Menu Items like there was a problem. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function searchFiltering (searchText) {
        if (!searchText) {
            setSearched(searchText);
            if (filter === "Gluten Free") {
                setFilterData(glutenFreeData);
            }
            if (filter === "Vegetarian") {
                setFilterData(vegetarianData);
            }
            if (filter === "Dairy Free") {
                setFilterData(dairyFreeData);
            }
            if (filter === "Nut Free") {
                setFilterData(nutFreeData);
            }
            if (filter === "All Items") {
                setFilterData(allData);
            }
            setFilterData(allData);
        }
        if(searchText) {
            const searchData = allData.filter(function (menuItem)
            {
                //console.log(menuItem["menu_item"]["item_name"]);
                const menuInfo = menuItem["menu_item"]["item_name"] ? menuItem["menu_item"]["item_name"].toUpperCase() : ''.toUpperCase();
                //const menuInfo = menuItem.item_name.toUpperCase();
                //const menuInfo = menuItem.title ? menuItem.title.toUpperCase() : ''.toUpperCase();
                const textInfo = searchText.toUpperCase();
                return menuInfo.indexOf(textInfo) > -1;
            });
            setFilterData(searchData);
            setSearched(searchText);
        }
    }

    function renderLine() {
        return (
            <View
                style={{
                    borderBottomColor: '#c4baba',
                    borderBottomWidth: 1,
                    marginTop: "2%",
                    marginBottom: "5%"
                }}
            />
        );
    }

    function handleFilter(filterType) {
        setFilter([]);
        setFilter(filterType);
        if (filterType === "Gluten Free") {
            setFilterData(glutenFreeData);
        }
        if (filterType === "Vegetarian") {
            setFilterData(vegetarianData);
        }
        if (filterType === "Dairy Free") {
            setFilterData(dairyFreeData);
        }
        if (filterType === "Nut Free") {
            setFilterData(nutFreeData);
        }
        if (filterType === "All Items") {
            setFilterData(allData);
        }
    }

    function showDropDown() {
        return (
            <View style={styles.dropDownStyle}>
                <DropDownPicker
                    items={[
                        {label: 'All Items', value: 'All Items'},
                        {label: 'Gluten Free', value: 'Gluten Free'},
                        {label: 'Vegetarian', value: 'Vegetarian'},
                        {label: 'Dairy Free', value: 'Dairy Free'},
                        {label: 'Nut Free', value: 'Nut Free'}
                    ]}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => handleFilter(item.value)}
                />

            </View>
        )
    }

    function renderMenuItem (menuItem)  {
        //console.log(allData[0]);
        //console.log(menuItem);
        //menuItem = menuItem.json();
       // console.log(menuItem["menu_item"]["menu_item_id"])
        return (
            <View style={{flexDirection: "column"}}>
                <Text style={styles.firstItem}>{menuItem.item.menu_item.item_name}</Text>
                <View style ={{flexDirection: "row"}}>
                    {menuItem.item.menu_item.is_vegetarian ? (
                        <View >
                            <MaterialCommunityIcons name="alpha-v-circle-outline" color="red" size={30}/>
                        </View>
                    ): (
                        <View>
                        </View>
                    )}
                    {!menuItem.item.menu_item.has_wheat && !menuItem.item.menu_item.has_gluten ? (
                        <View>
                            <MaterialCommunityIcons name="alpha-g-circle-outline" color="red" size={30}/>
                        </View>
                    ): (
                        <View>
                        </View>
                    )}
                    {!menuItem.item.menu_item.has_milk ? (
                        <View>
                            <MaterialCommunityIcons name="alpha-d-circle-outline" color="red" size={30}/>
                        </View>
                    ): (
                        <View>
                        </View>
                    )}
                    {!menuItem.item.menu_item.has_peanuts && !menuItem.item.menu_item.has_treenuts ? (
                        <View>
                            <MaterialCommunityIcons name="alpha-n-circle-outline" color="red" size={30}/>
                        </View>
                    ): (
                        <View>
                        </View>
                    )}
                </View>
            </View>
        );
    }

    return (
            <SafeAreaView style={ styles.screen} >
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                        <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Menu</Text>
                    <TouchableOpacity active = { .5 } onPress={() => setLegendModalVisible(true) }>
                        <MaterialCommunityIcons name="help-circle-outline" color="red" size={30}/>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={legendModalVisible}
                        onRequestClose={() => {
                            setLegendModalVisible(!legendModalVisible);
                        }}
                    >
                        <View>
                            <View style={styles.modalView}>
                                <TouchableOpacity active = { .5 } onPress={() => setLegendModalVisible(!legendModalVisible) }>
                                    <View style={styles.closeButton}>
                                        <MaterialCommunityIcons name="close" color="red" size={20}/>
                                    </View>
                                </TouchableOpacity >
                                <View style={{flexDirection: "row"}}>
                                    <MaterialCommunityIcons name="alpha-v-circle-outline" color="red" size={20}/>
                                    <Text style={styles.modalText}>Vegetarian Item</Text>
                                </View>
                                <View style={{flexDirection: "row"}}>
                                    <MaterialCommunityIcons name="alpha-g-circle-outline" color="red" size={20}/>
                                    <Text style={styles.modalText}>Gluten Free Item</Text>
                                </View>
                                <View style={{flexDirection: "row"}}>
                                    <MaterialCommunityIcons name="alpha-d-circle-outline" color="red" size={20}/>
                                    <Text style={styles.modalText}>Dairy Free Item</Text>
                                </View>
                                <View style={{flexDirection: "row"}}>
                                    <MaterialCommunityIcons name="alpha-n-circle-outline" color="red" size={20}/>
                                    <Text style={styles.modalText}>Nut Free Item</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View
                    style={{
                        borderBottomColor: '#c4baba',
                        borderBottomWidth: 1,
                        marginTop: "2%",
                        marginBottom: "5%"
                    }}
                />
                <View style={{flexDirection: "row"}}>
                    <MaterialCommunityIcons name="star" color="red" size={20}/>
                    <MaterialCommunityIcons name="star" color="red" size={20}/>
                    <MaterialCommunityIcons name="star" color="red" size={20}/>
                    <MaterialCommunityIcons name="star" color="red" size={20}/>
                    <MaterialCommunityIcons name="star" color="red" size={20}/>
                    <Button style={ styles.recordButton } onPress={ handleNavigate }>
                        <Text style={ styles.recordText } >Record Meal</Text>
                    </Button>
                </View>
                <SearchBar
                    round
                    searchIcon={{ size: 20 }}
                    placeholder="Look for an item here"
                    value={searched}
                    lightTheme = "true"
                    onChangeText={(searchText) => searchFiltering(searchText)}
                    onClear={(searchText) => searchFiltering('')}
                />
                <Button style={ styles.filterButton } onPress={() => setFilterModalVisible(true) }>
                    <Text style={ styles.filterText }>Filter</Text>
                </Button>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={filterModalVisible}
                    onRequestClose={() => {
                        setFilterModalVisible(!filterModalVisible);
                    }}
                >
                    <View>
                        <View style={styles.filterModalView}>
                            <TouchableOpacity active = { .5 } onPress={() => setFilterModalVisible(!filterModalVisible) }>
                                <View style={styles.closeButton}>
                                    <MaterialCommunityIcons name="close" color="red" size={20}/>
                                </View>
                            </TouchableOpacity >
                            <View style={styles.dropDownStyle}>
                                <DropDownPicker
                                    items={[
                                        {label: 'All Items', value: 'All Items'},
                                        {label: 'Gluten Free', value: 'Gluten Free'},
                                        {label: 'Vegetarian', value: 'Vegetarian'},
                                        {label: 'Dairy Free', value: 'Dairy Free'},
                                        {label: 'Nut Free', value: 'Nut Free'}
                                    ]}
                                    containerStyle={{height: 40}}
                                    style={{backgroundColor: '#fafafa'}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => handleFilter(item.value)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                {/*<View style={styles.dropDownStyle}>*/}
                {/*    <DropDownPicker*/}
                {/*        items={[*/}
                {/*            {label: 'All Items', value: 'All Items'},*/}
                {/*            {label: 'Gluten Free', value: 'Gluten Free'},*/}
                {/*            {label: 'Vegetarian', value: 'Vegetarian'},*/}
                {/*            {label: 'Dairy Free', value: 'Dairy Free'},*/}
                {/*            {label: 'Nut Free', value: 'Nut Free'}*/}
                {/*        ]}*/}
                {/*        containerStyle={{height: 40}}*/}
                {/*        style={{backgroundColor: '#fafafa'}}*/}
                {/*        itemStyle={{*/}
                {/*            justifyContent: 'flex-start'*/}
                {/*        }}*/}
                {/*        dropDownStyle={{backgroundColor: '#fafafa'}}*/}
                {/*        onChangeItem={item => handleFilter(item.value)}*/}
                {/*    />*/}

                {/*</View>*/}
                <FlatList data={filterData} ItemSeparatorComponent={renderLine} renderItem={(menuItem) => renderMenuItem(menuItem)} keyExtractor={(menuItem) => menuItem.menu_item_id }/>
            </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    screen:{
        paddingTop: "17%",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: "10%",
        flex: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: 'center',
        marginLeft: "30%",
        marginRight: "30%"
    },
    dropDownStyle: {
        marginTop: "3%",
        width: "50%"
    },
    firstItem: {
        fontSize: 20,
        marginRight: "53%",
    },
    secondItem: {
        fontSize: 20,
        marginRight: "50%",
    },
    thirdItem: {
        fontSize: 20,
        marginRight: "75%"
    },
    fourthItem: {
        fontSize: 20,
        marginRight: "41%"
    },
    icons: {
        flexDirection: "row",
        paddingRight: "10%",
    },
    modalText: {
        color: "black",
        marginBottom: "5%",

    },
    modalView: {
        margin: 20,
        height: "10%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    filterModalView: {
        margin: 5,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: "70%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        marginRight: "90%",
        marginBottom: "10%"
    },
    recordButton: {
        width: '35%',
        justifyContent: 'center',
        backgroundColor: "red",
        borderRadius: 10,
        marginTop:"0%",
        marginBottom: "3%",
        height: "60%",
        marginLeft: "32%"
    },
    recordText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    filterButton: {
        width: '100%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    filterText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
});

export default Menu;
