import React, { useState } from "react";
import {Image, ScrollView, StyleSheet, View, Text, Alert} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Logo from "../../resources/logo.png";
import { Button } from 'native-base';

function MapManager({navigation}) {
    const [location, setLocation] = useState('');

    function handlePress() {
        // console.log(findCoordinates().)
    }

    function findCoordinates() {
        navigator.geolocation.getCurrentPosition(
            position => {
                return JSON.stringify(position);

            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    return (
        <View>
            <View style={ styles.screenView }>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
            <View>
                <Text style={ styles.screenTitle }> Dining Locations </Text>
            </View>
            <MapView
                style={ styles.map }
                provider="google"
                initialRegion={{
                    latitude: 40.427284,
                    longitude: -86.924159,
                    latitudeDelta: .005,
                    longitudeDelta: .005
                }}
                showsUserLocation={true}
                userLocationPriority={"high"}
            >
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
        </View>
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
        marginBottom: "4%"
    },
    screenTitle: {
        fontSize: 26,
        marginBottom: "5%",
        fontWeight: "bold",
        textAlign: "center"
    },
    map: {
        height: "75%",
        width: "100%",
        borderRadius: 10
    }
});

export default MapManager;
