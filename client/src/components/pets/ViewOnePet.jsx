import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'


const ViewOnePet = ({pet, setPet, user, setUser}) => {

    const {id} = useParams();
    const navigate = useNavigate();

	useEffect(() => {
        if (!user) {
            navigate('/home')
        // if user logged in, continue
        } else {
            console.log('logged in')
        axios.get(`http://localhost:8000/api/pet/${id}`, {withCredentials:true})
            .then( res => {
                console.log(res.data.pet);
                setPet(res.data.pet);
            })
            .catch( err => console.log(err) );
        }
}, []);

    //delete button
    const deletePet = (e) => {
        axios.delete(`http://localhost:8000/api/pet/${id}`, {withCredentials:true})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        navigate("/viewPets")
}
    //edit button
    const editPet =(id) => {
        navigate(`/editPet/${id}`)
    }
    
    

    const viewAllButton = (e) => {navigate("/viewPets")}
    const createButton = (e) => {navigate("/createPet")}
    const remindersButton = (e) => {navigate("/reminders")}
    const appointmentsButton = (e) => {navigate("/appointments")}

    return (
    <div className="row mx-auto">
        <div className="mx-auto bg-light p-3">
            <button className="btn btn-secondary m-2"  onClick={createButton}>Add a Pet</button>
            <button className="btn btn-secondary m-2"  onClick={viewAllButton}>Pet Dashboard</button>
            <button className="btn btn-secondary m-2" onClick={remindersButton}>Reminders</button>
            <button className="btn btn-secondary m-2" onClick={appointmentsButton}>Appointments</button>
        </div>
        <div className="col-4 bg-light p-5 m-5 rounded">
            <h3>Notes:</h3>
            <ul className="bg-white border rounded p-3 m-3">
            <li>{pet.notes}</li>
            </ul>
        </div>
        <div className="col-6 bg-light p-5 m-5 rounded">
            <div className="row mb-2">
                <h2 className="display-4 col offset-2">{pet.name} </h2>
                <button className="btn btn-secondary col-2">Add Reminder</button>
            </div>
            <div className="bg-white rounded border m-3 p-3 text-start">
                <p>
                    <span className="fw-bolder">Breed: </span>
                    {pet.breed}
                </p> 
                <p>
                    <span className="fw-bolder">Birthday: </span>
                    {new Date(pet.birthday).toDateString()}
                </p> 
                <p>
                <span className="fw-bolder">Age: </span>
                    {pet.age}
                </p> 
                <p>
                    <span className="fw-bolder">Weight: </span>
                    {pet.weight} lbs
                </p> 

                    <span className="fw-bolder">Allergies: </span>
                    <ul>
                        <li>{pet.allergies}</li>
                    </ul>


                    <span className="fw-bolder">Illnesses: </span>
                    <ul>
                        <li>{pet.illnesses}</li>
                    </ul>


                    <span className="fw-bolder">Medications: </span>
                    <ul>
                        <li>{pet.medications}</li>
                    </ul>


                    <span className="fw-bolder">Vaccinations: </span>
                    <ul>
                        <li>{pet.vaccinations}</li>
                    </ul>


                    <span className="fw-bolder">Surgeries: </span>
                    <ul>
                        <li>{pet.surgeries}</li>
                    </ul>

            </div>

            <button className="btn btn-secondary m-2" onClick={(e) => editPet(pet._id)}>Update Records</button>
            <button className="btn btn-danger m-2" onClick={deletePet}>Delete</button>
        </div>
    </div>
    )
}

export default ViewOnePet