import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const RegisterForm = ({setUser}) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo, 
            [e.target.id]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        //on submit, do an axios post request to the route, passing in the form data, now since we have cookies, we need to also pass {withcredentials: true}
        axios.post("http://localhost:8000/api/register", userInfo, {withCredentials:true})
            .then (res => {
                console.log("new registered user", res.data)
                setUser(res.data.email) //put loggedUser in state
                navigate("/createPet") //navigate to pet dashboard
            })
            .catch(err => {
                console.log("Reg errors", err.response.data.errors);
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                console.log("Something went wrong submitHandler")
                setErrors(errorArr);
            });
    }

    return (
        <div className="col col-md mt-3">
            <h2>Ready to Join? Register here!</h2>
            
            <div className="bg-light p-4 m-4 rounded">
                <form action="" className="col" onSubmit={submitHandler}>
                {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" className="form-control" name="firstName" id="firstName" onChange={changeHandler}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" className="form-control" name="lastName" id="lastName" onChange={changeHandler}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" className="form-control" name="email" id="email" onChange={changeHandler}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" name="password" id="password" onChange={changeHandler}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" onChange={changeHandler}></input>
                    </div>
                    <button className="btn btn-dark mt-3">Register</button>
                </form>
            </div>
            {/* <p className="fst-italic">Looking to log in? <a href="/">Click here!</a></p> */}
        </div>
    )
}

export default RegisterForm