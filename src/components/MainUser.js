import { useEffect, useState} from 'react';
import eventStorage from "./EventStorage";
import React from 'react';
import './MainUser.style.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function MainUser() {

  const [events, setEvents] = useState([]);
  // retrieve list
  useEffect( () => {
    const getData = () => {
      eventStorage.emitter.addListener('GET_EVENTS_SUCCESS', () => {
        setEvents(eventStorage.data);
    });
      eventStorage.getEvents();
    }
    getData();
  }, []);

  const columns = [
    {
      Header: "Event Name",
      accessor: "name",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Start hour",
      accessor: "startHour",
    },
    {
      Header: "Actions",
      accessor: "actions",
    }
  ];  

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEvent, setIdEvent] = useState('');

  const addEventForm = () => {
    setOpen(true);
  };

  const editEventForm = (e) => {
    setName(e.name);
    setLocation(e.location);
    setDate(e.date);
    setstartHour(e.startHour);
    setIdEvent(e.id);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [startHour, setstartHour] = useState('');

  const handleEventNameInput = (evt) => {
    evt.preventDefault();
    setName(evt.target.value);
};
  const handleLocationInput = (evt) => {
    evt.preventDefault();
    setLocation(evt.target.value);
  };
  const handleDateInput = (evt) => {
    evt.preventDefault();
    setDate(evt.target.value);
  };
  const handleStartHourInput = (evt) => {
    evt.preventDefault();
    setstartHour(evt.target.value);
  };

  async function addNewEvent() {
    const eventToAdd = {
      name: name,
      location: location,
      date: date,
      startHour: startHour
    };
    await eventStorage.addEvent(eventToAdd);
    if (eventStorage.generatedStatus == '201') {
      toast.success('The event was added succesfully!', {
        position: toast.POSITION.TOP_CENTER
      });
      handleClose();
      console.log("after toast");
    } else {
      toast.error('Something went wrong while trying to add the event!', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  async function editEvent(e) {
    const eventToEdit = {
      name: name,
      location: location,
      date: date,
      startHour: startHour
    };
    console.log("iddd::" + idEvent);
    await eventStorage.updateEvent(idEvent, eventToEdit);
    if (eventStorage.generatedStatus == '202') {
      toast.success('The event was edited succesfully!', {
        position: toast.POSITION.TOP_CENTER
      });
      handleCloseEdit();
    } else {
      toast.error('Something went wrong while trying to edit the event!', {
        position: toast.POSITION.TOP_CENTER
      });  
    }      
  }

    return(
      <div>
        <div>
          <button onClick={addEventForm}>Add new event</button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new event</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Complete the requested fields in order to add the desired event.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Event name"
                type="name"
                fullWidth
                variant="standard"
                onChange={(e) => handleEventNameInput(e)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="location"
                label="Location"
                type="location"
                fullWidth
                variant="standard"
                onChange={(e) => handleLocationInput(e)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="date"
                label="Date"
                type="date"
                fullWidth
                variant="standard"
                onChange={(e) => handleDateInput(e)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="startHour"
                label="Start hour"
                type="startHour"
                fullWidth
                variant="standard"
                onChange={(e) => handleStartHourInput(e)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={addNewEvent}>Save</Button>
            </DialogActions>
      </Dialog>
      <ToastContainer />
        </div>
        <div className="flex justify-center mt-8">
        {events.map((e)=>{
          console.log(e)
        })}
        <table>
          <thead>
          <tr>
            {columns.map((column) => {
                return (
                  <th>{column.Header}</th>
                )
            })}
          </tr>
          </thead>
          {events.map((e)=>{
            console.log(e);
            return (<tr>
              <td>{e.name}</td>
              <td>{e.location}</td>
              <td>{e.date}</td>
              <td>{e.startHour}</td>
              <td>                
                <Tooltip title="Delete">
                <IconButton onClick={() => {
                  eventStorage.deleteEvent(e.id)
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
                <button onClick={() => {
                  editEventForm(e)
                }}>Edit</button>
                <Dialog open={openEdit} {...console.log("openedit::"+openEdit)} onClose={handleCloseEdit}>
                  <DialogTitle>Edit event</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Complete the requested fields in order to edit the event.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Event name"
                      type="name"
                      fullWidth
                      variant="standard"
                      defaultValue={name}
                      onChange={(e) => handleEventNameInput(e)}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="location"
                      label="Location"
                      type="location"
                      fullWidth
                      variant="standard"
                      defaultValue={location}
                      onChange={(e) => handleLocationInput(e)}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="date"
                      label="Date"
                      type="date"
                      fullWidth
                      variant="standard"
                      defaultValue={date}
                      onChange={(e) => handleDateInput(e)}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="startHour"
                      label="Start hour"
                      type="startHour"
                      fullWidth
                      variant="standard"
                      defaultValue={startHour}
                      onChange={(e) => handleStartHourInput(e)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={(e) => editEvent(e)}>Save</Button>
                  </DialogActions>
                </Dialog>
                <ToastContainer />
              </td>
            </tr>)
        })}
        </table>
        </div>
      </div>
    );
  }

export default MainUser;