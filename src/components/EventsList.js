import { useEffect, useState} from 'react';
import eventStorage from "./EventStorage";
import AddEventForm from './AddEventForm';

function EventsList() {
  const [events, setEvents] = useState([]);
  // retrieve list
  useEffect(() => {
    eventStorage.emitter.addListener('GET_EVENTS_SUCCESS', () => {
        setEvents(eventStorage.data);
    });
    eventStorage.getEvents();

  }, []);
  
  const addEvent = (event) => {
    eventStorage.addEvent(0, event);

  };

  return (
    <div>
      <h4>Events list</h4>
      {
        events.map(e => <div >{e.name}</div>)
      }
      <AddEventForm onAdd={addEvent} />
    </div>
  )
}

export default EventsList;