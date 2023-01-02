import { useState } from 'react';

function AddEventForm (props) {
    const { onAdd } = props;
    const [name, setName] = useState('');
    const [location, setLocation] = useState(''); 
    const [date, setDate] = useState('');
    const [startHour, setStartHour] = useState('');

    const add = (evt) => {
        onAdd({
            name,
            location,
            date,
            startHour
        })
    }

    return (
        <div>
            <h6>Add event</h6>
            <div>
                <input type='text' placeholder='name' onChange={(evt) => {setName(evt.target.value)} } />
            </div>
            <div>
                <input type='text' placeholder='location' onChange={(evt) => setLocation(evt.target.value)} />
            </div>
            <div>
                <input type='text' placeholder='date' onChange={(evt) => setDate(evt.target.value)} />
            </div>
            <div>
                <input type='text' placeholder='startHour' onChange={(evt) => setStartHour(evt.target.value)} />
            </div>
            <div>
                <input type='button' value='add event' onClick={add} />
            </div>
        </div>
    );
}

export default AddEventForm;