import * as React from "react";
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import NavBarManager from "./components/navbar/NavBarManager";
import LoginManager from "./components/login/LoginManager";
import Name from "./components/login/signup/Name";
import Email from "./components/login/signup/Email";
import Password from "./components/login/signup/Password";
import MealPlan from "./components/login/signup/MealPlan";
import MealPreferences from "./components/login/login-accessories/MealPreferences";
import DiningCourt from "./components/home/HomeManager";
import Menu from "./components/home/menu/Menu";
import MealNutrition from "./components/home/menu/MealNutrition";
import RecordMeals from "./components/home/menu/RecordMeals";
import MapManager from "./components/map/MapManager";
import ProfileManager from "./components/profile/ProfileManager";
import SemesterSummary from "./components/profile/profile-accessories/SemesterSummary";
import TrackMeals from "./components/profile/profile-accessories/TrackMeals";
import Notifications from "./components/profile/profile-accessories/Notifications";
import FavoriteMeal from "./components/profile/profile-accessories/FavoriteMeal";
import ForgotPassword from "./components/login/login-accessories/ForgotPassword";
import Schedule from "./components/profile/profile-accessories/Schedule";
import SettingsManager from "./components/settings/SettingsManager";
import Feedback from "./components/settings/settings-accessories/Feedback";
import ReadReviews from "./components/home/menu/ReadReviews";
import WriteReview from "./components/home/menu/WriteReview";
import WaitTimes from "./components/home/home-accessories/WaitTimes";
import DarkMode from "./components/settings/DarkMode";

export default function App() {
    const Stack = createStackNavigator();
    const scheme = useColorScheme();

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
                        <Stack.Screen name="SemesterSummary" component={ SemesterSummary }/>
                        <Stack.Screen name="Settings" component={ SettingsManager }/>
                        <Stack.Screen name="Feedback" component={ Feedback } options={{gestureEnabled: false}}/>
                        <Stack.Screen name="Track" component={ TrackMeals }/>
                        <Stack.Screen name="FavoriteMeal" component= { FavoriteMeal }/>
                        <Stack.Screen name="Notifications" component= { Notifications }/>
                        <Stack.Screen name="EditSchedule" component={ Schedule }/>
                        <Stack.Screen name="ReadReviews" component= { ReadReviews }/>
                        <Stack.Screen name="WriteReview" component= { WriteReview }/>
                        <Stack.Screen name="WaitTimes" component= { WaitTimes }/>
                        <Stack.Screen name="DarkMode" component= { DarkMode }/>
                        <Stack.Screen name="NavBar" component={ NavBarManager } options={{gestureEnabled: false}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
        </Root>
    );
}
