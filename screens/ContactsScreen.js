import React, { useState, useEffect } from 'react'
import { View, TextInput } from 'react-native'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const ContactsScreen = () => {
    const token = localStorage.getItem('current-user')
    const userInfos = jwtDecode(token)

    const [searchItem, setSearchItem] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersList = await axios.get('http://localhost:8080/users')
                const contacts = await axios.get('http://localhost:8080/relations')
                setUsers(usersList.data)

                const a = contacts.data.filter((contact) => {
                    return contact.id_user === userInfos.id_user
                })

                const b = usersList.data
                    .map((user) => {
                        const matchingContacts = a.filter((contact) => {
                            return contact.id_contact === user.id_user
                        })

                        if (matchingContacts.length > 0) {
                            return { ...user, matchingContacts }
                        }
                    })
                    .filter(Boolean)

                setUsers(b)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const handleSearch = async (e) => {
        const searchTerm = e.target.value.toLowerCase()
        setSearchItem(searchTerm)

        if (searchTerm.trim() !== '') {
            const usersList = await axios.get('http://localhost:8080/users')
            setUsers(
                usersList.data.filter((user) => user.username.toLowerCase().includes(searchTerm))
            )
        } else {
            const usersList = await axios.get('http://localhost:8080/users')
            const contacts = await axios.get('http://localhost:8080/relations')
            setUsers(usersList.data)

            const a = contacts.data.filter((contact) => {
                return contact.id_user === userInfos.id_user
            })

            const b = usersList.data
                .map((user) => {
                    const matchingContacts = a.filter((contact) => {
                        return contact.id_contact === user.id_user
                    })

                    if (matchingContacts.length > 0) {
                        return { ...user, matchingContacts }
                    }
                })
                .filter(Boolean)
            setUsers(b)
        }
    }

    const addContact = async (user) => {
        try {
            await axios.post(
                'http://localhost:8080/relation',
                {
                    id_user: userInfos.id_user,
                    id_contact: user,
                    status: 'pending',
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <input type="text" placeholder="Search" value={searchItem} onChange={handleSearch} />
            <ul>
                {users.map((item) => (
                    <li key={item.id_user}>
                        {item.username}{' '}
                        {searchItem !== '' && (
                            <button onClick={() => addContact(item.id_user)}>ajouter</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ContactsScreen
