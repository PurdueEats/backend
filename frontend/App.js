import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileManager from "./components/profile/ProfileManager.jsx"
import { Root } from "native-base";
import LoginManager from "./components/login/LoginManager"
//import TemplateComponent from "./components/template/TemplateComponent";




export default function App() {



 const Stack = createStackNavigator();

     return (
         // Do not remove Root! Root is necessary for toasts integrated in successive components.
         <Root>
             <NavigationContainer>
              <Stack.Navigator screenOptions={{
                                  headerShown: false
                              }} >
                                  <Stack.Screen name="Profile" component={ProfileManager}/>
                              </Stack.Navigator>

             </NavigationContainer>
         </Root>
     );
 }
