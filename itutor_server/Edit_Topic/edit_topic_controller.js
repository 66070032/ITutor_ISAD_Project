class EditTopicController {
    async updateTopic(topicId, updatedData) {
        try {
            // ค้นหา Topic โดยใช้ ID
            const topic = await this.topicRepository.findById(topicId);

            if (!topic) {
                throw new Error('Topic not found');
            }

            // อัปเดตข้อมูลของ Topic
            topic.name = updatedData.name || topic.name;
            topic.description = updatedData.description || topic.description;
            topic.meetingPlace = updatedData.meetingPlace || topic.meetingPlace;
            topic.dateTime = updatedData.dateTime || topic.dateTime;
            topic.maxParticipants = updatedData.maxParticipants || topic.maxParticipants;

            // บันทึกการเปลี่ยนแปลงลง Database
            await this.topicRepository.save(topic);

            return topic;
        } catch (error) {
            console.error('Error updating topic:', error);
            throw error;
        }
    }
}