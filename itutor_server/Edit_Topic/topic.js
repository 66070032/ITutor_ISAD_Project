class Topic {
    constructor(id, name, description, meetingPlace, dateTime, maxParticipants) {
        setId(id); //positive number
        setName(name); //string
        setDescription(description); //string
        setMeetingPlace(meetingPlace); //string
        setDateTime(dateTime); //date
        setMaxParticipants(maxParticipants); //positive number
    }

    // Getter methods (using arrow functions for conciseness)
    get id() {
        return this.id;
    }

    get name() {
        return this.name;
    }

    get description() {
        return this.description;
    }

    get meetingPlace() {
        return this.meetingPlace;
    }

    get dateTime() {
        return this.dateTime;
    }

    get maxParticipants() {
        return this.maxParticipants;
    }

    // Setter methods (using traditional functions for clarity)
    setId(newId) {
        if (typeof newId !== 'number' || newId <= 0) {
        throw new Error('id must be a positive number.');
        }
        this.id = newId;
    }

    setName(newName) {
        if (typeof newName !== 'string') {
        throw new TypeError('Topic name must be a string.');
        }
        this.name = newName;
    }

    setDescription(newDescription) {
        if (typeof newDescription !== 'string') {
        throw new TypeError('Topic description must be a string.');
        }
        this.description = newDescription;
    }

    setMeetingPlace(newMeetingPlace) {
        if (typeof newMeetingPlace !== 'string') {  // Ensure meetingPlace is a string
        throw new TypeError('Topic meeting place must be a string.');
        }
        this.meetingPlace = newMeetingPlace;
    }

    setDateTime(newDateTime) {
        if (!(newDateTime instanceof Date)) {
        throw new TypeError('Topic dateTime must be a Date object.');
        }
        this.dateTime = newDateTime;
    }

    setMaxParticipants(newMaxParticipants) {
        if (typeof newMaxParticipants !== 'number' || newMaxParticipants <= 0) {
        throw new TypeError('Topic maxParticipants must be a positive number.');
        }
        this.maxParticipants = newMaxParticipants;
    }
}