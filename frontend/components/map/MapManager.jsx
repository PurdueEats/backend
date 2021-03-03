import React from "react";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import Logo from "../../resources/logo.png";

function MapManager({navigation}) {

    // Sample code for sending package to API
    // fetch(`/api/db/getBusinessData/` + params, {
    // 	method: 'GET',
    // 	headers : {
    // 		'Content-Type': 'application/json',
    // 		'Accept': 'application/json'
    // 	}
    // })
    // 	.then(response => response.json())
    // 	.then(response => this.setState({ "response" : response }))

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ styles.screenView }>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
            <Text> Welp, there's no map yet. </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screenView: {
        paddingTop: "10%",
        alignItems: "center",
    },
    logoImage: {
        height: 70,
        width: 70,
        marginBottom: "8%"
    }
});

export default MapManager;
