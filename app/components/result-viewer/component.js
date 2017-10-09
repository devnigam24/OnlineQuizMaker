import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['card', 'col s6'],
    totalQuestions: Ember.computed('result', function() {
        return this.get('result.result.length');
    }),
    correctAnswers: Ember.computed('result', function() {
        return this.get('result.result').filter((obj) => {
            return obj.isCorrect === true;
        }).length;
    })
});
