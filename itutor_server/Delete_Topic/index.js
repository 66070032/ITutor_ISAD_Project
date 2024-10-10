const { ManageTopicPage } = require('./pages/ManageTopicPage');

// ตัวอย่างการใช้งาน
const page = new ManageTopicPage();

const topicId = 1; // สมมติว่ามี Topic ID เป็น 1

page.deleteTopic(topicId);