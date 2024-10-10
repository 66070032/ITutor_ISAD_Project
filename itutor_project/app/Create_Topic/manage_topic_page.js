class ManageTopicPage {
    async createTopic(topicData) {
        try {
            const controller = new CreateTopicController();
            const newTopic = await controller.createTopic(topicData);

            // แสดงผลลัพธ์หรือดำเนินการอื่นๆ
            console.log('Topic created:', newTopic);
        } catch (error) {
            console.error('Error creating topic:', error);
        }
    }
}