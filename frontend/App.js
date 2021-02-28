import * as React from "react";
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Name from "./components/signup/Name"
import Email from "./components/signup/Email"
import MealPlan from "./components/signup/MealPlan"
import LoginManager from "./components/login/LoginManager";


export default function App() {
    const Stack = createStackNavigator();

    return (
        // Do not remove Root! Root is necessary for toasts integrated in successive components.
        <Root>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }} initialRouteName="Email">
                    <Stack.Screen name="Password" component={LoginManager}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Root>
    );
}