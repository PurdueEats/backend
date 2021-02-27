import React from "react";
import { View, Text } from "react-native";
import { Button } from 'native-base';

function TemplateComponent({navigation}) {

    return (
        // Test component for now, need to implement template with header
        <View>
            <Button style={{
                flex: 1,
                marginTop: "50%",
                alignItems: "center",
                marginBottom: "2%"

            }} onPress={() => navigation.navigate('Login')}>
                <Text>Hello, World!</Text>
            </Button>

            <Button style={{
                flex: 1,
                marginTop: "50%",
                alignItems: "center",
                marginBottom: "2%",
                backgroundColor: "green"

            }} onPress={() => navigation.goBack()}>
                <Text>Hello, World!</Text>
            </Button>
        </View>
    );
}

export default TemplateComponent;
