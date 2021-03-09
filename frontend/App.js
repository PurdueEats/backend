import * as React from "react";
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginManager from "./components/login/LoginManager"
import TemplateComponent from "./components/template/TemplateComponent";
import MealPreferences from "./components/login/MealPreferences";
import MealReview from "./components/meal-review/MealReview";
import Name from "./components/signup/Name";
import Email from "./components/signup/Email";
import Password from "./components/signup/Password";
import MealPlan from "./components/signup/MealPlan";
import MapManager from "./components/map/MapManager";

export default function App() {
    const Stack = createStackNavigator();

<<<<<<< HEAD
  return (
      // Do not remove Root! Root is necessary for toasts integrated in successive components.
      <Root>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                  headerShown: false
                }} initialRouteName="Map">
                  <Stack.Screen name="Login" component={ LoginManager }/>
                  <Stack.Screen name="SignupBegin" component={ Name }/>
                  <Stack.Screen name="SignupEmail" component={ Email }/>
                  <Stack.Screen name="SignupPassword" component={ Password }/>
                  <Stack.Screen name="SignupMealPlan" component={ MealPlan }/>
                  <Stack.Screen name="SignupDiningDollars" component={ DiningDollarEntry }/>
                  <Stack.Screen name="MealPreferences" component={ MealPreferences }/>
                  <Stack.Screen name="MealReview" component={ MealReview }/>
                  <Stack.Screen name="Map" component={ MapManager }/>
                  <Stack.Screen name="Template" component={ TemplateComponent }/>
=======
    return (
        // Do not remove Root! Root is necessary for toasts integrated in successive components.
        <Root>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }} initialRouteName="Login">
                  <Stack.Screen name="Login" component={ LoginManager } options={{gestureEnabled: false}}/>
                  <Stack.Screen name="Name" component={ Name }/>
                  <Stack.Screen name="Email" component={ Email }/>
                  <Stack.Screen name="Password" component={ Password }/>
                  <Stack.Screen name="MealPlan" component={ MealPlan } options={{gestureEnabled: false}}/>
                  <Stack.Screen name="MealPreferences" component={ MealPreferences } options={{gestureEnabled: false}}/>
                  <Stack.Screen name="Map" component={ MapManager } options={{gestureEnabled: false}} />
                  <Stack.Screen name="Template" component={ TemplateComponent } options={{gestureEnabled: false}}/>
>>>>>>> 4f45bbb824d5e534370f93590a9c94f17a7d9d69
              </Stack.Navigator>
          </NavigationContainer>
      </Root>
  );
}