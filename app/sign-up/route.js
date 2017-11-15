import Ember from 'ember';

export default Ember.Route.extend({
  appCtrl: Ember.inject.controller('application'),

    afterModel: function() {
        this.controllerFor('application').set('showJoinButton', false);
        this.controllerFor('application').set('showLoginButton', true);
    },
    beforeModel: function() {
      this.set('appCtrl.isIndexPage', false);
    }
});
