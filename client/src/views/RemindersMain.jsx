import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Reminders from '../components/reminders/Reminders';
import RemindersForm from '../components/reminders/RemindersForm';

const RemindersMain = ({ user, pet, setPet, pets, setPets }) => {

    const navigate = useNavigate();
    const createButton = (e) => { navigate("/createPet") }
    const viewAllButton = (e) => { navigate("/viewPets") }
    const appointmentsButton = (e) => { navigate("/appointments") }

    useEffect(() => {
        if (!user) {
            navigate('/home')
            // if user logged in, continue
        } else {
        axios.get('http://localhost:8000/api/currentuser', { withCredentials: true })
            .then(res => {
                //console.log("logged user", res.data)
                console.log("logged in")
            })
            .catch(err => console.log(err))
        }
    }, []);

    return (

        <div className="mx-auto mb-5">
            {user ?
            <div className="row">
                <div className="mx-auto bg-light p-3">
                    <button className="btn btn-secondary m-2" onClick={createButton}>Add a Pet</button>
                    <button className="btn btn-secondary m-2" onClick={viewAllButton}>Pet Dashboard</button>
                    <button className="btn btn-secondary m-2" onClick={appointmentsButton}>Appointments</button>
                </div>

                <Reminders pet={pet} setPet={setPet} pets={pets} setPets={setPets} user={user}/>
                <RemindersForm pet={pet} setPet={setPet} pets={pets} setPets={setPets} user={user} />
            </div>
            :
            navigate('/loginreg')
            }
        </div>

    )
}

export default RemindersMain