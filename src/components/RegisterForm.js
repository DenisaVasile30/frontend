import { useState, React } from 'react';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
  const SERVER = 'http://localhost:8000';

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  const [open, setOpen] = useState(true);  
  const handleClickOpen = () => {
      setOpen(true);
  };    
  const handleClose = () => {
      setOpen(false); 
      window.location.href = './';
  }      
      
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

  async function  createAccount(e) {
      e.preventDefault();
      try {
          // const response = await fetch(`${SERVER}/users/${id}/events`); 
          console.log(userName+password);
          const response = await fetch(`${SERVER}/create-account`, { 
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify({userName: userName, password: password})
          });  
          if (response.status == '401') {
            console.log('not okkkkkkkkkkkk');
            toast.error('This user already exists!', {
              position: toast.POSITION.TOP_CENTER
          });
          } else if (response.status == '201') {
            toast.success('The account was created successfully!', {
              position: toast.POSITION.TOP_CENTER
            });
          }  
          // window.location.href = `/user/${user.id}`;
          if (!response.ok) {
              throw response;
          }          
        } catch(err) {
          console.warn(err);
        
        }
  }; 
      
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Sign up</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Please fill the requested fields in order to create a new account.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="userName"
                label="UserName"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleUserNameInput(e)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="text"
                fullWidth
                variant="standard"
                onChange={ (e) => handlePasswordInput(e)}
            />
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createAccount}>Create account</Button>
          </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default RegisterForm;