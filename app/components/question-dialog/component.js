import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        
    },
    actions: {
        reportThisQuestion(question) {
            var $toastContent = $('<span>Report Question ' + question + '</span>').add($('<button class="btn-flat toast-action" onclick="addCommentQuestion">Add Comment</button>'));
            Materialize.toast($toastContent, 4000);
        },
        addCommentQuestion(question, comment) {
            console.log('aaaaayaaa');
        }
    }
});
