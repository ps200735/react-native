import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Post from '../view/Admin/ProductenAanmakenScreen';
import DeleteScreen from '../view/Admin/DeleteScreen';
import Login from '../view/Login';
import ProductenScreen from '../view/Admin/ProductenScreen';
import DetailsScreen from '../view/Admin/DetailsScreen';
import ProductenAanmakenScreen from '../view/Admin/ProductenAanmakenScreen';
const Stack = createStackNavigator();
const AdminStack = ({navigate}) => {
    return (
        <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="Producten" component={ProductenScreen}  />
            <Stack.Screen name="Detail" component={DetailsScreen} />
            <Stack.Screen name="ProductenAanmaken" component={ProductenAanmakenScreen} />
            <Stack.Screen name="ProductenVerwijderen" component={DeleteScreen} />
            
        </Stack.Navigator>
    );
}

export default AdminStack

const styles = StyleSheet.create({})