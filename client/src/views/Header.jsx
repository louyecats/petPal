import React, {useEffect} from 'react'
import pawicon from '../pawicon.png'
import axios from 'axios'


const Header = ({user, setUser, setLogged}) => {

  //get logged in user w/token credentials
  useEffect(() => {
    axios.get("http://localhost:8000/api/currentuser", {withCredentials: true})
      .then(res => {
        //print logged in user
        console.log("logged user" + JSON.stringify(res.data))
        //set logged in user in  state
        setUser(res.data._id);
      })
      .catch(err => {
        console.log('currentuser error', err)
        setUser("")
      });
  }, [user]) //run when component mounts

  //logout button
  const logoutHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/logout", {}, {withCredentials: true})
      .then(res => {
        setUser(null);
        setLogged(null);
        console.log("logged out", res.data.firstName);
        window.location.href = '/home'; //when user logs out route home
      })
      .catch(err => console.log('logoutHandler error', err));
  };

  return (
    <div className="mt-5 p-3 row">
        {/* check if user in state w/ value present, if not make value null */}
        {/* {(user)} */}
        <h1 className="col offset-1 display-2">Pet Pal <img src={pawicon} className="App-logo" alt="icon"/></h1>
        {/* if logged in user in state, show logout */}
        {(user) ?
          <button className="btn btn-danger m-4 col-1" onClick={logoutHandler}>Logout</button>
          :
          <a href="/loginreg" className="btn btn-info m-4 col-1" role="button">login / register</a>
        }

    </div>
  )
}
export default Header
