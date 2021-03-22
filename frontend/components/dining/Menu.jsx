import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, FlatList} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { Button} from 'native-base';
import { StackActions } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';


function Menu({route, navigation}) {
    const [filter, setFilter] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [searched, setSearched] = useState('');
    const [allData, setAllData] = useState('');
    const [filterData, setFilterData] = useState('');
    const [vegetarianData, setVegetarianData] = useState('');
    const [glutenFreeData, setGlutenFreeData] = useState('');
    const [dairyFreeData, setDairyFreeData] = useState('');
    const [nutFreeData, setNutFreeData] = useState('');

    const popAction = StackActions.pop();

    function handleNavigate() {
        navigation.navigate("MealReview", { UserID: route.params.UserID, token: route.params.token });
    }

    function searchFiltering (searchText) {
        if (!searchText) {
            setSearched(searchText);
            setFilterData(filterData);
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

    function preprocessMenuItems(menuItem) {
        if(menuItem.is_vegetarian == true) {
            setVegetarianData(menuItem);
        }
        if(menuItem.has_wheat == false && menuItem.has_gluten == false) {
            setGlutenFreeData(menuItem);
        }
        if(menuItem.has_milk == false) {
            setDairyFreeData(menuItem);
        }
        if (menuItem.has_peanuts == false && menuItem.has_treenuts == false) {
            setNutFreeData(menuItem);
        }
    }

    function getMenuItems() {
        //fetch request here
        // separate into different lists here
    }
    function renderMenuItem({menuItem}) {
        return (
            <TouchableOpacity>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.firstItem}>Alfredo Pasta</Text>
                    <View style={styles.icons}>
                        <MaterialCommunityIcons name="alpha-v-circle-outline" color="red" size={30}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView>
            <SafeAreaView style={ styles.screen }>
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
                {filter === "Gluten Free" ? (
                    setFilterData(glutenFreeData)
                ): (
                    setFilterData(filterData)
                )}
                {filter === "Vegetarian" ? (
                    setFilterData(vegetarianData)
                ): (
                    setFilterData(filterData)
                )}
                {filter === "Dairy Free" ? (
                    setFilterData(dairyFreeData)
                ): (
                    setFilterData(filterData)
                )}
                {filter === "Nut Free" ? (
                    setFilterData(nutFreeData)
                ): (
                    setFilterData(filterData)
                )}
                {filter === "All Items" ? (
                    setFilterData(allData)
                ): (
                    setFilterData(filterData)
                )}
                <FlatList data={filterData} ItemSeparatorComponent={renderLine} renderItem={renderMenuItem} keyExtractor={(menuItem, index) => index.toString()}/>
                {filter === "All Items" ? (
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.firstItem}>Alfredo Pasta</Text>
                            <View style={styles.icons}>
                                <MaterialCommunityIcons name="alpha-v-circle-outline" color="red" size={30}/>
                            </View>
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
                            <Text style={styles.secondItem}>Chicken Sandwich</Text>
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
                            <Text style={styles.thirdItem}>Salad</Text>
                            <View style={styles.icons}>
                                <MaterialCommunityIcons name="alpha-d-circle-outline" color="red" size={30}/>
                            </View>
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
                            <Text style={styles.fourthItem}>Gluten Free Pasta</Text>
                            <View style={styles.icons}>
                                <MaterialCommunityIcons name="alpha-g-circle-outline" color="red" size={30}/>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#c4baba',
                                borderBottomWidth: 1,
                                marginTop: "2%",
                                marginBottom: "5%"
                            }}
                        />
                    </View>
                    ):(
                    <View>

                    </View>
                )}
                {filter === "Gluten Free" ? (
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.fourthItem}>Gluten Free Pasta</Text>
                            <View style={styles.icons}>
                                <MaterialCommunityIcons name="alpha-g-circle-outline" color="red" size={30}/>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#c4baba',
                                borderBottomWidth: 1,
                                marginTop: "2%",
                                marginBottom: "5%"
                            }}
                        />
                    </View>
                    ): (
                        <View>

                        </View>
                )}
                {filter === "Vegetarian" ? (
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.firstItem}>Alfredo Pasta</Text>
                            <View style={styles.icons}>
                                <MaterialCommunityIcons name="alpha-v-circle-outline" color="red" size={30}/>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#c4baba',
                                borderBottomWidth: 1,
                                marginTop: "2%",
                                marginBottom: "5%"
                            }}
                        />
                    </View>
                ): (
                    <View />
                )}
                {filter === "Dairy Free" ? (
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.thirdItem}>Salad</Text>
                            <View style={styles.icons}>
                                <MaterialCommunityIcons name="alpha-d-circle-outline" color="red" size={30}/>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#c4baba',
                                borderBottomWidth: 1,
                                marginTop: "2%",
                                marginBottom: "5%"
                            }}
                        />
                    </View>
                ): (
                    <View>
                    </View>
                )}

            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen:{
        paddingTop: "17%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "100%",
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
