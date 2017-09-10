import Ember from 'ember';

export default Ember.Service.extend({
    createSession(userID) {
        Ember.$.getJSON('api/userById?id=' + userID.username).then((userData) => {
            window.sessionStorage.setItem('userSessionData', JSON.stringify(userData));
        });
    },

    getUserDataFromSession() {
        return JSON.parse(window.sessionStorage.getItem('userSessionData'));
    },

    clearSession() {
        window.sessionStorage.clear();
    }
});
