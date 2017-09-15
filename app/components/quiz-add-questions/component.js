import Ember from 'ember';

export default Ember.Component.extend({
    question: {},
    quizObject: {},
    questionNumber: 1,
    actions: {
        addThisQuestion(questionObj) {
            const quizObject = this.get('quizObject');
            quizObject.questions.push(questionObj);
            if (this.get('questionNumber') != this.get('quizObject.noOfQuestions')) {
                this.send('animateThisQuestionAndShowNext');
                this.send('addQuestionsinPreview', questionObj);
                this.set('question', {});
                this.send('animateForNextQuestionAndShow');
            } else {
                Ember.$('add-button-div').hide();
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
            this.set('questionNumber', this.get('questionNumber') + 1);
            $('ul.tabs').tabs();
        }
    }
});
