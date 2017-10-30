import Ember from 'ember';

export default Ember.Component.extend({
    isStudent: true,
    classNames: ['col s12 m5'],
    actions: {
        attemptQuiz(quizId) {
            Ember.$('.info-questions-card').each(function(o) {
                $(this).fadeOut(1000);
            });
            this.registerQuiz(quizId);
            this.set('dynamic-component', 'quiz-dailog');
        },

        hideQuiz() {
            this.$().fadeOut(1000);
        },

        checkAnswer(evaluation) {
            this.sendAction('checkAnswer', evaluation);
        },

        submitQuiz() {
            this.sendAction('submitQuiz');
        },

        registerQuiz(quizId) {
            this.registerQuiz(quizId);
        }
    }
});
