import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeManager from "../home/HomeManager";
import MapManager from "../map/MapManager";
import ProfileManager from "../profile/ProfileManager";
import Settings from "../settings/SettingsManager";

function NavBarManager({route}) {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    return (
        <Tab.Navigator
            initialRouteName="Dining"
            tabBarOptions={{
                activeTintColor: 'red'
            }}
        >
            <Stack.Screen
                name="Dining"
                component={ HomeManager }
                initialParams={{ UserID: route.params.UserID, token: route.params.token }}
                options={{
                    tabBarLabel: 'Dining',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Stack.Screen
                name="Map"
                component={ MapManager }
                initialParams={{ UserID: route.params.UserID, token: route.params.token }}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="map-marker" color={color} size={size} />
                    ),
                }}
            />
            <Stack.Screen
                name="Profile"
                component={ ProfileManager }
                initialParams={{ UserID: route.params.UserID, token: route.params.token }}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                    ),
                }}
            />
            <Stack.Screen
                name="Settings"
                component={ Settings }
                initialParams={{ UserID: route.params.UserID, token: route.params.token }}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cellphone-settings" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default NavBarManager;