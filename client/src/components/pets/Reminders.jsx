import React from 'react'

const Reminders = ({user, setUser}) => {

    return (
    <div className="col">
        <h2>Reminders:</h2>
        <div className="row bg-secondary p-3">
            <h3>Date: {}</h3>
            <p>Details: {}</p>
            <checkboxk>Completed:</checkboxk>
        </div>
    </div>
    )
}

export default Reminders