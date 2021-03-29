import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DiningFacilities from "../dining/DiningFacilities";
import MapManager from "../map/MapManager";
import ProfileManager from "../profile/ProfileManager";

function NavBar({route, navigation}) {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Dining"
            tabBarOptions={{
                activeTintColor: 'red',
                // activeBackgroundColor: '#f2f2f2',
                // inactiveBackgroundColor: '#f2f2f2'
            }}
        >
            <Stack.Screen
                name="Dining"
                component={ DiningFacilities }
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
        </Tab.Navigator>
    );
}

export default NavBar;
