import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Reminders = ({ setPets, user }) => {
    const { id } = useParams();
    // const [allUsersReminders, setAllUsersReminders] = useState([]);
    const [allUsersPets, setAllUsersPets] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/reminders', { withCredentials: true })
    //         .then(res => {
    //             console.log("allUsersReminders API response:", res.data.reminders);
    //             setAllUsersReminders(res.data.reminders);
    //             //console.log('allUsersReminders:', allUsersReminders)
    //         })
    //         .catch(err => console.log(err));
    // }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/appts', { withCredentials: true })
            .then(res => {
                console.log("allUsersPets res.data", res.data)
                setAllUsersPets(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleDeleteReminder = (reminderId) => {
        axios.delete(`http://localhost:8000/api/reminders/${reminderId}`, { withCredentials: true })
            .then((res) => {
                console.log("successfully deleted appointment")
                window.location.reload();
            })
            .catch(error => {
                console.error('Failed to delete reminder:', error.message);
            });
    };

    return (
        <div className="bg-light rounded mx-auto col-7 mt-5 p-4">
            <div>
                <h2>Reminders:</h2>
                <div>
                    {allUsersPets.map(pet => {
                        return ( pet.reminders.map
                            (reminder => (
                            <div key={pet._id}>
                                {/* <p className="text-start">
                                    <span className="fw-bolder text-start">Reminder for:  </span>
                                    {reminder.pet.name}
                                </p> */}
                                <p className="text-start">
                                    <span className="fw-bolder text-start">Date: </span>
                                    {new Date(reminder.reminderDate).toDateString()}
                                </p>
                                <p className="text-start">
                                    <span className="fw-bolder text-start">Description: </span>
                                    {reminder.description}
                                </p>
                                <button className="btn btn-secondary m-2 col-2 p-2" onClick={(e) => handleDeleteReminder(reminder._id)}>Delete</button>
                            </div>
                            )))
                            })}
                </div>
            </div>
        </div>
    )
}

export default Reminders