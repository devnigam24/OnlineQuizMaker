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
    actions: {
        goBackToHomePage() {
            this.transitionToRoute('application');
        },
        addQuestions(quizObject) {
          this.isValidQuizObject(quizObject);
            if (!this.get('serverSideFormError').length) {
                if (quizObject.questions === undefined) {
                    quizObject.questions = new Array();
                }
                quizObject.id = Utils.getRandomQuizId();
                quizObject.type = 'MULTIPLE_CHOICES_ONE_ANSWER';
                quizObject.postedBy = this.get('userInsession.firstName');
                quizObject.postedFor = [];
                this.set('quizObject', quizObject);
                console.log(quizObject);
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
          return;
        } else {
          this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'quizTopic'));
        }
        if (!ValidationHelper.isInputDoesNotHasSpecialChars(quizObject.topic)) {
          this.someErrorwithFormInput(ErrorObjects.quizTopicInvalid());
          return;
        } else {
          this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'quizTopic'));
        }

        if (!quizObject.toDate  ||  !quizObject.fromDate || quizObject.toDate < quizObject.fromDate) {
            this.someErrorwithFormInput(ErrorObjects.quizInvalidDates());
        } else {
          this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'quizDates'));
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
