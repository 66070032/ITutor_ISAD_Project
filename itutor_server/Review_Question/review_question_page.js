class ReviewQuestionPage {
    async getQuestions(role) {
        try {
            const controller = new ReviewQuestionController();
            const questions = await controller.getQuestions(role);
            console.log('Questions:', questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }
}