import Ember from 'ember';

export default Ember.Component.extend({
    question: {},
    quizObject: {},
    questionNumber: 1,
    addMoreQuestions: false,
    dynamicComponent: null,
    quizService: Ember.inject.service('quiz-get-post'),
    appCtrl: Ember.inject.controller('application'),
    actions: {
        addThisQuestion(questionObj) {
            const quizObject = this.get('quizObject');
            if (quizObject.questions.push(questionObj)) {
                this.send('animateThisQuestionAndShowNext');
                this.send('addQuestionsinPreview', questionObj);
                this.set('question', {});
                if (this.get('questionNumber') !== Number.parseInt(quizObject.noOfQuestions)) {
                    this.send('animateForNextQuestionAndShow');
                    this.set('questionNumber', this.get('questionNumber') + 1);
                } else {
                    this.set('addMoreQuestions', true);
                }
            }
        },
        animateThisQuestionAndShowNext() {
            Ember.$('.add-questions-card').fadeOut(500);
        },
        animateForNextQuestionAndShow() {
            Ember.$('.add-questions-card').fadeIn(500);
        },
        addQuestionsinPreview(questionObj) {
            const questionNumber = this.get('questionNumber');
            const slideTab = `<li class="tab col s3"><a class="active" href="#test-swipe-${questionNumber}">Question ${questionNumber}</a></li>`;
            const sliderContent = `<div id="test-swipe-${questionNumber}" class="col s12 blue ques-prev">${questionObj.question}</div>`;
            Ember.$('#tabs-swipe-demo').append(slideTab);
            Ember.$('.quiz-preview').append(sliderContent);
            $('ul.tabs').tabs();
        },
        createQuizElementToPost() {
            const quizObject = this.get('quizObject');
            this.get('quizService').postQuiz(quizObject);
            this.send('animateQuizPosted');
        },
        animateQuizPosted() {
            this.set('dynamicComponent', 'pre-loader');
            const _this = this;
            Ember.run.later(function() {
                Materialize.toast('Posted!!!', 4000)
            }, 2000);
            Ember.run.later(function() {
                _this.set('dynamicComponent', null);
            }, 2000);
            Ember.run.later(function() {
                _this.get('appCtrl').send('getoDashBoard');
            }, 3000);
        }
    }
});
