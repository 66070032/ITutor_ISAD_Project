class CreateTopicController {
    async createTopic(topicData) {
        try {
            const newTopic = new Topic(
                topicData.name,
                topicData.description,
                topicData.meetingPlace,
                topicData.dateTime,
                topicData.maxParticipants
            );

            // บันทึกข้อมูลลง Database
            await this.topicRepository.save(newTopic);

            return newTopic;
        } catch (error) {
            console.error('Error creating topic:', error);
            throw error;
        }
    }
}