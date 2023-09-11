import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Contacts from './Pages/Contacts/Contacts';
import Profile from './Pages/Profile/Profile';
import AddContact from './Pages/AddContact/AddContact';

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/signin" element={<SignIn/>}></Route>
        <Route exact path="/signup" element={<SignUp/>}></Route>
        <Route exact path="/contacts" element={<Contacts/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route exact path="/addcontact" element={<AddContact/>}></Route>
      </Routes>
    </>
  )
}

export default App
