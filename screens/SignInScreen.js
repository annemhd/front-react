import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import axios from 'axios'
import CryptoJS from 'react-native-crypto-js'
import jwt from 'jwt-encode'

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function generateMD5(password) {
        const md5Hash = CryptoJS.MD5(password).toString()
        return md5Hash
    }

    const handleSignIn = async () => {
        const passwordMD5 = generateMD5(password)

        try {
            const { data } = await axios.get('http://localhost:8080/users')
            const user = data.filter(
                (user) => user.email === email && user.password === passwordMD5
            )

            if (user.length > 0) {
                const payload = user[0]
                const secret = 'xxx'
                const token = jwt(payload, secret)
                localStorage.setItem('current-user', token)
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const signUp = async () => {
        navigation.push("S'inscrire")
    }

    return (
        <View>
            <Text>Se connecter</Text>
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
            <TextInput
                placeholder="Mot de passe"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <Button title="Se connecter" onPress={handleSignIn} />
            <Button title="S'inscrire" onPress={signUp} />
        </View>
    )
}

export default SignInScreen
