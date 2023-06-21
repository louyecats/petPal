import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RemindersForm = ({user, pets, setPets}) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPetId, setSelectedPetId] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/appts', { withCredentials: true })
      //the response is an array of objects that we will set in state
      .then(res => {
        setPets(res.data)
      })
      .catch(err => console.log(err))
  }, []);

  const [reminderObj, setReminderObj] = useState({
    reminderDate: "",
    description: ""
  })

  const changeHandler = e => {
    setReminderObj({
      ...reminderObj,
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
      axios.post("http://localhost:8000/api/reminders")
        .then(res => {
          console.log("made new reminder!")
          //window.location.reload(); // Refresh the page
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
      <h2>New Reminder:</h2>
      <form action="" onSubmit={submitHandler} className="row p-4">
        {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
        <label htmlFor="selectedPet" className="mt-3 fw-bolder">Select Pet: </label>
          <select id="selectedPet" value={selectedPetId}className="form-select form-select-md mt-3" onChange={(e) => setSelectedPetId(e.target.value)}>
            <option>--Select Pet --</option>
            {pets && pets.map(pet => (
              <option key={pet._id} value={pet._id}>{pet.name}</option>
            ))}
          </select>
        <div className="form-group">
          <label htmlFor="reminderDate" className="fw-bolder">Remind me on:</label>
          <input type="date" name="reminderDate" id="appreminderDatetDateTime" onChange={changeHandler} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="fw-bolder" >Description:</label>
          <textarea name="description" id="description" rows="8" className="form-control" onChange={changeHandler} />
        </div>
        <button className="btn btn-secondary mt-4 col-3 mx-auto p-2">Submit</button>
      </form>
    </div>
  )
}

export default RemindersForm