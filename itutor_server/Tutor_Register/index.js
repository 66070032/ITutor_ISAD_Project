const { TutorRegisterPage } = require('./pages/TutorRegisterPage');

// ตัวอย่างการใช้งาน
const tutorRegisterPage = new TutorRegisterPage();

const tutorData = {
    name: 'John Doe',
    subject: 'Mathematics',
    experience: '5 years'
};

tutorRegisterPage.submitRegistration(tutorData);