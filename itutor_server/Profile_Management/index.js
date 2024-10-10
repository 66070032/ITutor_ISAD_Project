const { UserProfilePage } = require('./pages/UserProfilePage');

// ตัวอย่างการใช้งาน
const userProfilePage = new UserProfilePage();

// ดึงข้อมูล Profile
userProfilePage.getUserProfile(1); // สมมติว่า userId คือ 1

// อัปเดตข้อมูล Profile
const updatedData = {
    username: 'newUsername',
    email: 'newEmail@example.com'
};
userProfilePage.updateUserProfile(1, updatedData);