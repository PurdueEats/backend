import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DiningFacilities from "../dining/DiningFacilities";
import MapManager from "../map/MapManager";

const Tab = createBottomTabNavigator();

function NavBar() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: 'red',
            }}
        >
            <Tab.Screen
                name="Home"
                component={DiningFacilities}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapManager}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="map-marker" color={color} size={size} />
                    ),
                }}
            />
            {/*
            <Tab.Screen
                name="Buddy"
                component={FindABuddy}
                options={{
                    tabBarLabel: 'Buddy',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-multiple" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Buddy"
                component={FindABuddy}
                options={{
                    tabBarLabel: 'Buddy',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={size} />
                    ),
                }}
            />
            */}

        </Tab.Navigator>
    );
}
export default NavBar;
