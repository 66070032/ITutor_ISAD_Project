const { ManageTopicPage } = require('./pages/ManageTopicPage');

// ตัวอย่างการใช้งาน
const page = new ManageTopicPage();

const topicData = {
    name: 'Topic 1',
    description: 'Description of Topic 1',
    meetingPlace: 'Room A',
    dateTime: '2024-11-22 10:00:00',
    maxParticipants: 30
};

page.createTopic(topicData);