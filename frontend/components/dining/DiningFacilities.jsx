import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Logo from "../../resources/logo.png";
import Earhart from "../../resources/earhart.png"
import Wiley from "../../resources/wiley.png"
import Ford from "../../resources/ford.png"
import Hillenbrand from "../../resources/hillenbrand.png"
import Windsor from "../../resources/windsor.png"

function DiningFacilities({route, navigation}) {
    const [diningCourt, setDiningCourt] = useState('');

    function handleNavigate() {
        navigation.navigate("Menu", { UserID: route.params.UserID, token: route.params.token });
    }

    return (
        <ScrollView>
            <View style={ styles.iconPosition }>
                <Image source = { Logo } style = { styles.iconSize } />
            </View>
            <Text style={ styles.sectionTitle }>Menu</Text>
            <View style={ styles.imageContainer }>
                <TouchableOpacity onPress={ handleNavigate }>
                    <Image source = { Earhart }
                           style = { styles.diningImage } />
                </TouchableOpacity>
                <TouchableOpacity onPress={ handleNavigate }>
                    <Image source = { Wiley } style = { styles.diningImage } />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={ handleNavigate }>
                    <Image source = { Hillenbrand } style = { styles.diningImage } />
                </TouchableOpacity>
                <TouchableOpacity onPress={ handleNavigate }>
                    <Image source = { Windsor} style = { styles.diningImage } />
                </TouchableOpacity>
            </View>
            <View style={ styles.lastDiningCourt }>
                <TouchableOpacity onPress={ handleNavigate }>
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
