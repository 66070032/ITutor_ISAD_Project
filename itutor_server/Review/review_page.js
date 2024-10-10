class ReviewPage {
    async submitReview(topicId, userId, rating, comment) {
        try {
            const controller = new ReviewController();
            const newReview = await controller.createReview(topicId, userId, rating, comment);
            console.log('Review submitted:', newReview);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    }

    async getReview(topicId, userId) {
        try {
            const controller = new ReviewController();
            const existingReview = await controller.getReviewByTopicIdAndUserId(topicId, userId);
            if (existingReview) {
                console.log('Existing review:', existingReview);
            } else {
                console.log('No review found');
            }
        } catch (error) {
            console.error('Error fetching review:', error);
        }
    }
}