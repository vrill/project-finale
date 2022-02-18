import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Header from './Header'
import AddPlant from './AddPlant'
import PlantCounter from './PlantCounter'
import PlantList from './PlantList'

const Main = () => {

    const accessToken = useSelector((store) => store.user.accessToken)

    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken) {
            navigate('/login')
        }
    }, [accessToken, navigate])

    return (
        <>
            <Header />
            <AddPlant />
            <PlantList />
            <PlantCounter />
        </>

    )
}

export default Main