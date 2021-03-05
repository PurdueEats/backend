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
import DiningFacilities from "./components/dining/DiningFacilities";
import NavBar from "./components/home/NavBar";


export default function App() {
  const Stack = createStackNavigator();

  return (
      // Do not remove Root! Root is necessary for toasts integrated in successive components.
      <Root>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                  headerShown: false
                }} initialRouteName="NavBar">
                  <Stack.Screen name="NavBar" component={ NavBar}/>
              </Stack.Navigator>
          </NavigationContainer>
      </Root>
  );
}
