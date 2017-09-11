import Ember from 'ember';

export default Ember.Controller.extend({
    userInsession: null,
    isSIgnedIn: null,
    actions: {
        goBackToHomePage() {
            this.transitionToRoute('application');
        }
    }
});
