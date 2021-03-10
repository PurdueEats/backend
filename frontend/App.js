import * as React from "react";
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginManager from "./components/login/LoginManager"
import TemplateComponent from "./components/template/TemplateComponent";
import MealPreferences from "./components/login/MealPreferences";
import Name from "./components/signup/Name";
import Email from "./components/signup/Email";
import Password from "./components/signup/Password";
import MealPlan from "./components/signup/MealPlan";
import DiningDollarEntry from "./components/signup/DiningDollarEntry";
import MapManager from "./components/map/MapManager";
import Menu from "./components/dining/Menu"


export default function App() {
    const Stack = createStackNavigator();

    return (
        // Do not remove Root! Root is necessary for toasts integrated in successive components.
        <Root>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }} initialRouteName="Menu">
                    <Stack.Screen name="Menu" component={ Menu }/>
                    <Stack.Screen name="Name" component={ Name }/>
                    <Stack.Screen name="Email" component={ Email }/>
                    <Stack.Screen name="Password" component={ Password }/>
                    <Stack.Screen name="MealPlan" component={ MealPlan }/>
                    <Stack.Screen name="DiningDollarEntry" component={ DiningDollarEntry }/>
                    <Stack.Screen name="MealPreferences" component={ MealPreferences }/>
                    <Stack.Screen name="Map" component={ MapManager }/>
                    <Stack.Screen name="Template" component={ TemplateComponent }/>
                </Stack.Navigator>
            </NavigationContainer>
        </Root>
    );
}