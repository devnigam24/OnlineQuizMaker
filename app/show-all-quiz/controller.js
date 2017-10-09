import Ember from 'ember';

export default Ember.Controller.extend({
    isStudent: null,
    userInsession: null,
    isSIgnedIn: null,
    quizService: Ember.inject.service('quiz-get-post'),
    evaluation: null,
    resultArray: Ember.A([]),
    actions: {
        checkAnswer(evaluation) {
            this.set('evaluation', evaluation);
        },
        submitQuiz() {
            const evaluationPromise = new Ember.RSVP.Promise((resolve, reject) => {
                let evaluation = this.get('evaluation');
                let resultArray = this.get('resultArray');
                this.get('quizService').getQuizz(evaluation.quizId).then((data) => {
                    evaluation.answersToCheck.forEach((answer) => {
                        let questionToCompare = data.questions.findBy('id', answer.questionNumber);
                        if (questionToCompare.answer === answer.text) {
                            resultArray.push({
                                'questionAnswered': questionToCompare.question,
                                'answer': questionToCompare.answer,
                                'isCorrect': true
                            });
                        } else {
                            resultArray.push({
                                'questionAnswered': questionToCompare.question,
                                'answer': questionToCompare.answer,
                                'isCorrect': false
                            });
                        }
                    });
                    resolve(resultArray);
                    reject(resultArray);
                });
            });
            evaluationPromise.then((result) => {
                const resultToPost = {
                  'quizAttemped' : this.get('evaluation.quizId'),
                  'result': result,
                  'attempedBy': this.get('userInsession.id')
                };
                this.get('quizService').postResults(resultToPost);
                Ember.run.next(() => {
                    this.transitionToRoute('dashboard');
                });
            });
        }
    }
});
