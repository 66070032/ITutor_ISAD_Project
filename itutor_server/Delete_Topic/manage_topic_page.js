class ManageTopicPage {
    async deleteTopic(topicId) {
        try {
            const controller = new DeleteTopicController();
            const isDeleted = await controller.deleteTopic(topicId);

            if (isDeleted) {
                console.log('Topic deleted successfully');
            } else {
                console.error('Error deleting topic');
            }
        } catch (error) {
            console.error('Error deleting topic:', error);
        }
    }
}