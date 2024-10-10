class UserProfileController {
    async getUserProfile(userId) {
        try {
            // ดึงข้อมูลผู้ใช้จากฐานข้อมูลตาม userId
            const user = await this.userRepository.findById(userId);
            return user;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    }

    async updateUserProfile(userId, updatedData) {
        try {
            // ค้นหาผู้ใช้ตาม userId
            const user = await this.userRepository.findById(userId);

            // อัปเดตข้อมูลผู้ใช้
            user.username = updatedData.username || user.username;
            user.email = updatedData.email || user.email;
            user.profilePicture = updatedData.profilePicture || user.profilePicture;

            // บันทึกการเปลี่ยนแปลงลงฐานข้อมูล
            await this.userRepository.save(user);

            return user;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }
}