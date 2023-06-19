
import './App.css';
import React, {useState} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import PetForm from './components/pets/PetForm';
import ViewAllPets from './components/pets/ViewAllPets';
import ViewOnePet from './components/pets/ViewOnePet';
import UpdatePet from './components/pets/UpdatePet';
import Home from './views/Home';
import Header from '../src/views/Header';
import AppointmentsMain from '../src/views/AppointmentsMain'
import RemindersMain from '../src/views/RemindersMain'
import LoginReg from './components/user/LoginReg';

function App() {

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
    notes: "",
    reminders: [],
    appointments: [],
    creator: "" 
  })
  const [pets, setPets] = useState([]) 
  //need array to iterate w/map()
  const [user, setUser] = useState("")
  const [logged, setLogged] = useState(false)

  return (
    <div className="App">
      {/* pass user in state to Header for login/logout  */}
      <Header user={user} setUser={setUser} logged={logged} setLogged={setLogged}/>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to= "/home"/>}/>
            <Route path="/home" element={<Home user={user} setUser={setUser}/>} default />
            <Route path="/loginreg" element={<LoginReg user={user}setUser={setUser} setLogged={setLogged}/>}/>
            <Route path="/createPet" element={<PetForm pet={pet} setPet={setPet} user={user}/>} />
            <Route path="/viewPets" element={<ViewAllPets pets={pets} setPets={setPets} user={user}/>} />
            <Route path="/viewPet/:id" element={<ViewOnePet pet={pet} setPet={setPet} user={user} setUser={setUser}/>}/>
            <Route path="/editPet/:id" element={<UpdatePet pet={pet} setPet={setPet} user={user}/>}/>
            <Route path="/appointments" element={<AppointmentsMain pet={pet} setPet={setPet} pets={pets} setPets={setPets} user={user}/>}/>
            <Route path="/reminders" element={<RemindersMain pet={pet} setPet={setPet} pets={pets} setPets={setPets} user={user} setUser={setUser}/>}/>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
