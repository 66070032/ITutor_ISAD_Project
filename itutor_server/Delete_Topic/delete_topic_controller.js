class DeleteTopicController {
    async deleteTopic(topicId) {
        try {
            // ค้นหา Topic โดยใช้ ID
            const topic = await this.topicRepository.findById(topicId);

            if (!topic) {
                throw new Error('Topic not found');
            }

            // แสดง Confirmation Dialog (ในโค้ดนี้จะสมมติว่า User ยืนยันการลบ)
            // ในระบบจริง ควรมีการใช้งาน Library สำหรับสร้าง Dialog

            // ลบ Topic ออกจาก Database
            await this.topicRepository.delete(topic);

            return true;
        } catch (error) {
            console.error('Error deleting topic:', error);
            throw error;
        }
    }
}