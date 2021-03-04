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
import DiningDollarEntry from "./components/signup/DiningDollarEntry";
import MapManager from "./components/map/MapManager";


export default function App() {
  const Stack = createStackNavigator();

  return (
      // Do not remove Root! Root is necessary for toasts integrated in successive components.
      <Root>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                  headerShown: false
                }} initialRouteName="MealReview">
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
              </Stack.Navigator>
          </NavigationContainer>
      </Root>
  );
}
