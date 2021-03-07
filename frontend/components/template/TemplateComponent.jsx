<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ae7bf05... back arrows and deleting edit button
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Logo from "../../resources/logo.png";
import { Button } from 'native-base';

function TemplateComponent({route, navigation}) {

    function handlePress() {
        console.log("oh man " + route.params.UserID)
        console.log(route.params.token)
    }

    return (
        // Do not remove ScrollView. Adds scrolling to screens.
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ styles.screenView }>
                <Image style={ styles.logoImage } source={ Logo } />
                <Button onPress={ handlePress }>
                    <Text>Button</Text>
                </Button>
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
