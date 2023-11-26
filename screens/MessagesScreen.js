import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const MessagesScreen = () => {
    const token = localStorage.getItem('current-user')
    const userInfos = jwtDecode(token)

    const [users, setUsers] = useState([])
    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersList = await axios.get('http://localhost:8080/users')
                const chatsList = await axios.get('http://localhost:8080/chats')
                const messagesList = await axios.get('http://localhost:8080/messages')

                setUsers(usersList.data)
                setChats(chatsList.data)
                setMessages(messagesList.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const combinedArray = chats.map((chat) => {
        const members = chat.members.map((memberId) => {
            const user = users.find((user) => user.id_user.toString() === memberId)
            return user
        })

        const allMessages = messages.filter((message) => message.id_chat === chat.id_chat)

        return { ...chat, members, allMessages }
    })

    console.log(combinedArray)

    return (
        <div>
            {chats.map((innerArray, outerIndex) => (
                <div key={outerIndex}>
                    _____
                    <div>
                        {innerArray.map((user, innerIndex) => (
                            <span key={innerIndex}>{user.username} </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MessagesScreen
