class ReviewController {
    async createReview(topicId, userId, rating, comment) {
        // ตรวจสอบว่าผู้ใช้เคยรีวิวหัวข้อนี้ไปแล้วหรือยัง
        const existingReview = await this.reviewRepository.findByTopicIdAndUserId(topicId, userId);

        if (existingReview) {
            throw new Error('You have already reviewed this topic');
        }

        // สร้าง Review ใหม่และบันทึกลงฐานข้อมูล
        const newReview = new Review(topicId, userId, rating, comment);
        await this.reviewRepository.create(newReview);

        return newReview;
    }

    async getReviewByTopicIdAndUserId(topicId, userId) {
        return await this.reviewRepository.findByTopicIdAndUserId(topicId, userId);
    }
}