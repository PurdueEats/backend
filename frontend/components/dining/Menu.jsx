import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DiningFacilities from "./DiningFacilities";
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';



function Menu({navigation}) {
    const [filter, setFilter] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView>
            <SafeAreaView style={ styles.screen }>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={navigation.dispatch(StackActions.pop(1))}>
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
                    <View>

                    </View>
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
    }
});

export default Menu;
