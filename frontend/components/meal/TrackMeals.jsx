import React from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity,} from "react-native";
import { Button } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

const popAction = StackActions.pop();

function TrackMeals({route, navigation}) {


    return (
        // Do not remove ScrollView. Adds scrolling to screens.
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ styles.screenView }>
                <Text style={ styles.textTitle }>This is where TrackMeals page will be</Text>
            </View>
            <TouchableOpacity onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screenView: {
        paddingTop: "0%",
        alignItems: "center",
    },
    textTitle: {
        fontSize: 32
    }
});

export default TrackMeals;