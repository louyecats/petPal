import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginReg = ({user, setUser, setLogged}) => {

    return (
    <div className="row mx-auto">
    
        <div className="mx-auto bg-light p-3 m-4">
            <p className="fs-4 mt-3 fst-italic">The place to organize all your pets records and create reminders for you!</p>
        </div>
        
        <LoginForm user={user} setUser={setUser} setLogged={setLogged}/>
        <RegisterForm user={user} setUser={setUser}/>
    </div>

    )
}

export default LoginReg