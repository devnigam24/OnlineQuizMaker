import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Controller.extend({
    userInsession: null,
    isSIgnedIn: null,
    addQuestionComponent: null,
    actions: {
        goBackToHomePage() {
            this.transitionToRoute('application');
        },
        addQuestions(quizObject) {
          console.log(quizObject);
            if (this.isValidQuizObject(quizObject)) {
                if (quizObject.questions === undefined) {
                    quizObject.questions = new Array();
                }
                quizObject.id = Utils.getRandomQuizId();
                quizObject.fromDate = this.get('quizObject.fromDate');
                quizObject.toDate = this.get('quizObject.toDate');
                quizObject.type = 'MULTIPLE_CHOICES_ONE_ANSWER';
                quizObject.timeLimit = this.get('quizObject.timeLimit');
                quizObject.postedBy = this.get('userInsession.firstName');
                quizObject.postedFor = [];
                this.set('addQuestionComponent', 'quiz-add-questions');
                this.send('doFormAnimation');
            }

        },

        doFormAnimation() {
            Ember.$('.create-quiz-card').fadeOut(1000);
        }
    },

    isValidQuizObject(quizObject) {
        if (this.get('quizObject.toDate') > this.get('quizObject.fromDate')) {
            return true;
        } else {
            return false;
        }
    },
});
