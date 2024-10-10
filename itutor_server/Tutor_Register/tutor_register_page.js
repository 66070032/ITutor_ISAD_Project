class TutorRegisterPage {
    async submitRegistration(tutorData) {
        try {
            const controller = new TutorRegisterController();
            const newTutor = await controller.registerTutor(tutorData);
            console.log('Tutor registered successfully:', newTutor);
        } catch (error) {
            console.error('Error registering tutor:', error);
        }
    }
}