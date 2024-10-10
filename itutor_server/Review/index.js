const { ReviewPage } = require('./pages/ReviewPage');

// ตัวอย่างการใช้งาน
const reviewPage = new ReviewPage();

// Submit a new review
reviewPage.submitReview(1, 1, 5, 'Great topic!');

// Get an existing review
reviewPage.getReview(1, 1);