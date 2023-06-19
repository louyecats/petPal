import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const PetForm = ({pet, setPet, user}) => {
	const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const changeHandler = e => {
        // console.log(pet)
        setPet({
            ...pet, 
            [e.target.id]: e.target.value
        })    
    }

    const submitHandler = e => {
        e.preventDefault()
        // if no user logged in, redirect
        if (!user) {
            navigate('/home')
        // if user logged in, continue
        } else {
            console.log('logged in')
            // send form data combined with calculated age
            axios.post('http://localhost:8000/api/pet', {...pet, age:Math.abs(new Date (Date.now() - new Date(pet.birthday)).getUTCFullYear() - 1970)}, {withCredentials:true})
                .then(res => {
                    console.log(res)
                    navigate("/viewPets") //to refresh route after form completed and display created
                })
                .catch(err => {
                    console.log(err);
                    const errorResponse = err.response.data.errors;
                    const errorArr = [];
                    for (const key of Object.keys(errorResponse)){
                        errorArr.push(errorResponse[key].message)
                    }
                    console.log("Something went wrong submitHandler", errorResponse)
                    setErrors(errorArr);
                });
            };
    }
    const viewAllButton = (e) => {navigate("/viewPets")}
    const remindersButton = (e) => {navigate("/reminders")}
    const appointmentsButton = (e) => {navigate("/appointments")}

    return (
    <div className="row mx-auto">
        <div className="mx-auto bg-light p-3">
            <button className="btn btn-secondary m-2" onClick={viewAllButton}>Pet Dashboard</button>
            <button className="btn btn-secondary m-2" onClick={remindersButton}>Reminders</button>
            <button className="btn btn-secondary m-2" onClick={appointmentsButton}>Appointments</button>
        </div>
            <div className="col bg-light p-5 m-5 rounded">
                <h2 className="row-1">Add New Pet:</h2>
                <form action="" className="row" onSubmit={submitHandler}>

                {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}

                    <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" className="form-control" onChange={changeHandler}/>
                    </div>

                    <div className="form-group">
                    <label htmlFor="birthday">Birthday:</label>
                    <input type="date" name="birthday" id="birthday" className="form-control" onChange={changeHandler}/>
                    </div>

                    {pet.birthday && pet.birthday.length===10 && <p>* Age: {Math.abs(new Date (Date.now() - new Date(pet.birthday)).getUTCFullYear() - 1970)}</p>}

                    <div className="form-group">
                    <label htmlFor="breed">Breed:</label>
                    <input type="string" name="breed" id="breed" className="form-control" onChange={changeHandler}/>
                    </div>

                    <div className="form-group">
                    <label htmlFor="weight">Weight:</label>
                    <input type="number" step="0.1" name="weight" id="weight" className="form-control" onChange={changeHandler}/>
                    </div>

                    <div className="form-group">
                    <label htmlFor="allergies">Allergies:</label>
                    <input type="string" name="allergies" id="allergies" className="form-control" onChange={changeHandler}/>
                    </div>

                    <button className="btn btn-secondary mt-3">Submit</button>
                </form>
            </div>

            <div className="col bg-light p-5 m-5 rounded">
            <h2 className="row-1">Our Sponsors:</h2>
            </div>
        </div>
    )
}

export default PetForm