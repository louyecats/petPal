import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Home = ({user, setUser}) => {

    const navigate = useNavigate();
    
    //get logged in user w/token credentials
    useEffect(() => {
        axios.get("http://localhost:8000/api/currentuser", {withCredentials: true})
        .then(res => {
            //print logged in user
            console.log("logged user" + JSON.stringify(res.data))
            //set logged in user in  state
            setUser(res.data.email);
        })
        .catch(err => {
            console.log('currentuser error', err)
            setUser("")
        });
    }, [user]) //run when component mounts
    
    return (
    <div>
        {user ? 
            navigate('/viewPets')
            // if user logged in, continue
        :
            <div>
                <div className="mx-auto bg-light p-3 m-4">
                    <p className="fs-4 mt-3 fst-italic">The place to organize all your pets records and create reminders for you!</p>
                </div> 
                <div className="row m-3 d-flex justify-center">
                <div className="p-3 bg-white col-8 m-3 rounded">
                    <div className="row">
                        <div className="col col-4 bg-light p-3 m-1 rounded">
                            <h3>Notes:</h3>
                            <ul className="bg-white rounded p-4 m-3">
                                <li>Vet said a cone is not needed unless Pugsley starts scratching his eyes</li>
                            </ul>
                        </div>
                        
                        <div className="col col-7 bg-light p-3 m-1 rounded">
                            <div className="row mb-2">
                                <h2 className="display-4 col offset-2">Puglsey</h2>
                                <button className="btn btn-secondary col-2 m-2">Add Reminder</button>
                            </div>
                            
                            <div className="bg-white rounded m-3 p-3 text-start">
                                <p>
                                    <span className="fw-bolder">Breed: </span>
                                    Pug
                                </p> 
                                <p>
                                    <span className="fw-bolder">Birthday: </span>
                                    March 3, 2021
                                </p>
                                <p>
                                    <span className="fw-bolder">Age: </span>
                                    2 years
                                </p>  
                                <p>
                                    <span className="fw-bolder">Weight: </span>
                                    14.6 lbs
                                </p> 

                                    <p className="fw-bolder">Allergies: </p>
                                    <ul>
                                        <li>n/a</li>

                                    </ul>
                                    <p className="fw-bolder">Illnesses: </p>
                                    <ul>
                                        <li>Eye Infection</li>
                                    </ul>


                                    <p className="fw-bolder">Medications: </p>
                                    <ul>
                                        <li>Neo Poly Bac Ophthalmic Ointment, 3.5 gm</li>
                                    </ul>


                                    <p className="fw-bolder">Vaccinations: </p>
                                    <ul>
                                        <li>Parvovirus (April 5, 2024)</li>
                                        <li>Distemper (April 5, 2024)</li>
                                    </ul>

                                    <p className="fw-bolder">Surgeries: </p>
                                    <ul>
                                        <li>Neutered</li>
                                    </ul>
                            </div>

                            <button className="btn btn-secondary m-2">Update Records</button>
                            <button className="btn btn-danger m-2">Delete</button>
                        </div>
                    </div>
                </div>

                <div className="col col-3 m-3 mx-auto">
                        <div className="row bg-light rounded p-3">
                            <h2>What we help you keep track of:</h2>
                            <ul>
                                <li>Pet Health History</li>
                                <li>Prior vaccination dates</li>
                                <li>Future vaccination reminders</li>
                                <li>Vet appointment reminders</li>
                                <li>Medication history</li>
                                <li>Daily medication reminders</li>
                                <li>Notes</li>
                            </ul>
                        </div>
                        <div className="row bg-light p-3 mt-3 rounded">
                            <h2>What our users say:</h2>
                            <p className="fst-italic">"I can finally not worry about remembering to schedule the next appointment!" - Jen, NC</p>
                            <p className="fst-italic">"I love that I don’t have to search through paper records anymore!" - Bob, OH</p>    
                            <p className="fst-italic">"My partner and I don’t have to remind each other to give our cat medication anymore!" - Sarah, CA</p>
                        </div>
                    </div>
                </div> 
            </div>
        };
    </div>
    )
}

export default Home