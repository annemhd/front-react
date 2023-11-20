import React, { useState, useEffect } from 'react'
import { View, TextInput } from 'react-native'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const ContactsScreen = async () => {
    // const [searchTerm, setSearchTerm] = useState('')
    // const [users, setUsers] = useState([])
    // const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = () => {
            try {
                const response = axios.get('http://localhost:8080/users')
                // setUsers(data)
                console.log(response)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()

        // console.log(users)

        // if (searchTerm.trim() !== '') {
        //     fetchData()
        //     data = data.filter((user) => user.email === searchTerm)
        // } else {
        //     setData([]) // Clear the data if the search term is empty
        // }
    }, [])

    return (
        <div>
            {/* <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )} */}
        </div>
    )
}

export default ContactsScreen
