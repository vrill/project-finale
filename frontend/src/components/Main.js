import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import plants from '../reducers/plants'
import { API_URL } from '../utils/constants'

const Main = () => {

    const plantsItems = useSelector((store) => store.plants.items)
    const accessToken = useSelector((store) => store.user.accessToken)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken) {
            navigate('/login')
        }
    }, [accessToken, navigate])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            }
        }

        fetch(API_URL('plants'), options)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch(plants.actions.setItems(data.response))
                    dispatch(plants.actions.setError(null))
                } else {
                    dispatch(plants.actions.setItems([]))
                    dispatch(plants.actions.setError(data.response))
                }
            })
    }, [accessToken])

    return (
        <div>
            <div>
                <Link to="/login">To login portal.</Link>
            </div>
            <h1>Only for logged in users.</h1>
            <h2>Plants:</h2>
            {plantsItems.map(item => (
                <div key={item._id}>{item.message}</div>
            ))}
        </div>
    )
}

export default Main