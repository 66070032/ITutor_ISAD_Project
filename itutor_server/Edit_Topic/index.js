const { ManageTopicPage } = require('./pages/ManageTopicPage');

// ตัวอย่างการใช้งาน
const page = new ManageTopicPage();

const topicId = 1; // สมมติว่ามี Topic ID เป็น 1
const updatedData = {
    name: 'Topic 1 (Updated)',
    description: 'Updated description',
};

page.updateTopic(topicId, updatedData);