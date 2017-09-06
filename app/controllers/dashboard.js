import Ember from 'ember';

export default Ember.Controller.extend({
    sessionData: {},
    applicationController: Ember.inject.controller('application'),
    actions: {
        goBackToHomePage() {
          this.transitionToRoute('application');
        }
    }
});
