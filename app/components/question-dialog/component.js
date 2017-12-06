import Ember from 'ember';

export default Ember.Component.extend({
    answerGiven: null,
    didInsertElement() {
        $('.tooltipped').tooltip({
            delay: 50
        });
    },
    actions: {
        reportThisQuestionBad(question) {
            Materialize.toast('<span>Question Reported as Bad</span>', 4000);
            this.send('addReports', 'BAD_QUESTION', question.id);
        },
        reportThisQuestionDuplicate(question) {
            Materialize.toast('<span>Options Reported as Duplicate/Bad</span>', 4000);
            this.send('addReports', 'DUPLICATE_OPTIONS', question.id);
        },
        reportThisQuestionRepeat(question) {
            Materialize.toast('<span>Question Reported as Duplicate</span>', 4000);
            this.send('addReports', 'DUPLICATE_QUESTION', question.id);
        },

        checkAnswer(evaluation) {
            this.sendAction('checkAnswer', evaluation);
        },

        addReports(type, questionId) {
            this.sendAction('addReports', type, questionId);
        }
    }
});
