import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import plants from '../reducers/plants'

const AddPlant = () => {
    const [input, setInput] = useState('')

    const dispatch = useDispatch()

    const onAddPlant = () => {
        dispatch(plants.actions.addPlant(input))
    }

    return (
        <>
            <section>
                <input
                    type="text"
                    value="{input}"
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Name your plant ..."
                    className="input-text"
                />
                <button
                    onClick={onAddPlant}
                    className="btn-add btn"
                    disabled={input.length < 1 || input.length > 64}
                >
                    <strong>+</strong>
                </button>
            </section>
            <p className="char-count">{input.length} / 64 characters</p>
        </>
    )
}

export default AddPlant