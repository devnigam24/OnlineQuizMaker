import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Route.extend({
    sessionService: Ember.inject.service('session'),
    appCtrl: Ember.inject.controller('application'),

    setupController(controller, model) {
        this._super(controller, model);
        const userData = this.get('sessionService').getUserDataFromSession();
        const userSignedIn = this.get('sessionService').isUserSignedIn();
        if (Utils.isValidObject(userData)) {
            controller.set('userInsession', userData);
            this.get('appCtrl').set('userInsession', userData);
            controller.set('isSIgnedIn', userSignedIn);
            this.get('appCtrl').set('isSIgnedIn', userSignedIn);
        } else {
            this.get('sessionService').clearSession();
        }
    },

    afterModel: function() {
        this.controllerFor('application').set('showLoginButton', false);
        this.controllerFor('application').set('showJoinButton', false);
    },

    model: function() {
        return Ember.RSVP.hash({
            'myQuizzes': Ember.$.getJSON('api/mockMyQuiz?id=' + this.get('sessionService').getUserDataFromSession().id)
        });

    }
});
