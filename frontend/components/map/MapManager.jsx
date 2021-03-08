import React, {useState, useEffect } from "react";
import {Image, StyleSheet, View, Text, Alert} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import getDistance from 'geolib/es/getDistance';
import convertDistance from 'geolib/es/convertDistance'

function MapManager({route, navigation}) {
    const [fordDistance, setFordDistance] = useState('');
    const [wileyDistance, setWileyDistance] = useState('');
    const [windsorDistance, setWindsorDistance] = useState('');
    const [earhartDistance, setEarhartDistance] = useState('');
    const [hillenbrandDistance, setHillenbrandDistance] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        position => {
            let ford = (getDistance(position.coords, {
                latitude: 40.43210018,
                longitude: -86.91955498354119
            }))
            ford = convertDisatance(ford, 'mi')
            ford = ford.toFixed(2)
            setFordDistance(ford);

            let windsor = (getDistance(position.coords, {
                latitude: 40.42655749633789,
                longitude: -86.9213159984375
            }))
            windsor = convertDistance(windsor, 'mi')
            windsor = windsor.toFixed(2)
            setWindsorDistance(windsor);

            let wiley = (getDistance(position.coords, {
                latitude: 40.4285107,
                longitude: -86.9208281
            }))
            wiley = convertDistance(wiley, 'mi')
            wiley = wiley.toFixed(2)
            setWileyDistance(wiley);

            let hillenbrand = (getDistance(position.coords, {
                latitude: 40.42688475,
                longitude: -86.92629084966707
            }))
            hillenbrand = convertDistance(hillenbrand, 'mi')
            hillenbrand = hillenbrand.toFixed(2)
            setHillenbrandDistance(hillenbrand);

            let earhart = (getDistance(position.coords, {
                latitude: 40.425601350000004,
                longitude: -86.925110299389807
            }))
            earhart = convertDistance(earhart, 'mi')
            earhart = earhart.toFixed(2)
            setEarhartDistance(earhart);
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    return (
        <View>
            <View style={ styles.screenView }>
                <Text style={ styles.screenTitle }> Map </Text>
            </View>
            <View style={ styles.box }>
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
                showsMyLocationButton={true}
                showsCompass={true}
                showsTraffic={true}
                userLocationPriority={"high"}
            >
                <Marker
//                      style={ styles.defaultFontFamily }
//                     textBreakStrategy='simple'
//                             fontFamily='arial'
//                             alignSelf='stretch'
//                             textAlign='center'
//                             width='100%'
//                     baseFontStyle={{ fontFamily: "arial" }}
//                     ignoredStyles={["font-family", "letter-spacing"]}
//                     style={{ fontFamily: 'arial', }}
                    coordinate={{latitude: 40.43210018,
                        longitude: -86.91955498354119}}
                    title={"Ford"}
                    description={ fordDistance + "  miles away " }
                >
                </Marker>

                <Marker
                    coordinate={{latitude: 40.42655749633789,
                        longitude: -86.9213159984375}}
                    title={"Windsor"}
                    description={windsorDistance + " miles away"}
                />

                <Marker
                    coordinate={{latitude: 40.4285107,
                        longitude: -86.9208281}}
                    title={"Wiley"}
                    description={ wileyDistance + " miles away"}
                />

                <Marker
                    coordinate={{latitude: 40.42688475,
                        longitude: -86.92629084966707}}
                    title={"Hillenbrand"}
                    description={hillenbrandDistance + " miles away"}
                />

                <Marker
                    coordinate={{latitude: 40.425601350000004,
                        longitude: -86.925110299389807}}
                    title={"Earhart"}
                    description={earhartDistance + " miles away"}
                />
            </MapView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenView: {
        paddingTop: "15%",
        alignItems: "center",
    },
    logoImage: {
        height: 70,
        width: 70,
        marginBottom: "4%",
    },
    screenTitle: {
        fontSize: 26,
        marginBottom: "5%",
        fontWeight: "bold",
        textAlign: "center",
    },
    map: {
        height: "100%",
        width: "96%",
        borderRadius: 10,
        borderStyle: 'solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: "2%",
        justifyContent: 'center',
    },
    box: {
        height: "80%",
        width: "96%",
        borderWidth : 4,
        borderColor : 'black',
        marginLeft: "2%",
    },
});

export default MapManager;

