import Ember from 'ember';

export default Ember.Service.extend({
    handleUserObject() {
        Ember.$.getJSON('api/allUsersEmail');
    },

    pushObjectInDB(userObject) {
        Ember.$.post('api/pushNewUser', JSON.stringify(userObject));
    },

    checkValidEmailId(emailID) {
        Ember.$.getJSON('api/getAllEmailIds').then(function(data) {
            return data.includes(emailID) ? true : false;
        });
    }
});
