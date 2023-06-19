import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Appointments = ({ setPets }) => {
    const { id } = useParams();
    const [allUsersPets, setAllUsersPets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/appts', { withCredentials: true })
            .then(res => {
                console.log("allUsersPets res.data", res.data)
                setAllUsersPets(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleDeleteAppointment = (petId, appointmentId) => {
        axios.delete(`http://localhost:8000/appt/delete/${petId}/${appointmentId}`, { withCredentials: true })
            .then((res) => {
                console.log("res.data.pets", res.data.pets)
                setPets(res.data.pets)
                window.location.reload();
            })
            .catch(error => {
                console.error('Failed to delete appointment:', error.message);
            });
    };

    return (
        // pet is pet object, appointment is each appointment object
        <div className="bg-light rounded mx-auto col-7 mt-5 p-4">
            <div>
                <h2>Appointments:</h2>
                <div>
                    {allUsersPets.map(pet => {
                        return pet.appointments.map(appointment => (
                            <div key={pet._id}>
                                <p className="text-start">
                                    <span className="fw-bolder text-start">Appointment for:  </span>
                                    {pet.name}
                                </p>
                                <p className="text-start">
                                    <span className="fw-bolder text-start">Date: </span>
                                    {new Date(appointment.apptDateTime).toDateString()}
                                </p>
                                <p className="text-start">
                                    <span className="fw-bolder text-start">Time:  </span>
                                    {new Date(appointment.apptDateTime).toLocaleTimeString()}
                                </p>
                                <p className="text-start">
                                    <span className="fw-bolder text-start">Reason:  </span>
                                    {appointment.apptReason}
                                </p>
                                {appointment.apptOther ?
                                    <p className="text-start">
                                        <span className="fw-bolder text-start">Other:  </span>
                                        {appointment.apptOther}
                                    </p>
                                    : ""
                                }
                                <button className="btn btn-secondary m-2 col-2 p-2" onClick={(e) => handleDeleteAppointment(pet._id, appointment._id)}>Completed</button>
                            </div>
                        ))
                    })}
                </div>
            </div>
        </div>
    )
}

export default Appointments