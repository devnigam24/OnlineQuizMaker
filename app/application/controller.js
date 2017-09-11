import Ember from 'ember';

export default Ember.Controller.extend({
    isSIgnedIn: false,
    showLoginButton: true,
    showJoinButton: true,
    userInsession: null,

    actions: {
        gotoDashUserBoard() {
            this.transitionToRoute('dashboard');
        },

        didLogout() {
          window.location.href = window.location.origin;
        }
    }
});
