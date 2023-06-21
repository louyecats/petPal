import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ViewAllPets = ({ user, pets, setPets }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/home')
            // if user logged in, continue
        } else {
            console.log("user is", user)
            axios.get('http://localhost:8000/api/appts', { withCredentials: true })
                //the response is an array of objects that we will set in state
                .then(res => {
                    console.log(res)
                    setPets(res.data)
                })
        }
    }, [user, navigate, setPets]);

    //delete
    const deletePet = (id) => {
        axios.delete(`http://localhost:8000/api/pet/${id}`)
            .then(res => {
                const filteredPets = pets.filter(pet => pet._id !== id) //get all those who's id's don't match id just deleted and set the in state
                setPets(filteredPets)
                console.log(res)
            })
            .catch(err => console.log(err))
        navigate("/viewPets")
    }
    const viewOne = (id) => {
        navigate(`/viewPet/${id}`)
    }
    const editPet = (id) => {
        navigate(`/editPet/${id}`)
    }
    //petform button
    const createButton = (e) => { navigate("/createPet") }
    const remindersButton = (e) => { navigate("/reminders") }
    const appointmentsButton = (e) => { navigate("/appointments") }

    // const userPets = pets.filter(pet => pet.creator._id === user);

    return (
        <div className="mx-auto">
            <div className="mx-auto bg-light p-3">
                <button className="btn btn-secondary m-2" onClick={createButton}>Add a Pet</button>
                <button className="btn btn-secondary m-2" onClick={remindersButton}>Reminders</button>
                <button className="btn btn-secondary m-2" onClick={appointmentsButton}>Appointments</button>
            </div>
            <h2 className="mt-5">Your Pets:</h2>
            <div className="col col-9 mx-auto">
                {pets.map(pet => (
                    <div className="row bg-light m-5 p-4 rounded mx-auto" key={pet._id}>
                        <h3 className="col">{pet.name}</h3>
                        <p className="col-3">{pet.breed}</p>
                        <p className="col">{pet.age} years old</p>
                        <p className="col">{pet.weight} lbs</p>
                        <div className="col-3">
                            <button className="btn btn-secondary m-1" onClick={(e) => viewOne(pet._id)}>View</button>
                            <button className="btn btn-dark m-1" onClick={(e) => editPet(pet._id)}>Edit</button>
                            <button className="btn btn-danger m-1" onClick={(e) => deletePet(pet._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewAllPets