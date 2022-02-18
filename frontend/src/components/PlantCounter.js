import React from 'react'
import { useSelector } from 'react-redux'

const PlantCounter = () => {
    const plants = useSelector((state) => state.plants.items)
    const remainingPlants = plants.filter((plant) => plant.isComplete === true)

    if (plants.length > 0) {
        return (
            <section className="plant-counter pc-items">
                <p>You're tracking {plants.length} plants.</p>
                <p>Currently you've cared for {remainingPlants.length} of them.</p>
            </section>
        )
    } else if  (remainingPlants.length === 0) {
        return (
            <section className="plant-counter pc-empty">
                <p>Start by adding a plant and when to water it.</p>
            </section>
        )
    }
}

export default PlantCounter