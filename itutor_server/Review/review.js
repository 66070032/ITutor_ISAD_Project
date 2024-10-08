class Review {
    constructor(topicId, userId, rating, comment) {
        setTopicId(topicId); //positive number
        setUserId(userId); //positive number
        setRating(rating); //1-5
        setComment(comment); //1-255
    }

    // Getter methods
    get topicId() {
        return this.topicId;
    }

    get userId() {
        return this.userId;
    }

    get rating() {
        return this.rating;
    }

    get comment() {
        return this.comment;
    }

    // Setter methods
    setTopicId(newId) {
        if (typeof newId !== 'number' || newId <= 0) {
        throw new Error('Topic id must be a positive number.');
        }
        this.topicId = newId;
    }

    setUserId(newId) {
        if (typeof newId !== 'number' || newId <= 0) {
        throw new Error('User id must be a positive number.');
        }
        this.userId = newId;
    }

    setRating(newRating) {
        // ตรวจสอบค่า rating ให้อยู่ในช่วงที่กำหนด (เช่น 1-5)
        if (newRating < 1 || newRating > 5) {
            throw new Error('Rating must be between 1 and 5.');
        }
        this.rating = newRating;
    }

    setComment(newComment) {
        // ตรวจสอบความยาวของ comment (ถ้าจำเป็น)
        if (newComment.length > 255) {
            throw new Error('Comment is too long.');
        }
        this.comment = newComment;
    }
}