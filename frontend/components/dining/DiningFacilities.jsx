import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapManager from "../map/MapManager";
import TemplateComponent from "../template/TemplateComponent";
import Logo from "../../resources/logo.png";
import Earhart from "../../resources/earhart.png"
import Wiley from "../../resources/wiley.png"
import Ford from "../../resources/ford.png"
import Hillenbrand from "../../resources/hillenbrand.png"
import Windsor from "../../resources/windsor.png"


function DiningFacilities({route, navigation}) {
    const popAction = StackActions.pop();

    const [diningCourt, setDiningCourt] = useState('');

    return (
        <ScrollView>
            <View style={ styles.iconPosition }>
                <Image source = { Logo } style = { styles.iconSize } />
            </View>
            <Text style={ styles.sectionTitle }>Menu</Text>
            <View style={ styles.imageContainer }>
                <TouchableOpacity>
                    <Image source = { Earhart } style = { styles.diningImage } />
                    <Text>{"some text"}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source = { Wiley } style = { styles.diningImage }/>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity>
                    <Image source = { Hillenbrand } style = { styles.diningImage }  />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source = { Windsor} style = { styles.diningImage } />
                </TouchableOpacity>
            </View>
            <View style={ styles.lastDiningCourt }>
                <TouchableOpacity>
                    <Image source = { Ford } style = { styles.diningImage } />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    iconPosition: {
        paddingTop: "2%",
        marginBottom: "2%",
        alignItems: "center",
        aspectRatio: 0.6
    },
    iconSize: {
    },
    sectionTitle: {
        fontSize: 35,
        fontWeight: "bold",
        marginTop: "-125%"
    },
    diningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "7%"
    },
    imageContainer: {
        flexDirection: "row",
        marginLeft: "5%",
        marginRight: "5%",
        alignItems: "center"
    },
    lastDiningCourt: {
        alignItems: "center",
        marginTop: "10%"
    },
});

export default DiningFacilities;
