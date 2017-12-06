import Ember from 'ember';

export default Ember.Component.extend({
    isStudent: true,
    classNames: ['col s12 m5'],
    questionNumber: 1,
    didInsertElement() {
        this.$().ready(function() {
            $('.collapsible').collapsible();
        });
        const quiz = this.get('model');
        const questions = quiz.questions;
        this.set('questions', questions);
    },
    actions: {
        submitQuiz() {
            this.sendAction('submitQuiz');
            //console.log(this.get('quizController.quizAnswers'));
        },

        checkAnswer(evaluation) {
            this.sendAction('checkAnswer', evaluation);
        },

        addReports(type, questionId) {
            this.sendAction('addReports', type, questionId);
        }
    }
});
