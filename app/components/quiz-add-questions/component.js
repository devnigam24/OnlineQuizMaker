import Ember from 'ember';

export default Ember.Component.extend({
    question: {},
    quizObject: {},
    questionNumber: 1,
    actions: {
        addThisQuestion(questionObj) {
            const quizObject = this.get('quizObject');
            quizObject.questions.push(questionObj);
            this.send('animateThisQuestionAndShowNext');
            this.set('questionNumber', this.get('questionNumber') + 1);
            console.log(questionObj);
            console.log(quizObject);
        },
        animateThisQuestionAndShowNext(){
          Ember.$('add-questions-card').fadeOut(1000);
        }
    }
});
