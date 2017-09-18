import Ember from 'ember';

export default Ember.Controller.extend({
    userInsession: null,
    isSIgnedIn: null,
    isStudent: true,
    actions: {
        goBackToHomePage() {
            this.transitionToRoute('application');
        }
    }
});
