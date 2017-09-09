import Ember from 'ember';

export default Ember.Route.extend({
    afterModel: function() {
        this.controllerFor('application').set('showLoginButton', false);
        this.controllerFor('application').set('showJoinButton', true);
    }
});
