import Ember from 'ember';

export default Ember.Service.extend({
    createSession(userID) {
        window.sessionStorage.setItem('userSessionData', JSON.stringify(userID));
    },

    getUserDataFromSession() {
        return JSON.parse(window.sessionStorage.getItem('userSessionData'));
    },

    clearSession() {
        window.sessionStorage.clear();
    }
});
