import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import axios from 'axios'

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            setError('Les mots de passe ne sont pas identiques')
            return
        } else {
            axios
                .post(
                    'http://localhost:8080/user',
                    {
                        username: username,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: password,
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                .then((response) => {
                    navigation.push("S'inscrire")
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    return (
        <View>
            <Text>S'inscrire</Text>
            <TextInput
                placeholder="Nom d'utilisateur"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                placeholder="Prénom"
                onChangeText={(text) => setFirstname(text)}
                value={firstname}
            />
            <TextInput
                placeholder="Nom"
                onChangeText={(text) => setLastname(text)}
                value={lastname}
            />
            <TextInput
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="Email"
            />
            <TextInput
                placeholder="Mot de passe"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <TextInput
                placeholder="Confirmation du mot de passe"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry
            />
            <Text>{error}</Text>
            <Button title="S'inscrire" onPress={handleSignUp} />
        </View>
    )
}

export default SignUpScreen
