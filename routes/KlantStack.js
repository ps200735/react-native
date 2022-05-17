import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DetailsScreen from '../view/DetailsScreen';
import HomeScreen from '../view/HomeScreen';
import Login from '../view/Login';
import favoriteScreen from '../view/favoriteScreen';

const Stack = createStackNavigator();


const KlantStack = () => {
   
    return (
        <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="Home" component={HomeScreen }   />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="favorite" component={favoriteScreen} />
            
        </Stack.Navigator>
    );
}

export default KlantStack
