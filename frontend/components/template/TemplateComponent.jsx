import React from "react";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import Logo from "../../resources/logo.png";

function TemplateComponent({navigation}) {

    return (
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
