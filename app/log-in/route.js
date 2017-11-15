import Ember from 'ember';

export default Ember.Route.extend({
    appCtrl: Ember.inject.controller('application'),

    afterModel: function() {
        this.controllerFor('application').set('showLoginButton', false);
        this.controllerFor('application').set('showJoinButton', true);
    },
    beforeModel: function() {
      this.set('appCtrl.isIndexPage', false);
    }
});
