import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import plants from '../reducers/plants'

const PlantList = () => {
    const items = useSelector((store) => store.plants.items)

    const dispatch = useDispatch()

    const deleteAllPlants = () => {
        dispatch(plants.actions.deleteAllPlants)
    }

    const onTogglePlant = (id) => {
        dispatch(plants.actions.togglePlant(id))
    }

    const onDeletePlant = (id) => {
        dispatch(plants.actions.deletePlant(id))
    }

    return (
        <section className="todo-items">
            <div className="todo-items-header">
                <p>Watered?</p>
                <p>Plant to water</p>
                <button
                    onClick={deleteAllPlants}
                    className="btn-del-all btn"
                    disabled={items < 1}
                >
                    <strong>Remove all</strong>
                </button>
            </div>
            {items.map((item, index) => (
                <div className="todo-item-flex" key={item.id}>
                    <label className="checkbox-container">
                        <p className="item-text">{item.text}</p>
                        <input
                            type="checkbox"
                            checked={item.isComplete}
                            onChange={() => onTogglePlant(item.id)}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <button
                        onClick={() => onDeletePlant(item.id)}
                        className="btn-del btn"
                    >
                        <strong>Remove</strong>
                    </button>
                </div>
            ))}
        </section>
    )
}

export default PlantList