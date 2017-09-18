import Ember from 'ember';

export default Ember.Component.extend({
    isStudent: true,
    classNames: ['col s12 m5 info-questions-card'],
    actions: {
        attemptQuiz(quiz) {
            console.log(quiz);
        }
    }
});
