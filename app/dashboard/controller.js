import Ember from 'ember';

export default Ember.Controller.extend({
    sessionData: {},
    actions: {
        goBackToHomePage() {
            this.transitionToRoute('application');
        }
    }
});
