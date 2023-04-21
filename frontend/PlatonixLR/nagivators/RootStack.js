import React from 'react';
import {Colors} from './../components/styles';
const {primary, tertiary, brand} = Colors;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './../screens/Login';
import Register from './../screens/Register';
import Welcome from './../screens/Welcome';
import Help from './../screens/Help';


const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent'
                },
                haederTintColor: tertiary,
                headerTransparent: true,
                headerTitle:'',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                }

            }}
            initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen options={{headerTintColor: brand}} name="Welcome" component={Welcome} />
                <Stack.Screen name="Help" component={Help} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootStack;