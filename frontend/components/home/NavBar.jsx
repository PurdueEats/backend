import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DiningFacilities from "../dining/DiningFacilities";
import MapManager from "../map/MapManager";

function NavBar() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();

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
                        <MaterialCommunityIcons
                            onPress={navigation.navigate("Template")}
                            name="home" color={color} size={size} />
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
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
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
