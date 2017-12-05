import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['width-120'],
    userText: Ember.computed('isStudent','result', function() {
      if (this.get('isStudent')) {
        return 'You';
      } else {
        return this.get('result.attempedBy')
      }
    }),
    totalQuestionsAttempted: Ember.computed('result', function() {
        return this.get('result.result.length');
    }),
    correctAnswers: Ember.computed('result', function() {
        return this.get('result.result').filter((obj) => {
            return obj.isCorrect === true;
        }).length;
    }),
    percentages: Ember.computed('totalQuizQuestions', function() {
        return Math.round((this.get('correctAnswers') / this.get('totalQuizQuestions')) * 100);
    }),
    didInsertElement() {
        $('.collapsible').collapsible();
        this.sendAction('setResults', this.get('result.quizId'));
    }
});
