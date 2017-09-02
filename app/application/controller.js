import Ember from 'ember';

export default Ember.Controller.extend({
    isSIgnedIn: false,
    showLoginButton: true,
    showJoinButton: true,
    didRender() {
        Ember.$.getJSON('api/sessionData').then((data) => {
            if (data.length > 0) {
              console.log('9');
                this.set('showJoinButton', false);
                this.set('showLoginButton', false);
            } else {
              console.log('o');
                this.set('showJoinButton', true);
                this.set('showLoginButton', true);
            }
        });
    }
});
