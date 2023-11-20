import React from 'react'
import { View, Text } from 'react-native'
import { jwtDecode } from 'jwt-decode'

const SettingsScreen = () => {
    const token = localStorage.getItem('current-user')
    const userInfos = jwtDecode(token)

    return (
        <View>
            <Text>Settings</Text>
        </View>
    )
}

export default SettingsScreen
