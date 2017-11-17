import Ember from 'ember';

export default Ember.Service.extend({
    createSession(user) {
        window.sessionStorage.setItem('userSessionData', JSON.stringify(user));
    },

    getUserDataFromSession() {
        return JSON.parse(window.sessionStorage.getItem('userSessionData'));
    },

    isUserSignedIn() {
        return window.sessionStorage.length > 0 ? true : false;
    },

    clearSession() {
        window.sessionStorage.clear();
        return null;
    },

    setLastLocation(location) {
      window.sessionStorage.setItem('lastLocation',location);
    },

    getLastLocation() {
      window.sessionStorage.getItem('lastLocation');
    }
});
