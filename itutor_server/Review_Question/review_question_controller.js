class ReviewQuestionController {
    async getQuestions(role) {
        try {
            // ตรวจสอบบทบาทของผู้ใช้
            if (role === 'student') {
                // ดึงคำถามทั้งหมด
                return await this.questionRepository.getAllQuestions();
            } else if (role === 'tutor') {
                // ดึงคำถามที่นักเรียนยังไม่ได้ทำ
                return await this.questionRepository.getQuestionsNotDoneByStudents();
            } else {
                throw new Error('Invalid role');
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
            throw error;
        }
    }
}