import Ember from 'ember';
import Utils from '../../helpers/utils';

export default Ember.Component.extend({
    isStudent: true,
    classNames: ['col s12 m5'],
    questionNumber: 1,
    didInsertElement() {
        this.$().ready(function() {
            $('.collapsible').collapsible();
        });
        this.set('randomizedQuizQuestions', this.randomQuestions(this.get('model.questions')));
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
    },

    randomQuestions(questionsArray) {
      return Utils.jumbleArray(questionsArray);
    }
});
