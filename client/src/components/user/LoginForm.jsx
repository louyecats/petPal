import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const LoginForm = ({user, setUser, setLogged}) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })
  const logChangeHandler = (e) => {
      setLoginInfo({
          ...loginInfo, 
          [e.target.id]: e.target.value
      })
  }


  const loginHandler = (e) => {
    e.preventDefault()
    //on submit, do an axios post request to the route, passing in the form data, now since we have cookies, we need to also pass {withcredentials: true}
    axios.post("http://localhost:8000/api/login", loginInfo, {withCredentials:true})
        .then (res => {
            console.log("logged in res.data._id", res.data._id);
            setUser(res.data.user._id)
            //console.log("res.data.user.email",res.data.user.email);
            setLogged(true)
            //put logged user in state
            navigate("/viewPets");
        })
        .catch(err => {
          console.log("Reg errors", err.response.data);
          const errorResponse = err.response.data.message;
          setErrors(errorResponse)
      });
  }

  return (
    <div className="col col-5 mt-3">
      <h2>Login:</h2>

      <div className="bg-light p-4 m-4 rounded">
        <form action="" className="col" onSubmit={loginHandler}>
        {errors && <p className="fst-italic text-danger">{errors}</p>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" className="form-control" name="email" id="email" onChange={logChangeHandler}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" name="password" id="password" onChange={logChangeHandler}></input>
          </div>
            <button className="btn btn-dark mt-3 col-3">login</button>
        </form>
      </div>
      <p className="fst-italic mt-2">Not sure yet? <a href="/">Back home</a></p>
    </div>
  )
}

export default LoginForm