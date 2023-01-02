import {EventEmitter} from 'fbemitter';

const SERVER = 'http://localhost:8000';

class EventStorage {
    constructor() {
        this.data = [];
        this.emitter = new EventEmitter();
    }

    async getEvents() {
        try {
            const response = await fetch(`${SERVER}/users/:id/events`);
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

    async addEvent(event) {
        try {
            const response = await fetch(`${SERVER}/users/:id/events/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event);
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

    async updateEvent() {};

    async deleteEvent() {};
}