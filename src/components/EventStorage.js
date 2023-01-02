import {EventEmitter} from 'fbemitter';

const SERVER = 'http://localhost:8000';

class EventStorage {
  constructor() {
    this.data = [];
    this.emitter = new EventEmitter();
  }

  async getEvents() {
    try {
      // const response = await fetch(`${SERVER}/users/${id}/events`); 
      const response = await fetch(`${SERVER}/users/events/all`);  
      if (!response.ok) {
          throw response;
      }
      this.data = await response.json();
      this.emitter.emit('GET_EVENTS_SUCCESS');
    } catch(err) {
      console.warn(err);
      this.emitter.emit('GET_EVENTS_ERROR');
    }
  };

  async addEvent(id, event) {
    try {
    console.log(event.name);

      // const response = await fetch(`${SERVER}/users/${id}/events/add`
      // test only
      const response = await fetch(`${SERVER}/users/2/events/add`
      , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      if (!response.ok) {
        throw response;
      }
      this.getEvents();
    } catch(err) {
      console.warn(err);
      this.emitter.emit('ADD_EVENT_ERROR');
    }
  };

  async updateEvent(id, idEvent, event) {
    try {
      const response = await fetch(`${SERVER}/users/${id}/events/edit/${idEvent}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      if (!response.ok) {
          throw response;
      }
      this.getEvents();
    } catch(err) {
      console.warn(err);
      this.emitter.emit('EDIT_EVENT_ERROR');
    }
  };

  async deleteEvent(id, idEvent) {
    try {
      const response = await fetch(`${SERVER}/users/${id}/events/delete/${idEvent}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw response;
      }
      this.getEvents();
    } catch(err) {
      console.warn(err);
      this.emitter.emit('DELETE_EVENT_ERROR');
    }
  };
}

const eventStorage = new EventStorage();

export default eventStorage;