import * as React from "react";
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginManager from "./components/login/LoginManager"
import TemplateComponent from "./components/template/TemplateComponent";

export default function App() {
  const Stack = createStackNavigator();

  return (
      // Do not remove Root! Root is necessary for toasts integrated in successive components.
      <Root>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                  headerShown: false
                }} initialRouteName="Login">
                  <Stack.Screen name="Login" component={LoginManager}/>
                  <Stack.Screen name="Test" component={TemplateComponent} />
              </Stack.Navigator>
          </NavigationContainer>
      </Root>
  );
}
