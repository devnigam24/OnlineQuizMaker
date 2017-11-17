import Ember from 'ember';

export default Ember.Route.extend({

    appCtrl: Ember.inject.controller('application'),

    sessionService: Ember.inject.service('session'),

    afterModel: function() {
        this.controllerFor('application').set('showLoginButton', false);
        this.controllerFor('application').set('showJoinButton', true);
        this.get('sessionService').setLastLocation('log-in');
    },
    beforeModel: function() {
      const lastLocation = this.get('sessionService').getLastLocation();
      if (lastLocation === 'indexPage') {
          this.get('sessionService').clearSession();
          this.get('appCtrl').send('didLogout');
      } else {
          this.set('appCtrl.isIndexPage', false);
      }
    }
});
