import Ember from 'ember';
import Utils from '../helpers/utils';
import ValidationHelper from '../helpers/validation-helper';
import ErrorObjects from '../helpers/error-objects';

export default Ember.Controller.extend({
    userInsession: null,
    isSIgnedIn: null,
    addQuestionComponent: null,
    serverSideFormError: Ember.A([]),
    isInputValidText: ValidationHelper.isInputValidText,
    noErrors: Ember.computed.readOnly('serverSideFormError', function() {
        return this.get('serverSideFormError').length === 0 ? true : false;
    }),
    actions: {
        goBackToHomePage() {
            this.transitionToRoute('application');
        },
        addQuestions(quizObject) {
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
        if (!ValidationHelper.isInputValidText(quizObject.topic)) {
          this.someErrorwithFormInput(ErrorObjects.quizTopicNotExists());
          return false;
        } else {
          console.log('else');
        }
        if (!ValidationHelper.isInputDoesNotHasSpecialChars(quizObject.topic)) {
          this.someErrorwithFormInput(ErrorObjects.quizTopicInvalid());
          return false;
        }
        if (this.get('quizObject.toDate') < this.get('quizObject.fromDate')) {
            this.someErrorwithFormInput(ErrorObjects.quizInvalidDates());
            return false;
        }
    },

    someErrorwithFormInput(errorObject) {
        let errorArray = this.get('serverSideFormError');
        if (!Utils.isObjectExistsInArray(errorArray, errorObject)) {
            errorArray.pushObject(errorObject);
            this.set('serverSideFormError', errorArray);
            this.notifyPropertyChange('serverSideFormError');
        }
    }

});
