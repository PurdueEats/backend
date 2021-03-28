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
    const [modalVisible, setModalVisible] = useState(false);
    const [searched, setSearched] = useState('');

    // stuff for search filtering
    const [allData, setAllData] = useState([]);
    let [filterData, setFilterData] = useState([]);

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
                                if(menuItem.is_vegetarian) {
                                    vegetarianData.push(menuItem);
                                    setVegetarian(true);
                                }
                                if(menuItem.has_wheat === false && menuItem.has_gluten === false) {
                                    glutenFreeData.push(menuItem);
                                    setGlutenFree(true);
                                }
                                if(menuItem.has_milk === false) {
                                    dairyFreeData.push(menuItem);
                                    setDairyFree(true);
                                }
                                if (menuItem.has_peanuts === false && menuItem.has_treenuts === false) {
                                    nutFreeData.push(menuItem);
                                    //console.log(nutFreeData);
                                    setNutFree(true);
                                }
                                allData.push(menuItem);
                                //console.log(allData);
                                filterData = allData
                                console.log(filterData);


                            })
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
            setFilterData(allData);
        }
        if(searchText) {
            const searchData = allData.filter(function (menuItem)
            {
                const menuInfo = menuItem.title ? menuItem.title.toUpperCase() : ''.toUpperCase();
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

    function renderMenuItem() {
        return (
            <View>
                { filterData.length === 0 ? (
                    <Text>Error</Text>
                ) : (
                    filterData.map(function (menuItem) {
                        //console.log(filterData.item_name);
                        return (
                            <View style={{flexDirection: "row"}}>
                                <Text style={styles.firstItem}>{menuItem.item_name}</Text>
                                {menuItem.is_vegetarian == true ? (
                                    <View style={styles.icons}>
                                        <MaterialCommunityIcons name="alpha-v-circle-outline" color="red" size={30}/>
                                    </View>
                                ): (
                                    <View>
                                    </View>
                                )}
                                {menuItem.has_wheat == false && menuItem.has_gluten == false ? (
                                    <View style={styles.icons}>
                                        <MaterialCommunityIcons name="alpha-g-circle-outline" color="red" size={30}/>
                                    </View>
                                ): (
                                    <View>
                                    </View>
                                )}
                                {menuItem.has_milk == false ? (
                                    <View style={styles.icons}>
                                        <MaterialCommunityIcons name="alpha-d-circle-outline" color="red" size={30}/>
                                    </View>
                                ): (
                                    <View>
                                    </View>
                                )}
                                {menuItem.has_peanuts == false && menuItem.has_treenuts == false ? (
                                    <View style={styles.icons}>
                                        <MaterialCommunityIcons name="alpha-n-circle-outline" color="red" size={30}/>
                                    </View>
                                ): (
                                    <View>
                                    </View>
                                )}
                            </View>
                        );
                    }))}
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
                    <TouchableOpacity active = { .5 } onPress={() => setModalVisible(true) }>
                        <MaterialCommunityIcons name="help-circle-outline" color="red" size={30}/>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View>
                            <View style={styles.modalView}>
                                <TouchableOpacity active = { .5 } onPress={() => setModalVisible(!modalVisible) }>
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
                        onChangeItem={item => setFilter(item.value)}
                    />

                </View>
                {/*{filter === "Gluten Free" ? (*/}
                {/*    setFilterData(glutenFreeData)*/}
                {/*): (*/}
                {/*    setFilterData(filterData)*/}
                {/*)}*/}
                {/*{filter === "Vegetarian" ? (*/}
                {/*    setFilterData(vegetarianData)*/}
                {/*): (*/}
                {/*    setFilterData(filterData)*/}
                {/*)}*/}
                {/*{filter === "Dairy Free" ? (*/}
                {/*    setFilterData(dairyFreeData)*/}
                {/*): (*/}
                {/*    setFilterData(filterData)*/}
                {/*)}*/}
                {/*{filter === "Nut Free" ? (*/}
                {/*    setFilterData(nutFreeData)*/}
                {/*): (*/}
                {/*    setFilterData(filterData)*/}
                {/*)}*/}
                {/*{filter === "All Items" ? (*/}
                {/*    setFilterData(allData)*/}
                {/*): (*/}
                {/*    setFilterData(filterData)*/}
                {/*)}*/}
                <FlatList data={filterData} ItemSeparatorComponent={renderLine} renderItem={renderMenuItem} keyExtractor={(menuItem, index) => index.toString()}/>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen:{
        paddingTop: "17%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "100%",
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
        marginTop: "3%"
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
    }
});

export default Menu;
