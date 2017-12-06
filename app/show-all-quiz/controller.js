import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Controller.extend({
    isStudent: null,
    userInsession: null,
    isSIgnedIn: null,
    evaluation: null,
    evaluatingQuizId: null,
    resultArray: Ember.A([]),
    userFullName: Ember.computed('userInsession', function() {
        let firstName = this.get('userInsession.firstName');
        let lastName = this.get('userInsession.lastName');
        return `${firstName} ${lastName}`;
    }),
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
                        if (expectedAnswer.answer === answersGiven.text) {
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
            this.setThisQuizAsAttemped();
            this.transitionToRoute('dashboard');
        },

        addReports(type, questionId) {
            var _this = this;
            let quizId = this.get('evaluatingQuizId');
            this.get('store').findRecord('quiz', quizId, {
                backgroundReload: true
            }).then((quiz) => {
                var __this = _this;
                let newReports = quiz.get('data.reports');
                newReports.push(questionId);
                quiz.set('data.reports', newReports);
                quiz.save().then(() => {
                    __this.postReport(type, quiz, questionId);
                });
            });
        }
    },

    postResults() {
        let store = this.get('store');
        const quizId = this.get('evaluatingQuizId');
        store.find('quiz', quizId).then((data) => {
            store.createRecord('result', {
                quizAttemped: data.data.topic,
                quizId: quizId,
                timeAttempedAt: new Date().getTime(),
                result: this.get('resultArray'),
                attempedBy: this.get('userInsession.emailId'),
                postedBy: data.data.postedBy,
                id: Utils.getRandomId()
            }).save();
        });
    },

    postReport(type, quiz, questionId) {
        const reportedFor = quiz.data.postedBy;
        const topic = quiz.data.topic;
        const quizId = quiz.id;
        const question = questionId;
        const reportedBy = this.get('userFullName');
        const id = Utils.getRandomId();

        let reports = [];

        if (type === 'BAD_QUESTION') {
            reports.push({
                reportedBy,
                comment: "Bad Question"
            });
        } else if (type === 'DUPLICATE_OPTIONS') {
            reports.push({
                reportedBy,
                comment: "Duplicate Options"
            });
        } else {
            reports.push({
                reportedBy,
                comment: "Duplicate Question"
            });
        }

        const report = {
            reportedFor,
            topic,
            quizId,
            question,
            reports,
            id
        };
        this.get('store').createRecord('report', report, {
            backgroundReload: false
        }).save();
    },

    setThisQuizAsAttemped() {
        this.get('store').findRecord('quiz', this.get('evaluatingQuizId')).then((responseQuiz) => {
            responseQuiz.get('postedFor').removeObject(this.get('userInsession.emailId'));
            responseQuiz.save();
        });
    }
});
