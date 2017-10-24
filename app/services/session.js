import Ember from 'ember';

export default Ember.Service.extend({
    createSession(user) {
        Ember.Logger.log('Session Data Added');
        window.sessionStorage.setItem('userSessionData', JSON.stringify(user));
    },

    getUserDataFromSession() {
        Ember.Logger.log('Session Data Fetched');
        return JSON.parse(window.sessionStorage.getItem('userSessionData'));
    },

    isUserSignedIn() {
        return window.sessionStorage.length > 0 ? true : false;
    },

    clearSession() {
        Ember.Logger.log('Session Data Cleared');
        window.sessionStorage.clear();
        return null;
    }
});
