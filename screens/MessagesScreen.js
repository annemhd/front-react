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

                const chatsTable = chatsList.data.filter((chat) => {
                    return chat.members.includes(userInfos.id_user.toString())
                })

                const b = () => {
                    const testConv = []
                    chatsTable.forEach((chat) => {
                        testConv.push(chat.members)
                    })
                    return testConv
                }

                setChats(b)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    // const c = users
    //     .map((user) => {
    //         const matchingChats = chats.filter((chat) => {
    //             return user.id_user.toString().includes(chat[1])
    //         })

    //         console.log(matchingChats)

    //         if (matchingChats.length > 0) {
    //             // console.log(matchingChats)
    //             return { ...user }
    //         }
    //     })
    //     .filter(Boolean)

    // console.log('??? ', c)

    console.log('Chats : ', chats)

    return (
        <div>
            {/* <input type="text" placeholder="Search" value={searchItem} onChange={handleSearch} /> */}
            {/* <ul>
                {chats.map((item) => (
                    <span>{item.username}</span>
                ))}
            </ul> */}
        </div>
    )
}

export default MessagesScreen
