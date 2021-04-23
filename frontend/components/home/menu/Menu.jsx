import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Button } from 'native-base';
import { StackActions } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { AirbnbRating } from "react-native-ratings";

function Menu({route, navigation}) {
    const { colors } = useTheme();
    const [filter, setFilter] = useState('');
    const [legendModalVisible, setLegendModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [searched, setSearched] = useState('');

    // Search filtering
    const [allData, setAllData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    // Drop down filter
    const [vegetarianData, setVegetarianData] = useState([]);
    const [glutenFreeData, setGlutenFreeData] = useState([]);
    const [dairyFreeData, setDairyFreeData] = useState([]);
    const [nutFreeData, setNutFreeData] = useState([]);

    //
    const [vegetarian, setVegetarian] = useState(false);
    const [glutenFree, setGlutenFree] = useState(false);
    const [dairyFree, setDairyFree] = useState(false);
    const [nutFree, setNutFree] = useState(false);

    // Favorite meals
    const [currentSelection, setCurrentSelection] = useState([]);
    const favData = allData.filter(a => currentSelection.some(c => c.value === a.menu_item.menu_item_id));
    const [mealName, setMealName] = useState([]);
    const [favMealName, setFavMealName] = useState([]);

    // Count for items
    let count = 0;

    useEffect(() => {
        getMeals();
        getFavMeal();
        convertName();
    }, []);


    function handleNavigate() {
        navigation.navigate("MealReview", { UserID: route.params.UserID, token: route.params.token, DiningID: route.params.DiningID });
    }

    function handleReviewNavigate() {
        navigation.navigate("ReadReviews", { UserID: route.params.UserID, token: route.params.token, DiningID: route.params.DiningID });
    }
    function getMeals() {
        fetch(`https://app-5fyldqenma-uc.a.run.app/DF/` + route.params.DiningID + `/Menu`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful GET
                        // Set Fields to correct values
                        response.json().then(function(data) {
                            data = data.map(e => e["menu_item"]["menu_item_id"])
                                .map((e, i, final) => final.indexOf(e) === i && i)
                                .filter(e => data[e])
                                .map(e => data[e])
                            setMealName(data.map(menuItem => ({ label: menuItem["menu_item"]["item_name"], value: menuItem["menu_item"]["menu_item_id"] })));

                            data.map(menuItem => {
                                if(menuItem["menu_item"]["is_vegetarian"] === true) {
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
                                    setNutFree(true);
                                }
                                allData.push(menuItem);

                            })
                            setFilterData(allData);
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

    function convertName() {
        setFavMealName(favData.map(menuItem => ({ label: menuItem["menu_item"]["item_name"], value: menuItem["menu_item"]["menu_item_id"] })));
    }

    // GET request to get the selected favorite item(s)
    function getFavMeal() {
        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + route.params.UserID + '/UserFavMeals', {
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
                            setCurrentSelection(data.map(menuItem => ({ label: menuItem.name, value: menuItem.meal_id })));
                        });
                    } else {
                        console.log('Auth like there was a problem with favorite meals fetching. Status Code: ' +
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
            if (filter === "Favorite Items") {
                setFilterData(favData);
            }
//             setFilterData(allData)
        }
        if(searchText) {
            const searchData = allData.filter(function (menuItem)
            {
                const menuInfo = menuItem["menu_item"]["item_name"] ? menuItem["menu_item"]["item_name"].toUpperCase() : ''.toUpperCase();
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
        if (filterType === "Favorite Items") {
            setFilterData(favData);
        }
    }

    function renderMenuItem (menuItem)  {
        return (
            <TouchableOpacity style={{ marginTop: "3%", marginBottom: "3%" }} onPress={() =>  navigation.navigate("MealNutrition", { UserID: route.params.UserID, token: route.params.token,
                MealName: menuItem.item.menu_item.item_name,
                MealID: menuItem.item.menu_item.menu_item_id}) }>
                <View style={{flexDirection: "column"}}>
                    <View style = {{flexDirection: "row"}}>
                        <Text style={ [styles.firstItem, {color: colors.text}] }>{menuItem.item.menu_item.item_name}</Text>
                        <View style={{position: 'absolute', right: 10, bottom: -15}}>
                            <MaterialCommunityIcons name="arrow-right" color="red" size={30}/>
                        </View>
                    </View>
                    <View style ={{flexDirection: "row", marginLeft: "2%"}}>
                        {menuItem.item.menu_item.is_vegetarian ? (
                            <View >
                                <MaterialCommunityIcons name="alpha-v-circle-outline" color="green" size={30}/>
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
                                <MaterialCommunityIcons name="alpha-d-circle-outline" color="#84b2c2" size={30}/>
                            </View>
                        ): (
                            <View>
                            </View>
                        )}
                        {!menuItem.item.menu_item.has_peanuts && !menuItem.item.menu_item.has_treenuts ? (
                            <View>
                                <MaterialCommunityIcons name="alpha-n-circle-outline" color="#C16718" size={30}/>
                            </View>
                        ): (
                            <View>
                            </View>
                        )}
                        {favMealName.map(function (meal, index) {
                            return (
                                <View key={index}>
                                    {meal.value === menuItem.item.menu_item.menu_item_id ? (
                                        <View>
                                            <MaterialCommunityIcons name="star" color="#FFD133" size={30}/>
                                        </View>
                                    ): (
                                        <View>
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView>
            <View style={ styles.topView } >
                <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Menu</Text>
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
                        <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                            <TouchableOpacity onPress={() => setLegendModalVisible(!legendModalVisible)}>
                                <View style={styles.modalCloseButton}>
                                    <MaterialCommunityIcons name="close" color="red" size={20}/>
                                </View>
                            </TouchableOpacity >
                            <View style={{flexDirection: "row"}}>
                                <MaterialCommunityIcons name="alpha-v-circle-outline" color="green" size={20}/>
                                <Text style={ [styles.modalText, {color: colors.text}]}>Vegetarian Item</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <MaterialCommunityIcons name="alpha-g-circle-outline" color="red" size={20}/>
                                <Text style={ [styles.modalText, {color: colors.text}]}>Gluten Free Item</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <MaterialCommunityIcons name="alpha-d-circle-outline" color="#84b2c2" size={20}/>
                                <Text style={ [styles.modalText, {color: colors.text}]}>Dairy Free Item</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <MaterialCommunityIcons name="alpha-n-circle-outline" color="#C16718" size={20}/>
                                <Text style={ [styles.modalText, {color: colors.text}]}>Nut Free Item</Text>
                            </View>
{/*                             <View style={{flexDirection: "row"}}> */}
{/*                                 <MaterialCommunityIcons name="star" color="#FFD133" size={20}/> */}
{/*                                 <Text style={ [styles.modalText, {color: colors.text}]}>Favorite Item</Text> */}
{/*                             </View> */}
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={{ marginLeft: "2%", marginRight: "2%" }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: "2%" }}>
                    <Button style={ styles.reviewButton } onPress={ handleReviewNavigate }>
                        <Text style={ styles.reviewText }>Reviews</Text>
                    </Button>
                    <Button style={ styles.recordButton } onPress={ handleNavigate }>
                        <Text style={ styles.recordText }>Record Meal</Text>
                    </Button>
                </View>
                <View style={{ marginBottom: "2%" }}>
                    <SearchBar
                        round
                        containerStyle={{backgroundColor: colors.background, borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                        searchIcon={{ size: 20 }}
                        placeholder="Look for an item here"
                        value={searched}
                        lightTheme = "true"
                        onChangeText={(searchText) => searchFiltering(searchText)}
                        onClear={(searchText) => searchFiltering('')}
                    />
                </View>
                <Button style={ styles.filterButton } onPress={() => setFilterModalVisible(true) }>
                    <Text style={ styles.filterText }>Filter</Text>
                </Button>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={filterModalVisible}
                onRequestClose={() => {
                    setFilterModalVisible(!filterModalVisible);
                }}
            >
                <View>
                    <View style={ [styles.filterModalView, {backgroundColor: colors.card}] }>
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
                                    {label: 'Nut Free', value: 'Nut Free'},
                                    {label: 'Favorite Items', value: 'Favorite Items'}
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
            <FlatList data={filterData} ItemSeparatorComponent={renderLine} renderItem={(menuItem) => renderMenuItem(menuItem)}
                      keyExtractor={(item, index) => item.key} extraData={allData}/>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageView: {
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    topView: {
        marginLeft: "3%",
        marginRight: "3%",
        marginTop: "10%",
        marginBottom: "5%",
        flexDirection: "row"
    },
    screenTitle: {
        fontSize: 30,
        fontWeight: "bold",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center"
    },
    dropDownStyle: {
        marginTop: "3%",
        width: "50%"
    },
    firstItem: {
        fontSize: 20,
        marginLeft: "2%",
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
        height: "55%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: "5%",
        paddingLeft: "2%",
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
    modalCloseButton: {
        alignItems: "flex-start",
        marginBottom: "5%"
    },
    closeButton: {
        marginBottom: "10%"
    },
    recordButton: {
        width: '35%',
        marginRight: "5%",
        justifyContent: 'center',
        backgroundColor: "red",
        borderRadius: 10,
    },
    recordText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    filterButton: {
        marginLeft: "10%",
        marginBottom: "1%",
        width: '80%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    filterText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    reviewButton: {
        marginLeft: "5%",
        marginBottom: "1%",
        width: '35%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    reviewText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
});

export default Menu;
