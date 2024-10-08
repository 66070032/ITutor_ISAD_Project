class Tutor {
    constructor(id, name, subject, experience) {
        this.id = id; //number
        this.name = name; //string
        this.subject = subject; //string
        this.experience = experience; //number
    }

        // Getter methods
    get id() {
        return this.id;
    }

    get name() {
        return this.name;
    }

    get subject() {
        return this.subject;
    }

    get experience() {
        return this.experience;
    }

    // Setter methods
    setId(newId) {
        if (typeof newId !== 'number' || newId <= 0) {
            throw new Error('id must be a positive number.');
        }
        this.id = newId;
    }

    setName(newName) {
        // ตรวจสอบค่า เช่น ตรวจสอบว่าเป็น string หรือไม่
        if (typeof newName !== 'string') {
            throw new Error('Name must be a string.');
        }
        this.name = newName;
    }

    setSubject(newSubject) {
        // ตรวจสอบค่า เช่น ตรวจสอบว่าเป็น string หรือไม่
        if (typeof newSubject !== 'string') {
            throw new Error('Subject must be a string.');
        }
        this.subject = newSubject;
    }

    setExperience(newExperience) {
        // ตรวจสอบค่า เช่น ตรวจสอบว่าเป็น number หรือไม่
        if (typeof newExperience !== 'number') {
            throw new Error('Experience must be a number.');
        }
        this.experience = newExperience;
    }
}