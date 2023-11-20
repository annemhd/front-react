import React from 'react'
import { View, Text } from 'react-native'
import { jwtDecode } from 'jwt-decode'

const MessagesScreen = () => {
    const token = localStorage.getItem('current-user')
    const userInfos = jwtDecode(token)

    return (
        <View>
            <Text>Messages</Text>
        </View>
    )
}

export default MessagesScreen
