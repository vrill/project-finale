import { createSlice } from '@reduxjs/toolkit'
import uniqid from 'uniqid'

const plants = createSlice({
    name: 'plants',
    initialState: {
        items: [],
        error: null,
    },
    reducers: {
        addPlant: (store, action) => {
            const data = action.payload

            const newPlant = {
                id: uniqid(),
                text: data,
                isComplete: false,
            }
            store.items = [...store.items, newPlant]
        },
        togglePlant: (store, action) => {
            const updatedItems = store.items.map((item) => {
                if (item.id === action.payload) {
                    const updatedPlant = {
                        ...item,
                        icComplete: !item.isComplete,
                    }
                    return updatedPlant
                } else {
                    return item
                }
            })
            store.items = updatedItems
        },
        deletePlant: (store, action) => {
            const decreasedItems = store.items.filter((item) => item.id !== action.payload)

            store.items = decreasedItems
        },
        deleteAllPlants: (store) => {
            store.items = []
        },
        setError: (store, action) => {
            store.error = action.payload
        },
    }
})

export default plants