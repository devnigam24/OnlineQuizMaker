import Ember from 'ember';

export default Ember.Controller.extend({
    isStudent: null,
    userInsession: null,
    isSIgnedIn: null,
    quizService: Ember.inject.service('quiz-get-post'),
    actions: {
        checkAnswer(answerGiven) {
            console.log(answerGiven);
            console.log(this.get('quizService').getQuizz(answerGiven.quizId));
        }
    }
});
