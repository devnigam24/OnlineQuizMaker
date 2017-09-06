import Ember from 'ember';

export default Ember.Route.extend({
    afterModel: function() {
        this.controllerFor('application').set('showJoinButton', false);
        this.controllerFor('application').set('showLoginButton', true);
    }
});
