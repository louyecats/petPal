import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'


const AppointmentForm = ({ user, pet, pets, setPets}) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPetId, setSelectedPetId] = useState("");
  const [errors, setErrors] = useState([]);


  // useEffect to get all pets from currentUser to select which pet id on form
  useEffect(() => {
    axios.get('http://localhost:8000/api/pets', { withCredentials: true })
      //the response is an array of objects that we will set in state
      .then(res => {
        setPets(res.data.pets)
      })
      .catch(err => console.log(err))
  }, []);

  const [apptObj, setApptObj] = useState({
    apptDateTime: "",
    apptReason: "",
    apptOther: ""
  })

  const apptHandler = e => {
    setApptObj({
      ...apptObj,
      [e.target.id]: e.target.value
    })
  }

  const submitHandler = e => {
    e.preventDefault()
    if (!user) {
      navigate('/home')
      //if user logged in continue
    } else {
      console.log('logged in')
      console.log("pet.appointments", pet.appointments)
      axios.put(`http://localhost:8000/api/appt/${selectedPetId}`, apptObj, { withCredentials: true })
        // axios.patch(`http://localhost:8000/api/appt/${selectedPetId}`, {...pet, appointments: [...pet.appointments, apptObj]}, {withCredentials: true })
        .then(res => {
          console.log("made new appointment!")
          window.location.reload(); // Refresh the page
        })
        .catch(err => {
          console.log(err);
          const errorResponse = err.response.data;
          const errorArr = [];
          for (const key of Object.keys(errorResponse)){
              errorArr.push(errorResponse[key].message)
          }
          setErrors(errorArr);
        });
    }
  }

  return (

    <div className="bg-light rounded mx-auto col-4 mt-5 p-4">
      <h2>New Appointment:</h2>
      {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
      <div>
        <form>
          <label htmlFor="petSelect" className="mt-3 fw-bolder">Select Pet: </label>
          <select id="petSelect" value={selectedPetId} className="form-select form-select-md mt-3" onChange={(e) => setSelectedPetId(e.target.value)}>
            {/* CHATGPT Solution for commented out map error: The useEffect hook that fetches the pets data from the API and sets it in the state (setPets) is asynchronous, meaning it takes some time to complete. During the initial render, the pets array is still empty or undefined, causing the error when you try to map over it. To fix this issue, you can add a conditional check to ensure that the pets array is not undefined before mapping over it. By adding the pets && check before the map function, you ensure that the mapping is only performed if the pets array is truthy (not null or undefined). This will prevent the error from occurring during the initial render when pets is still undefined.*/}
            <option>--Select Pet --</option>
            {pets && pets.map(pet => (
              <option key={pet._id} value={pet._id}>{pet.name}</option>
            ))}
            {/* {pets.map(pet => (
            <option key={pet._id} value={pet._id}>{pet.name}</option>
          ))} */}
          </select>
        </form>
      </div>

      <form action="" onSubmit={submitHandler} className="row p-4">
        {/* {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)} */}
        <div className="form-group">
          <label htmlFor="apptDateTime" className="fw-bolder">Date and Time:</label>
          <input type="datetime-local" name="apptDateTime" id="apptDateTime" onChange={apptHandler} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="apptReason" className="fw-bolder" >Reason:</label>
          <textarea name="apptReason" id="apptReason" rows="8" className="form-control" onChange={apptHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="apptOther" className="fw-bolder">Other:</label>
          <input type="text" name="apptOther" id="apptOther" className="form-control" onChange={apptHandler} />
        </div>
        <button className="btn btn-secondary mt-4 col-3 mx-auto p-2">Submit</button>
      </form>
    </div>
  )
}

export default AppointmentForm