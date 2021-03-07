import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Logo from "../../resources/logo.png";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Earhart from "../../resources/earhart.png";
import Wiley from "../../resources/wiley.png";
import Hillenbrand from "../../resources/hillenbrand.png";
import Windsor from "../../resources/windsor.png";
import Ford from "../../resources/ford.png";
import DiningFacilities from "./DiningFacilities";

function Menu({navigation}) {
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

export default Menu;
