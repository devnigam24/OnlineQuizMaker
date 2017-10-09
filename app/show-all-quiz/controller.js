import Ember from 'ember';

export default Ember.Controller.extend({
    isStudent: null,
    userInsession: null,
    isSIgnedIn: null,
    quizService: Ember.inject.service('quiz-get-post'),
    actions: {
        checkAnswer(answerGiven) {
            this.get('quizService').getQuizz(answerGiven.quizId).then((data) => {
                data.questions.forEach((question) => {
                    if (question.id === answerGiven.questionNumber && answerGiven.text === question.answer) {
                        console.log('true');
                    } else {
                        console.log('false');
                    }
                });
            });
        }
    }
});
