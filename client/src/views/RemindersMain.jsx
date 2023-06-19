import React from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../views/Header';

const RemindersMain = () => {

    const navigate = useNavigate();
    const createButton = (e) => {navigate("/createPet")}
    const viewAllButton = (e) => {navigate("/viewPets")}
    const appointmentsButton = (e) => {navigate("/appointments")}
    
    return (

    <div className="mx-auto">
         <div className="row">
            <div className="mx-auto bg-light p-3">
                <button className="btn btn-secondary m-2"  onClick={createButton}>Add a Pet</button>
                <button className="btn btn-secondary m-2"  onClick={viewAllButton}>Pet Dashboard</button>
                <button className="btn btn-secondary m-2" onClick={appointmentsButton}>Appointments</button>
            </div>
        </div>
    </div>

    )
}

export default RemindersMain