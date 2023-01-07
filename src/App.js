
import Main from './components/Main'
import Login from './components/Login'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import MainUser from './components/MainUser'
import TopBar from './components/TopBar'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  
  
  return (
    <>
    <TopBar />
    <BrowserRouter>
    <Routes>
      {/* <Route exact path="/login" element= {<Login />} /> */}
      <Route exact path="/login" element= {<LoginForm />} />
      <Route exact path="/register" element= {<RegisterForm />} />
      {/* <Route exact path="/user/:id" element= {<Main />} /> */}
      <Route exact path="/users/:id" element= {<MainUser />} />
    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App
