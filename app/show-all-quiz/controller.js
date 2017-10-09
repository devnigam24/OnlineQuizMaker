import Ember from 'ember';

export default Ember.Controller.extend({
    isStudent: null,
    userInsession: null,
    isSIgnedIn: null,
    quizService: Ember.inject.service('quiz-get-post'),
    actions: {
        checkAnswer(answerGiven) {
            this.get('quizService').getQuizz(answerGiven.quizId).then((data) => {
                if (data.questions.findBy('id', answerGiven.questionNumber).answer === answerGiven.text) {
                    console.log('true');
                } else {
                    console.log('false');
                }
            });
        }
    }
});
