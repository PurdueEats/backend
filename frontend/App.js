import * as React from "react";
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import LoginManager from "./components/login/LoginManager";
import ProfileManager from "./components/profile/ProfileManager";
import MealPreferences from "./components/meal/MealPreferences";
import DiningCourt from "./components/dining/DiningFacilities";
import Menu from "./components/dining/Menu";
import MealNutrition from "./components/meal/MealNutrition";
import RecordMeals from "./components/meal/RecordMeals";
import Name from "./components/signup/Name";
import Email from "./components/signup/Email";
import Password from "./components/signup/Password";
import MealPlan from "./components/signup/MealPlan";
import MapManager from "./components/map/MapManager";
import NavBar from "./components/navbar/NavBar";
import ForgotPassword from "./components/login/ForgotPassword";
import TrackMeals from "./components/meal/TrackMeals";
import FavoriteMeal from "./components/meal/FavoriteMeal";
import ScheduleManager from "./components/profile/ScheduleManager";
import Notifications from "./components/meal/Notifications";

export default function App() {
    const Stack = createStackNavigator();
    const scheme = useColorScheme();
//    const MyDarkTheme = {
//        dark: true,
//        colors: {
//            primary: "#9933FF",
//            background: "#000023",
//            card: "#000028",
//            text: "#ffffff",
//            border: "#000028",
//            notification: "#9933FF",
//        },
//    };

    return (
        // Do not remove Root! Root is necessary for toasts integrated in successive components.
        <Root>
            <AppearanceProvider>
                <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
                    <Stack.Navigator screenOptions={{
                        headerShown: false
                    }} initialRouteName="Login">
                        <Stack.Screen name="Login" component={ LoginManager } options={{gestureEnabled: false}}/>
                        <Stack.Screen name="ForgotPassword" component={ ForgotPassword }/>
                        <Stack.Screen name="Name" component={ Name }/>
                        <Stack.Screen name="Email" component={ Email }/>
                        <Stack.Screen name="Password" component={ Password }/>
                        <Stack.Screen name="MealPlan" component={ MealPlan } options={{gestureEnabled: false}}/>
                        <Stack.Screen name="MealPreferences" component={ MealPreferences } options={{gestureEnabled: false}}/>
                        <Stack.Screen name="Dining" component={ DiningCourt }/>
                        <Stack.Screen name="Menu" component={ Menu }/>
                        <Stack.Screen name="MealNutrition" component={ MealNutrition }/>
                        <Stack.Screen name="MealReview" component={ RecordMeals }/>
                        <Stack.Screen name="Map" component={ MapManager }/>
                        <Stack.Screen name="Profile" component={ ProfileManager }/>
                        <Stack.Screen name="EditSchedule" component={ ScheduleManager }/>
                        <Stack.Screen name="Track" component={ TrackMeals }/>
                        <Stack.Screen name="FavoriteMeal" component= { FavoriteMeal }/>
                        <Stack.Screen name="Notifications" component= { Notifications }/>
                        <Stack.Screen name="NavBar" component={ NavBar } options={{gestureEnabled: false}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
        </Root>
    );
}
