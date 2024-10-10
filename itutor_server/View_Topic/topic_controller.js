class TopicController {
    async getAllTopics() {
        try {
            // ดึงข้อมูลหัวข้อทั้งหมดจากฐานข้อมูล
            const topics = await this.topicRepository.findAll();
            return topics;
        } catch (error) {
            console.error('Error fetching topics:', error);
            throw error;
        }
    }
}