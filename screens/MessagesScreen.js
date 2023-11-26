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

    const chatsInfos = chats.map((chat) => {
        const members = chat.members.map((memberId) => {
            const user = users.find((user) => user.id_user.toString() === memberId)
            return user
        })

        const allMessages = messages.filter((message) => message.id_chat === chat.id_chat)

        return { ...chat, members, allMessages }
    })

    console.log(chatsInfos)

    return (
        <div>
            {chatsInfos.map((chat) => (
                <div key={chat.id_chat}>
                    <div>
                        {chat.members
                            .filter((user) => user.id_user !== userInfos.id_user)
                            .map((user) => (
                                <span key={user.id_user}>{user.username} </span>
                            ))}
                    </div>
                    <div>{chat.allMessages[0].message}</div>
                </div>
            ))}
        </div>
    )
}

export default MessagesScreen
