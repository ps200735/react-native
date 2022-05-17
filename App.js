import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
import Login from "./view/Login";
import AdminStack from "./routes/AdminStack";
import KlantStack from "./routes/KlantStack";


const BegginStack = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="Admin" component={AdminStack} />
      <Stack.Screen name="Klanten" component={KlantStack} /> 
    </Stack.Navigator>
  );
};

const App = ({navigation}) => {
  return (
    <NavigationContainer>
     <BegginStack />
    </NavigationContainer>
  );
};

export default App;
