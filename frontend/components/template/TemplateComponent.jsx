// import React, {useState} from "react";
// import { Image, ScrollView, StyleSheet, View } from "react-native";
// import Logo from "../../resources/logo.png";
// import {Alert, Text} from "react-native-web";
//
// function TemplateComponent({navigation}) {
//     const [ location, setLocation ] = useState('');
//     // Sample code for sending package to API
//     // fetch(`/api/db/getBusinessData/` + params, {
//     // 	method: 'GET',
//     // 	headers : {
//     // 		'Content-Type': 'application/json',
//     // 		'Accept': 'application/json'
//     // 	}
//     // })
//     // 	.then(response => response.json())
//     // 	.then(response => this.setState({ "response" : response }))
//
//     function findCoordinates() {
//         navigator.geolocation.getCurrentPosition(
//             position => {
//                 const location = JSON.stringify(position);
//
//                 setLocation(location)
//             },
//             error => Alert.alert(error.message),
//             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//         );
//
//         console.log(location)
//
//     };
//
//     return (
//         // Do not remove ScrollView. Adds scrolling to screens.
//         <ScrollView showsVerticalScrollIndicator={false}>
//             <View style={ styles.screenView }>
//                 <Image style={ styles.logoImage } source={ Logo } />
//                 <View onPress={ findCoordinates }> {location} </View>
//             </View>
//         </ScrollView>
//     );
// }
//
// const styles = StyleSheet.create({
//     screenView: {
//         paddingTop: "10%",
//         alignItems: "center",
//     },
//     logoImage: {
//         height: 70,
//         width: 70,
//         marginBottom: "8%"
//     }
// });
//
// export default TemplateComponent;

import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {
    state = {
        location: null
    };

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);

                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.findCoordinates}>
                    <Text style={styles.welcome}>Find My Coords?</Text>
                    <Text>Location: {this.state.location}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});
