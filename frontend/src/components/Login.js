import React, { useEffect, useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../utils/constants'
import user from '../reducers/user'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState('login')

    const accessToken = useSelector((store) => store.user.accessToken)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (accessToken) {
            navigate('/')
        }
    }, [accessToken, navigate])

    const onFormSubmit = (event) => {
        event.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }

        fetch(API_URL(mode), options)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    batch(() => {
                        dispatch(user.actions.setUserId(data.response.userId))
                        dispatch(user.actions.setUsername(data.response.username))
                        dispatch(user.actions.setAccessToken(data.response.accessToken))
                        dispatch(user.actions.setError(null))
                    })
                } else {
                    batch(() => {
                        dispatch(user.actions.setUserId(null))
                        dispatch(user.actions.setUsername(null))
                        dispatch(user.actions.setAccessToken(null))
                        dispatch(user.actions.setError(data.response))
                    })
                    return (
                        alert(data.response)
                    )
                }
            })
    }

    return (
        <>
            <section className="login-section">

                <h1>Welcome to Planntr.</h1>

                <img id="login-logo" src={process.env.PUBLIC_URL + '/logo.png'} alt="Planntr logo" />

                <div className="radio-section">
                    <label htmlFor="login">
                        Log in
                        <input
                            id="login"
                            type="radio"
                            checked={mode === 'login'}
                            onChange={() => setMode('login')}
                        />
                    </label>
                    <label htmlFor="signup">
                        &nbsp; Sign up
                        <input
                            id="signup"
                            type="radio"
                            checked={mode === 'signup'}
                            onChange={() => setMode('signup')}    
                        />
                    </label>
                </div>

                <form onSubmit={onFormSubmit}>
                    <div className="input-section">
                        <label htmlFor="username">Username</label>
                            <input
                                className="portal-input"
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        <label htmlFor="password">Password</label>
                            <input
                                className="portal-input"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>

                    <button className="portal-btn btn" type="submit">Submit</button>
                </form>
            </section>
        </>
    )
}

export default Login