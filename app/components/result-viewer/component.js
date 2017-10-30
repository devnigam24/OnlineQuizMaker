import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['card'],
    totalQuestions: Ember.computed('result', function() {
        return this.get('result.result.length');
    }),
    correctAnswers: Ember.computed('result', function() {
        return this.get('result.result').filter((obj) => {
            return obj.isCorrect === true;
        }).length;
    }),
    percentages: Ember.computed('correctAnswers', 'totalQuestions', function() {
        return Math.round((this.get('correctAnswers') / this.get('totalQuestions')) * 100);
    }),
    didInsertElement() {
        $('.collapsible').collapsible();
        $('.card-tabs').tabs();
    }
});
