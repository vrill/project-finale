import React from 'react'

import moment from 'moment'

const Header = () => {
    const dateTime = moment().format("dddd, MMM Do")

    return (
        <header>
            <h1>Planntr.</h1>
            <section className="date-time">
                <p>Today is {dateTime}.</p>
            </section>
        </header>
    )
}

export default Header