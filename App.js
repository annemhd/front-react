import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import MessagesScreen from './screens/MessagesScreen'
import ContactsScreen from './screens/ContactsScreen'
import SettingsScreen from './screens/SettingsScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

const App = () => {
    return !localStorage.getItem('current-user') ? (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name="Se connecter" component={SignInScreen} />
                <Stack.Screen name="S'inscrire" component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    ) : (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Messages"
                    component={MessagesScreen}
                    onPress={() => navigation.navigate('Messages')}
                />
                <Tab.Screen
                    name="Contacts"
                    component={ContactsScreen}
                    onPress={() => navigation.navigate('Contacts')}
                />
                <Tab.Screen
                    name="Profil"
                    component={SettingsScreen}
                    onPress={() => navigation.navigate('Settings')}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App
