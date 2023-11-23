import React, { useState, useEffect } from 'react'
import { View, TextInput } from 'react-native'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const ContactsScreen = () => {
    const [searchItem, setSearchItem] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:8080/users')
                setUsers(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const handleSearch = async (e) => {
        const searchTerm = e.target.value
        setSearchItem(searchTerm)
        console.log(searchTerm)

        if (searchTerm.trim() !== '') {
            setUsers(users.filter((user) => user.email.includes(searchTerm)))
            console.log(users)
        } else {
            const { data } = await axios.get('http://localhost:8080/users')
            setUsers(data)
        }
    }

    return (
        <div>
            <input type="text" placeholder="Search" value={searchItem} onChange={handleSearch} />

            <p>Loading...</p>

            <ul>
                {users.map((item) => (
                    <li key={item.id_user}>{item.username}</li>
                ))}
            </ul>
        </div>
    )
}

export default ContactsScreen
