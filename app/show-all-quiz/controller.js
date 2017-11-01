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
        let store = this.get('store');
        const quizId = this.get('evaluatingQuizId');
        store.find('quiz', quizId).then((data) => {
            // store.createRecord('result', {
            //     quizAttemped: data.data.topic,
            //     quizId: quizId,
            //     timeAttempedAt: new Date().getTime(),
            //     result: this.get('resultArray'),
            //     attempedBy: this.get('userInsession.emailId'),
            //     postedBy: data.data.postedBy
            // }).save();

            Ember.$.ajax({
                url: 'http://localhost:3000/results',
                type: "POST",
                data: {
                    quizAttemped: data.data.topic,
                    quizId: quizId,
                    timeAttempedAt: new Date().getTime(),
                    result: JSON.stringify(this.get('resultArray')),
                    attempedBy: this.get('userInsession.emailId'),
                    postedBy: data.data.postedBy
                },
            });
        });
    }
});
