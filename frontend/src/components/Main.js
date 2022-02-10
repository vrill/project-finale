import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { API_URL } from '../utils/constants'

const Main = () => {

    const plantsItems = useSelector((store) => store.plants.items)
    const accessToken = useSelector((store) => store.user.accessToken)
    
    const options = {
        method: 'GET',
        headers: {
            'Authorization': accessToken
        }
    }

    useEffect(() => {
        fetch(API_URL('plants'), options)
            .then((response) => response.json())
            .then((data) => console.log(data))
    }, [])

    return (
        <div>
            <h1>Only for logged in users.</h1>
            <h2>Plants:</h2>
            {plantsItems.map(item => (
                <div key={item._id}>{item.message}</div>
            ))}
        </div>
    )
}

export default Main