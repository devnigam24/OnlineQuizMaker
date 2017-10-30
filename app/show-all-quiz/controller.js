import Ember from 'ember';

export default Ember.Controller.extend({
    isStudent: null,
    userInsession: null,
    isSIgnedIn: null,
    quizService: Ember.inject.service('quiz-get-post'),
    evaluation: null,
    evaluatingQuizId: null,
    resultArray: Ember.A([]),
    actions: {
        checkAnswer(evaluation) {
            this.set('evaluation', evaluation);
        },
        registerQuiz(quizId) {
            this.set('evaluatingQuizId', quizId);
        },
        submitQuiz() {
            if (this.get('evaluation')) {
                let evaluation = this.get('evaluation');
                let resultArray = this.get('resultArray');
                const checkingPromise = this.get('store').find('quiz', this.get('evaluatingQuizId')).then((responseQuiz) => {
                    evaluation.answersToCheck.forEach((answersGiven) => {
                        const expectedAnswer = responseQuiz.data.questions.findBy('id', answersGiven.questionNumber);
                        if (expectedAnswer === answersGiven.text) {
                            resultArray.push({
                                'questionAnswered': expectedAnswer.question,
                                'answer': expectedAnswer.answer,
                                'isCorrect': true
                            });
                        } else {
                            resultArray.push({
                                'questionAnswered': expectedAnswer.question,
                                'answer': expectedAnswer.answer,
                                'isCorrect': false
                            });
                        }
                    });
                });
                checkingPromise.then(() => {
                    this.postResults();
                });
            } else {
                this.postResults();
            }
        }
    },

    postResults() {
        const resultToPost = {
            'quizAttemped': this.get('evaluatingQuizId'),
            'result': this.get('resultArray'),
            'attempedBy': this.get('userInsession.emailId')
        };
        this.get('store').createRecord('result', resultToPost);
        Ember.run.next(() => {
            this.transitionToRoute('dashboard');
        });
    }
});
