import Ember from 'ember';

export default Ember.Component.extend({
    isStudent: true,
    classNames: ['col s12 m5'],
    actions: {
        attemptQuiz() {
            Ember.$('.info-questions-card').each(function(o) {
                $(this).fadeOut(1000);
            });
            this.set('dynamic-component', 'quiz-dailog');
        },

        hideQuiz() {
            this.$().fadeOut(1000);
        },

        checkAnswer(answerGiven) {
            this.sendAction('checkAnswer', answerGiven);
        }
    }
});
