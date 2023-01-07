import { useState } from 'react';
import {TextField} from '@mui/material';
import {Button, ButtonGroup} from '@mui/material';
function Login() {
    const SERVER = 'http://localhost:8000';

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');

    const handleUserNameInput = (evt) => {
        evt.preventDefault();
        setUserName(evt.target.value);
        console.log(userName);
    };

    const handlePasswordInput = (evt) => {
        evt.preventDefault();
        setPassword(evt.target.value);
        console.log(password);
    };

    async function  doLogin(e) {
        e.preventDefault();
        try {
            // const response = await fetch(`${SERVER}/users/${id}/events`); 
            console.log(userName+password);
            const response = await fetch(`${SERVER}/login`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({userName: userName, password: password})
            });  
            const user = await response.json();
            setUserId(user.id.toString());
            console.log(userId);
            window.location.href = `/user/${user.id}`;
            if (!response.ok) {
                throw response;
            }
            
          } catch(err) {
            console.warn(err);
          
          }
    }
    return (
        <div>
            <h1>Componenta login</h1>
            <TextField id="outlined-basic" label="user name" variant="outlined" onChange={(e) => handleUserNameInput(e)} />
            <TextField id="outlined-basic" label="password" variant="outlined" onChange={ (e) => handlePasswordInput(e)}/>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={doLogin}>Login</Button>
                <Button>Create Account</Button>
            
            </ButtonGroup>
        </div>
    )
}

export default Login;