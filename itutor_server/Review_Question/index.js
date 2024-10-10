const { ReviewQuestionPage } = require('./pages/ReviewQuestionPage');

// ตัวอย่างการใช้งาน
const reviewQuestionPage = new ReviewQuestionPage();

// สำหรับนักเรียน
reviewQuestionPage.getQuestions('student');

// สำหรับอาจารย์
reviewQuestionPage.getQuestions('tutor');