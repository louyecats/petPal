import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

const UpdatePet = ({user, setUSer}) => {
    const {id} = useParams();
    const navigate = useNavigate(); 
    const [errors, setErrors] = useState([]);
    const [pet, setPet] = useState({
        name: "",
        birthday: "",
        breed: "",
        weight: "",
        allergies: "",
        illnesses: "",
        medications: "",
        vaccinations: "",
        surgeries: "",
        other: ""
    });

    //get current values to use as input placeholder
    useEffect(() => {
        if (!user) {
            navigate('/home')
        // if user logged in, continue
        } else {
            console.log('logged in')
        axios.get(`http://localhost:8000/api/pet/${id}`, {withCredentials:true})
            .then(res => {
                console.log(res)
                setPet(res.data.pet)
            })
            .catch(err => console.log(err))
        }
    }, []);

    //put new form data in state
    const changeHandler = (e) => {
        setPet({
            ...pet,
            [e.target.id]: e.target.value
        })
    }

    //send updated data to DB
    const submitHandler = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/pet/${id}`, {...pet, age:Math.abs(new Date (Date.now() - new Date(pet.birthday)).getUTCFullYear() - 1970)}, { withCredentials: true })
        // axios.patch(`http://localhost:8000/api/pet/${id}`, pet)
            .then(res => navigate (`/viewPet/${id}`))
            .catch(err => {
                console.log(err.response.data);
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            });
    };

    const createButton = (e) => {navigate("/createPet")}
    const viewAllButton = (e) => {navigate("/viewPets")}
    const remindersButton = (e) => {navigate("/reminders")}
    const appointmentsButton = (e) => {navigate("/appointments")}

    return (

    <div className="mx-auto">
        <div className="row">
            <div className="mx-auto bg-light p-3">
            <button className="btn btn-secondary m-2"  onClick={createButton}>Add a Pet</button>
            <button className="btn btn-secondary m-2"  onClick={viewAllButton}>Pet Dashboard</button>
            <button className="btn btn-secondary m-2" onClick={remindersButton}>Reminders</button>
            <button className="btn btn-secondary m-2" onClick={appointmentsButton}>Appointments</button>
        </div>

        <h2 className="mt-5 d-flex align-start offset-2">Edit Records:</h2>
        <div className="col col-8 bg-white m-1 rounded mx-auto">
            <form action="" className="row p-4 border" onSubmit={submitHandler}>
            {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
            <div className="row">
                <div className="col">
                <label htmlFor="name" className="d-flex justify-content-start fw-bold">Name:</label>
				<input type="text" name="name" id="name" value={pet.name} className="form-control" onChange={changeHandler}/>
                </div>

                <div className="col">
                <label htmlFor="illnesses" className="d-flex justify-content-start fw-bold">Illnesses:</label>
				<input type="string" name="illnesses" id="illnesses" value={pet.illnesses}className="form-control" onChange={changeHandler}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                <label htmlFor="breed" className="d-flex justify-content-start fw-bold">Breed:</label>
				<input type="string" name="breed" id="breed" value={pet.breed} className="form-control" onChange={changeHandler}/>
                </div>

                <div className="col">
                <label htmlFor="medications" className="d-flex justify-content-start fw-bold">Medications:</label>
				<input type="string" name="medications" id="medications" value={pet.medications}className="form-control" onChange={changeHandler}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="birthday" className="d-flex justify-content-start fw-bold">Birthday:</label>
                    <input type="date" name="birthday" id="birthday" value={pet.birthday.slice(0,10)}
                    className="form-control" onChange={changeHandler}/>
                </div>

                {pet.birthday && pet.birthday.length===10 && <p>* Age: {Math.abs(new Date (Date.now() - new Date(pet.birthday)).getUTCFullYear() - 1970)}</p>}

                <div className="col">
                    <label htmlFor="vaccinations" className="d-flex justify-content-start fw-bold">Vaccinations:</label>
                    <input type="string" name="vaccinations" id="vaccinations" value={pet.vaccinations}className="form-control" onChange={changeHandler}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="weight" className="d-flex justify-content-start fw-bold">Weight:</label>
                    <input type="number" step="0.1" name="weight" id="weight" value={pet.weight}className="form-control" onChange={changeHandler}/>
                </div>
                <div className="col">
                    <label htmlFor="surgeries" className="d-flex justify-content-start fw-bold">Surgeries:</label>
                    <input type="string" name="surgeries" id="surgeries" value={pet.surgeries}className="form-control" onChange={changeHandler}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="allergies" className="d-flex justify-content-start fw-bold">Allergies:</label>
                    <input type="string" name="allergies" id="allergies" value={pet.allergies}className="form-control" onChange={changeHandler}/>
                </div>
                <div className="col">
                    <label htmlFor="notes" className="d-flex justify-content-start fw-bold">Notes:</label>
                    <input type="string" name="notes" id="notes" value={pet.notes}className="form-control" onChange={changeHandler}/>
                </div>
            </div>
                <button className="btn btn-secondary mt-3 col-2 offset-8">Submit</button>
            </form>
            </div>
        </div>
        <button className="btn btn-danger d-flex align-start offset-2 mt-3">delete pet</button>
    </div>
    )
}

export default UpdatePet