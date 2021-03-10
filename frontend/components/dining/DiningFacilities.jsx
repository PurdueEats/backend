import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import Logo from "../../resources/logo.png";
import Earhart from "../../resources/earhart.png"
import Wiley from "../../resources/wiley.png"
import Ford from "../../resources/ford.png"
import Hillenbrand from "../../resources/hillenbrand.png"
import Windsor from "../../resources/windsor.png"
import MaterialTabs from 'react-native-material-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";


function DiningFacilities({route, navigation}) {
    const [diningCourt, setDiningCourt] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);


    function handleNavigate() {
        navigation.navigate("Menu", { UserID: route.params.UserID, token: route.params.token });
    }

    return (
        <ScrollView>
            <View style={ styles.iconPosition }>
                <Image source = { Logo } style = { styles.iconSize } />
            </View>
            <View style={styles.tabBar}>
                <MaterialTabs
                    items={['Recommended Meals', 'Dining Facilities']}
                    selectedIndex={selectedTab}
                    onChange={setSelectedTab}
                    barColor="#ffffff"
                    indicatorColor="#000000"
                    activeTextColor="#000000"
                    inactiveTextColor="#908c8c"
                />
            </View>
            {selectedTab === 0 ? (
                <View>
                    <Text>This is the meal recommendation page! It will be implemented later.</Text>
                </View>
            ): (
                <View>
                    <View style={ styles.imageContainer }>
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <TouchableOpacity onPress={ handleNavigate }>
                                <Image source = { Earhart } style = { styles.earhartDiningImage }/>
                                <Text style={ styles.earhartTitle }>{"Earhart"}</Text>
                                <Text style={ styles.earhartTime }>{"4:00-10:00 PM"}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={ handleNavigate }>
                            <Image source = { Wiley } style = { styles.wileyDiningImage }/>
                            <Text style={ styles.wileyTitle }>{"Wiley"}</Text>
                            <Text style={ styles.wileyTime }>{"4:00-10:00 PM"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.imageContainer }>
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <TouchableOpacity onPress={ handleNavigate }>
                                <Image source = { Hillenbrand } style = { styles.hillenbrandDiningImage }/>
                                <Text style={ styles.hillenbrandTitle }>{"Hillenbrand"}</Text>
                                <Text style={ styles.hillenbrandTime }>{"4:00-10:00 PM"}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={ handleNavigate }>
                            <Image source = { Windsor } style = { styles.windsorDiningImage }/>
                            <Text style={ styles.windsorTitle }>{"Windsor"}</Text>
                            <Text style={ styles.windsorTime }>{"4:00-10:00 PM"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.lastDiningCourt }>
                        <TouchableOpacity onPress={ handleNavigate }>
                            <Image source = { Ford } style = { styles.fordDiningImage } />
                            <Text style={ styles.fordTitle }>{"Ford"}</Text>
                            <Text style={ styles.fordTime }>{"4:00-10:00 PM"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    iconPosition: {
        paddingTop: "2%",
        marginBottom: "2%",
        marginTop: "5%",
        alignItems: "center",
        aspectRatio: 0.6
    },
    iconSize: {
        marginTop: "5%",
        aspectRatio: 1,
        width: 100,
        height: 100,
    },
    tabBar: {
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "-125%"
    },
    earhartTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "27%",
        alignItems: "center",
        marginTop: "35%"
    },
    earhartTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "17%",
        alignItems: "center",
        marginTop: "50%"
    },
    earhartDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "2.5%",
        marginBottom: "5%",
        marginTop:"5%"
    },
    wileyTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "32%",
        alignItems: "center",
        marginTop: "34%",
    },
    wileyTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "20%",
        alignItems: "center",
        marginTop: "49%"
    },
    wileyDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "5%",
        marginBottom: "5%",
        marginTop: "5%"
    },
    hillenbrandTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "17%",
        alignItems: "center",
        marginTop: "35%"
    },
    hillenbrandTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "18.5%",
        alignItems: "center",
        marginTop: "50%"
    },
    hillenbrandDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "2.5%",
        marginBottom: "0%",
        marginTop:"5%"
    },
    windsorTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "27%",
        alignItems: "center",
        marginTop: "34%"
    },
    windsorTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "18.5%",
        alignItems: "center",
        marginTop: "47%"
    },
    windsorDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "5%",
        marginBottom: "0%",
        marginTop: "5%"
    },
    fordTitle: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "21%",
        alignItems: "center",
        marginTop: "10%"
    },
    fordTime: {
        fontSize: 15,
        position: "absolute",
        marginLeft: "14%",
        alignItems: "center",
        marginTop: "17%"
    },
    fordDiningImage: {
        aspectRatio: 1,
        opacity: 0.5,
        width: 150,
        height: 150,
        marginRight: "7%",
        marginLeft: "7%",
        marginBottom: "50%",
        marginTop: "-5%"
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
