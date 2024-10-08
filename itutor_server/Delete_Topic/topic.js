class Topic {
    constructor(name, description, meetingPlace, dateTime, maxParticipants) {
        setName(name);
        setDescription(description);
        setMeetingPlace(meetingPlace);
        setDateTime(dateTime);
        setMaxParticipants(maxParticipants);
    }

    // Getter methods (using arrow functions for conciseness)
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