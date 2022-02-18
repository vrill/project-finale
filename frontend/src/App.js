import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Login from './components/Login'
import Main from './components/Main'
import NotFound from './components/NotFound'

import user from './reducers/user'
import plants from './reducers/plants'

const reducer = combineReducers({
    user: user.reducer,
    plants: plants.reducer
})

const store = configureStore({ reducer })

export const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}