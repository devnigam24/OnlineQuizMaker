import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Route.extend({
    sessionService: Ember.inject.service('session'),
    userData: Ember.computed('sessionService', function() {
        return this.get('sessionService').getUserDataFromSession();
    }),
    model() {
        const userData = this.get('userData');
        console.log(userData);
        if (Utils.isValidObject(userData)) {
            Ember.$.getJSON('api/userById?id=' + userData.username).then((userData) => {
                this.controllerFor('application').set('isSIgnedIn', true);
                this.controllerFor('application').set('sessionData', userData);
                this.controller.set('sessionData', userData);
            });
        } else {
            this.controller.send('goBackToHomePage');
        }
    },

    afterModel: function() {
        this.controllerFor('application').set('showLoginButton', false);
        this.controllerFor('application').set('showJoinButton', false);
    }
});
