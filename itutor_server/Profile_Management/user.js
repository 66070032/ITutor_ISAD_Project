class User {
    // Private attributes
    #id;
    #username;
    #email;
    #profilePicture;

    constructor(id, username, email, profilePicture) {
        this.#id = id; //positive number
        this.#username = username; //string
        this.#email = email; //email format
        this.#profilePicture = profilePicture; //url
    }

    // Getter methods
    get id() {
        return this.#id;
    }

    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    get profilePicture() {
        return this.#profilePicture;
    }

    // Setter methods
    setId(newId) {
        if (typeof newId !== 'number' || newId <= 0) {
            throw new Error('id must be a positive number.');
        }
        this.#id = newId;
    }

    setUsername(newUsername) {
        if (typeof newUsername !== 'string' || newUsername.length < 3) {
            throw new Error('Username must be a string and at least 3 characters long.');
        }
        this.#username = newUsername;
    }

    setEmail(newEmail) {
        if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
            throw new Error('Invalid email format.');
        }
        this.#email = newEmail;
    }

    setProfilePicture(newProfilePicture) {
        if (!/^(http:\/\/|https:\/\/)/.test(newProfilePicture)) {
            throw new Error('Profile picture must be a URL.');
        }
        this.#profilePicture = newProfilePicture;
    }
}