class TutorRegisterController {
    async registerTutor(tutorData) {
        try {
            // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
            if (!tutorData.name || !tutorData.subject || !tutorData.experience) {
                throw new Error('Please fill in all required fields.');
            }

            // สร้าง Object Tutor
            const newTutor = new Tutor(null, tutorData.name, tutorData.subject, tutorData.experience);

            // บันทึกข้อมูลลงฐานข้อมูล
            await this.tutorRepository.create(newTutor);

            return newTutor;
        } catch (error) {
            console.error('Error registering tutor:', error);
            throw error;
        }
    }
}