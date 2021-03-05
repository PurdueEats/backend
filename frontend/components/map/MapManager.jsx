import React from "react";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Logo from "../../resources/logo.png";
import { Button, Item } from 'native-base';

function MapManager({navigation}) {
    // const region = getInitialState();
    //
    // function getInitialState() {
    //     return {
    //         region: {
    //             latitude: 37.78825,
    //             longitude: -122.4324,
    //             latitudeDelta: 0.0922,
    //             longitudeDelta: 0.0421,
    //         }
    //     };
    // }

    function onRegionChange(region) {
        this.setState({ region });
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ styles.screenView }>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
            <View>
                <Text style={ styles.screenTitle }> Dining Locations </Text>
            </View>
            <MapView
                style={{ height: "200%", width: "100%" }}
                provider="google"
                initialRegion={{
                    latitude: 40.427284,
                    longitude: -86.924159,
                    latitudeDelta: .005,
                    longitudeDelta: .005
                }}
            >
                <Marker
                    coordinate={{latitude: 40.9493258,
                        longitude: -86.91963498354119}}
                    title={"Ford"}
                    description={"description"}
                />

                <Marker
                    coordinate={{latitude: 40.43210018,
                        longitude: -86.91955498354119}}
                    title={"Ford"}
                    description={"Dine-in/On-to-go available"}
                />

                <Marker
                    coordinate={{latitude: 40.42655749633789,
                        longitude: -86.9213159984375}}
                    title={"Windsor"}
                    description={"Dine-in/On-to-go available"}
                />

                <Marker
                    coordinate={{latitude: 40.4285107,
                        longitude: -86.9208281}}
                    title={"Wiley"}
                    description={"Dine-in"}
                />

                <Marker
                    coordinate={{latitude: 40.42688475,
                        longitude: -86.92629084966707}}
                    title={"Hillenbrand"}
                    description={"Dine-in"}
                />

                <Marker
                    coordinate={{latitude: 40.425601350000004,
                        longitude: -86.925110299389807}}
                    title={"Earhart"}
                    description={"Dine-in/On-to-go available"}
                />
            </MapView>

            <View style={ styles.buttonView }>
                <Button style={ styles.myLocationButtonComponent }>
                    <Text style={ styles.myLocationButtonText }>Update My Location!</Text>
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screenView: {
        paddingTop: "7%",
        alignItems: "center",
    },
    logoImage: {
        height: 70,
        width: 70,
        marginBottom: "8%"
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center"
    },
    myLocationButtonComponent: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        backgroundColor: "#ff0000",
        borderRadius: 10,
        marginTop: "5%",
        marginBottom: "10%"
    },
    myLocationButtonText: {
        fontSize: 26,
        fontWeight: "bold",
        color: "white"
    },
    buttonView: {
        paddingTop: "4%",
        alignItems: "center",
    },
});

export default MapManager;
