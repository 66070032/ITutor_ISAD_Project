class Review {
    // Private attributes
    #topicId;
    #userId;
    #rating;
    #comment;

    constructor(topicId, userId, rating, comment) {
        this.#topicId = topicId; // positive number
        this.#userId = userId; // positive number
        this.#rating  = rating; // 1-5
        this.#comment = comment; // 1-255
    }

    // Getter methods
    get topicId() {
        return this.#topicId;
    }

    get userId() {
        return this.#userId;
    }

    get rating() {
        return this.#rating;
    }

    get comment() {
        return this.#comment;
    }

    // Setter methods
    setTopicId(newId) {
        if (typeof newId !== 'number' || newId <= 0) {
            throw new Error('Topic id must be a positive number.');
        }
        this.#topicId = newId;
    }

    setUserId(newId) {
        if (typeof newId !== 'number' || newId <= 0) {
            throw new Error('User id must be a positive number.');
        }
        this.#userId = newId;
    }

    setRating(newRating) {
        if (newRating < 1 || newRating > 5) {
            throw new Error('Rating must be between 1 and 5.');
        }
        this.#rating = newRating;
    }

    setComment(newComment) {
        if (newComment.length > 255) {
            throw new Error('Comment is too long.');
        }
        this.#comment = newComment;
    }
}
