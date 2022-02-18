import React from 'react'
import { useSelector } from 'react-redux'

const PlantCounter = () => {
    const plants = useSelector((state) => state.plants.items)
    const remainingPlants = plants.filter((plant) => plant.isComplete === true)

    if (plants.length > 0) {
        return (
            <section className="plant-counter pc-items">
                <p>You're tracking {plants.length} plants.</p>
                <p>You've currently watered {remainingPlants} of them.</p>
            </section>
        )
    } else if  (remainingPlants.length === 0) {
        return (
            <section className="plant-counter pc-empty">
                <p>You haven't added any plants!</p>
                <p>You can add one and when to water it.</p>
            </section>
        )
    }
}

export default PlantCounter