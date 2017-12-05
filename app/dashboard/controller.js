import Ember from 'ember';

export default Ember.Controller.extend({
    userInsession: null,
    isSIgnedIn: null,
    isStudent: true,
    totalQuizQuestions: null,
    actions: {
        goBackToHomePage() {
            this.transitionToRoute('application');
        },
        setResults(quizId) {
            this.get('store').findRecord('quiz', quizId).then((responseQuiz) => {
                this.set('totalQuizQuestions', responseQuiz.get('questions').length);
            });
        }
    }
});
