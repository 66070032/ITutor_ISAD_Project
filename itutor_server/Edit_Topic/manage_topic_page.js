class ManageTopicPage {
    async updateTopic(topicId, updatedData) {
        try {
            const controller = new EditTopicController();
            const updatedTopic = await controller.updateTopic(topicId, updatedData);

            // แสดงผลลัพธ์หรือดำเนินการอื่นๆ
            console.log('Topic updated:', updatedTopic);
        } catch (error) {
            console.error('Error updating topic:', error);
        }
    }
}