class TopicPage {
    async getTopics() {
        try {
            const controller = new TopicController();
            const topics = await controller.getAllTopics();
            console.log('Topics:', topics);
            // แสดงข้อมูล topics ให้ผู้ใช้เห็น (เช่น ผ่าน HTML)
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    }
}