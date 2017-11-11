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
        },

        addReports(questionId) {
            var _this = this;
            let quizId = this.get('evaluatingQuizId');
            this.get('store').findRecord('quiz', quizId, {
                backgroundReload: false
            }).then(function(quiz) {
                var __this = _this;
                let newReports = quiz.get('data.reports');
                newReports.push(questionId);
                quiz.set('data.reports', newReports);
                quiz.save().then((reportedData) => {
                    Ember.Logger.log(reportedData);
                    __this.postReport(questionId, quizId);
                }).catch((failure) => {
                    Ember.Logger.error(failure);
                });
            });
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
    },

    postReport(questionId, quizId) {
        var record = this.get('store').createRecord('report', {
            questionId,
            quizId,
            ReportedBy: 'test1',
            comments: 'testing duplicate comment'
        });
        record.save().then((report) => {
            Ember.Logger.log(report);
        }).catch((failure) => {
            Ember.Logger.error(failure);
        });
    }
});
