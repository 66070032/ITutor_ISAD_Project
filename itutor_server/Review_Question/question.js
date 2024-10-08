class Question {
    // Private attributes
    #id;
    #questionText;
    #options;

    constructor(id, questionText, options) {
        this.#id = id; // positive number
        this.#questionText = questionText; // 1-255
        this.#options = options; // array
    }

    // Getter methods
    get id() {
        return this.#id;
    }

    get questionText() {
        return this.#questionText;
    }

    get options() {
        return this.#options;
    }

    // Setter methods
    setId(newId) {
        if (typeof newId !== 'number' || newId <= 0) {
            throw new Error('id must be a positive number.');
        }
        this.#id = newId;
    }

    setQuestionText(newQuestionText) {
        if (newQuestionText.length > 255) {
            throw new Error('Question text is too long.');
        }
        this.#questionText = newQuestionText;
    }

    setOptions(newOptions) {
        if (!Array.isArray(newOptions)) {
            throw new Error('Options must be an array.');
        }
        this.#options = newOptions;
    }
}