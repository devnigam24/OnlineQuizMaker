import Ember from 'ember';

export default Ember.Component.extend({
    answerGiven: null,
    didInsertElement() {

    },
    actions: {
        reportThisQuestion(question) {
            const reportTextWithAction = `<span>Reported Question: ${question.question}</span>
            <button class="btn-flat toast-action" onclick="addCommentQuestion">Add Comment</button>`

            const reportText = `<span>Reported : ${question.question}</span>`

            Materialize.toast(reportText, 4000);
            this.send('addReports', question.id);
        },

        addCommentQuestion(question, comment) {
            console.log(question);
            console.log(comment);
        },

        checkAnswer(evaluation) {
            this.sendAction('checkAnswer', evaluation);
        },

        addReports(questionId) {
            this.sendAction('addReports', questionId);
        }
    }
});
