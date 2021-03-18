import * as React from "react";
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginManager from "./components/login/LoginManager"
import ProfileManager from "./components/profile/ProfileManager"
import TemplateComponent from "./components/template/TemplateComponent";
import MealPreferences from "./components/meal/MealPreferences";
import DiningCourt from "./components/dining/DiningFacilities";
import Menu from "./components/dining/Menu";
import MealReview from "./components/meal/MealReview";
import Name from "./components/signup/Name";
import Email from "./components/signup/Email";
import Password from "./components/signup/Password";
import MealPlan from "./components/signup/MealPlan";
import MapManager from "./components/map/MapManager";
import NavBar from "./components/navbar/NavBar";
import ForgotPassword from "./components/login/ForgotPassword"
import TrackMeals from "./components/meal/TrackMeals"
import FavoriteMeal from "./components/meal/FavoriteMeal"

export default function App() {
    const Stack = createStackNavigator();

    return (
        // Do not remove Root! Root is necessary for toasts integrated in successive components.
        <Root>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }} initialRouteName="FavoriteMeal">
                    <Stack.Screen name="Login" component={ LoginManager } options={{gestureEnabled: false}}/>
                    <Stack.Screen name="ForgotPassword" component={ ForgotPassword }/>
                    <Stack.Screen name="Name" component={ Name }/>
                    <Stack.Screen name="Email" component={ Email }/>
                    <Stack.Screen name="Password" component={ Password }/>
                    <Stack.Screen name="MealPlan" component={ MealPlan } options={{gestureEnabled: false}}/>
                    <Stack.Screen name="MealPreferences" component={ MealPreferences } options={{gestureEnabled: false}}/>
                    <Stack.Screen name="Dining" component={ DiningCourt } options={{gestureEnabled: false}}/>
                    <Stack.Screen name="Menu" component={ Menu }/>
                    <Stack.Screen name="MealReview" component={ MealReview }/>
                    <Stack.Screen name="Map" component={ MapManager } options={{gestureEnabled: false}}/>
                    <Stack.Screen name="Profile" component={ ProfileManager }/>
                    <Stack.Screen name="Track" component={ TrackMeals }/>
                    <Stack.Screen name="FavoriteMeal" component= { FavoriteMeal }/>
                    <Stack.Screen name="NavBar" component={ NavBar } options={{gestureEnabled: false}}/>
                    <Stack.Screen name="Template" component={ TemplateComponent }/>
                </Stack.Navigator>
            </NavigationContainer>
        </Root>
    );
}
