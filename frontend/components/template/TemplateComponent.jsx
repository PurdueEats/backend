import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Logo from "../../resources/logo.png";

function TemplateComponent({navigation}) {

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
        // Do not remove ScrollView. Adds scrolling to screens.
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ styles.screenView }>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
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

export default TemplateComponent;
