import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentForm from '../components/pets/AppointmentForm';
import Appointments from '../components/pets/Appointments';

const AppointmentsMain = ({ user, pet, setPet, pets, setPets }) => {

  const navigate = useNavigate();

  const createButton = (e) => { navigate("/createPet") }
  const viewAllButton = (e) => { navigate("/viewPets") }
  const remindersButton = (e) => { navigate("/reminders") }

  useEffect(() => {
    axios.get('http://localhost:8000/api/currentuser', { withCredentials: true })
      .then(res => {
        console.log("logged user", res.data)
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="mx-auto mb-5">
      <div className="row">
        <div className="mx-auto bg-light p-3">
          <button className="btn btn-secondary m-2" onClick={createButton}>Add a Pet</button>
          <button className="btn btn-secondary m-2" onClick={viewAllButton}>Pet Dashboard</button>
          <button className="btn btn-secondary m-2" onClick={remindersButton}>Reminders</button>
        </div>

        <Appointments pet={pet} setPet={setPet} pets={pets} setPets={setPets} user={user} />
        <AppointmentForm pet={pet} pets={pets} setPets={setPets} user={user} />
      </div>
    </div>

  )
}

export default AppointmentsMain