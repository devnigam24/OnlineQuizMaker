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
        reportThisQuestion(question) {
            var $toastContent = $('<span>Report Question ' + question + '</span>').add($('<button class="btn-flat toast-action" onclick="addCommentQuestion">Add Comment</button>'));
            Materialize.toast($toastContent, 4000);
        },
        addCommentQuestion(question, comment) {
            console.log('aaaaayaaa');
        }
    },

    addCommentQuestion() {
        console.log('aaaa');
    },

    addCommentQuestion: function() {
      console.log(123);
    }
});
