import Ember from 'ember';

export default Ember.Component.extend({
    isStudent: true,
    classNames: ['col s12 m5'],
    questionNumber: 1,
    didInsertElement() {
        this.$().ready(function() {
            $('.collapsible').collapsible();
        });
        const quiz = this.get('model');
        const questions = quiz.questions;
        this.set('questions', questions);
    },
    actions: {
        submitQuiz(){
          console.log('Submit quiz');
        },

        checkAnswer(answerGiven){
          this.sendAction('checkAnswer', answerGiven);
        }
    },

    addCommentQuestion() {
        console.log('aaaa');
    },

    addCommentQuestion: function() {
      console.log(123);
    }
});
