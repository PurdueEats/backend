import React from "react";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Logo from "../../resources/logo.png";[]

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
            <Text> Welp, there's a map. </Text>
            <MapView
                style={{ height: "300%", width: "100%" }}
                provider="google"
                initialRegion={{
                    latitude: 40.427284,
                    longitude: -86.924159,
                    latitudeDelta: .005,
                    longitudeDelta: .005
                }}
            >
                <Marker
                    coordinate={{latitude: 40.4321258,
                        longitude: -86.91963498354119}}
                    title={"Ford"}
                    description={"description"}
                />
                {/*<Marker*/}
                {/*    coordinate={{latitude: 40.4321258,*/}
                {/*        longitude: -86.91963498354119}}*/}
                {/*    title={"Windosor"}*/}
                {/*    description={"description"}*/}
                {/*/>*/}
                {/*<Marker*/}
                {/*    coordinate={{latitude: 40.4321258,*/}
                {/*        longitude: -86.91963498354119}}*/}
                {/*    title={"Wiley"}*/}
                {/*    description={"description"}*/}
                {/*/>*/}
                {/*<Marker*/}
                {/*    coordinate={{latitude: 40.4321258,*/}
                {/*        longitude: -86.91963498354119}}*/}
                {/*    title={"Hillenbrand"}*/}
                {/*    description={"description"}*/}
                {/*/>*/}
                {/*<Marker*/}
                {/*    coordinate={{latitude: 40.4321258,*/}
                {/*        longitude: -86.91963498354119}}*/}
                {/*    title={"Earhart"}*/}
                {/*    description={"description"}*/}
                {/*/>*/}

            </MapView>
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
