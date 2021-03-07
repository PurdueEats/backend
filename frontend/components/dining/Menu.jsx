import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DiningFacilities from "./DiningFacilities";
import DropDownPicker from 'react-native-dropdown-picker';


function Menu({navigation}) {
    const [filter, setFilter] = useState('');

    return (
        <ScrollView>
            <SafeAreaView style={ styles.screen }>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Menu</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="help-circle-outline" color="red" size={30}/>
                    </TouchableOpacity>
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
    }
});

export default Menu;
