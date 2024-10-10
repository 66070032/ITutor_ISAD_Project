class UserProfilePage {
    async getUserProfile(userId) {
        try {
            const controller = new UserProfileController();
            const user = await controller.getUserProfile(userId);
            console.log('User profile:', user);
            // แสดงข้อมูล user ให้ผู้ใช้เห็น (เช่น ผ่าน HTML)
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }

    async updateUserProfile(userId, updatedData) {
        try {
            const controller = new UserProfileController();
            const updatedUser = await controller.updateUserProfile(userId, updatedData);
            console.log('User profile updated:', updatedUser);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    }
}