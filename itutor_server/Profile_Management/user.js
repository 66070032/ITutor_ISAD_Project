class User {
    constructor(id, username, email, profilePicture) {
        setid(id);
        setusername(username);
        setemail(email);
        setprofilePicture(profilePicture);
    }

    // Getter methods
    get id() {
        return this.id;
    }

    get username() {
        return this.username;
    }

    get email() {
        return this.email;
    }

    get profilePicture() {
        return this.profilePicture;
    }

    // Setter methods
    setid(newId) {
        // เพิ่มการตรวจสอบค่า เช่น ตรวจสอบความยาวของ username
        if (typeof newId !== 'number' || newId <= 0) {
        throw new Error('id must be a positive number.');
        }
        this.id = newId;
    }

    setusername(newUsername) {
        // เพิ่มการตรวจสอบค่า เช่น ตรวจสอบความยาวของ username
        if (typeof newUsername !== 'string' || newUsername.length < 3) {
        throw new Error('Username must be a string and at least 3 characters long.');
        }
        this.username = newUsername;
    }

    setemail(newEmail) {
        // ตรวจสอบรูปแบบของ email
        if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
          throw new Error('Invalid email format.');
        }
        this.email = newEmail;
    }

    setprofilePicture(newProfilePicture) {
        // ตรวจสอบว่าเป็น URL หรือไม่
        if (!/^(http:\/\/|https:\/\/)/.test(newProfilePicture)) {
          throw new Error('Profile picture must be a URL.');
        }
        this.profilePicture = newProfilePicture;
    }
}